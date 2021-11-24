import path from "path";
import { fileURLToPath } from "url";
import express from "express";

import { getAllConceptProperties } from "./utils/helpers.js";
import {
  getMedicationSearch,
  getAssociatedMedications,
} from "./utils/rxNormConnect.js";

const PORT = process.env.PORT || 3001;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to set routes
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/search/:term", async (req, res) => {
  const conceptGroup = await getMedicationSearch(req.params.term);
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
