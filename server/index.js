import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import redis from "redis";

import { REDIS_URL } from "./utils/constants.js";
import { getAllConceptProperties } from "./utils/helpers.js";
import {
  getMedicationSearch,
  getAssociatedMedications,
  getRxcuiByName,
} from "./utils/rxNormConnect.js";

const client = redis.createClient(REDIS_URL);
client.on("error", function (error) {
  console.error(error);
});

const PORT = process.env.PORT || 3001;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/getRxcui/:name", async (req, res) => {
  res.json({ content: await getRxcuiByName(req.params.name) });
});

// Handle GET requests to set routes
app.get("/updatePopular", async (req, res) => {
  client.zrevrange(["popularMeds", 0, 4], (err, resp) => {
    res.json({ content: resp });
    if (err) {
      console.error(err);
    }
  });
});

app.get("/search/:term", async (req, res) => {
  const term = req.params.term;
  const conceptGroup = await getMedicationSearch(term);
  client.zincrby(["popularMeds", 1, term]);
  res.json({ content: getAllConceptProperties(conceptGroup) });
});

app.get("/related/:rxcui", async (req, res) => {
  const allAssociatedMedications = await getAssociatedMedications(
    req.params.rxcui
  );
  res.json({ content: allAssociatedMedications || [] });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
