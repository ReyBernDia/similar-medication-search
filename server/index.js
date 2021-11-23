import fetch from "node-fetch";
import path from "path";
import express from "express";

import {getAllConceptProperties} from "./helpers.js";

const PORT = process.env.PORT || 3001;

const app = express();
const __dirname = path.resolve();
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
      const conceptGroup = drugData.drugGroup?.conceptGroup
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

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
console.log(`Server listening on ${PORT}`);
});