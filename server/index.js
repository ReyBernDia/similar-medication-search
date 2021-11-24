import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import fetch from "node-fetch";

import {getAllConceptProperties, getMainIngredient} from "./helpers.js";

const PORT = process.env.PORT || 3001;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to set routes
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/search/:term", async (req, res) => {
  const url = `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${req.params.term}`
  try{
    const response =  await fetch(url, {method: "GET"});
    if(response?.status === 200){
      const drugData = await response.json()
      const conceptGroup = drugData?.drugGroup?.conceptGroup
      if(conceptGroup){
        res.json({content: getAllConceptProperties(conceptGroup)})
      }else{
        res.send('No related medications. Did you double check the spelling?')
      }
    }
  }catch(e){
    res.send("There was an error making this request")
    console.error(e)
  }
})

app.get("/related/:rxcui", async (req, res) =>{
  const url = `https://rxnav.nlm.nih.gov/REST/rxcui/${req.params.rxcui}/related.json?tty=IN`
  try{
    const response =  await fetch(url, {method: "GET"});
    if(response?.status === 200){
      const relatedData = await response.json()
      const rxcui = getMainIngredient(relatedData)
      // res.json({rxcui: getMainIngredient(relatedData)})
      if(rxcui){
        const realtedURL = `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/related.json?tty=SCD+SBD`
        const res = await fetch(realtedURL, {method: "GET"});
        if(res?.status === 200){
          const associatedData = await res.json();
          console.log("ASOCIATED", associatedData)
        }
      }
    }else{
      res.send('Sorry, we could not find any related ingredients')
    }
  }catch(e){
    res.send("There was an error making this ingredient request")
    console.error(e)
  }
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
console.log(`Server listening on ${PORT}`);
});