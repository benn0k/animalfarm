import cors from "cors";
import express from "express";

// ? weird, i've never seen this before
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Load Chance
// TODO use const
var Chance = require("chance");

// Instantiate Chance so it can be used
// TODO use const
var chance = new Chance();

//init Express app
const app = express();
app.use(cors());
app.use(express.json());

// Make some animals
const animals = [...Array(250).keys()].map((id) => {
  return {
    id,
    type: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  };
});

//Endpoint to search for animals
// TODO best practice is "/" here for the index route
app.get("", (req, res) => {
  //filter results by query
  const q = req.query.q?.toLowerCase() || ""; // * GREAT use of optional chaining here

  // TODO if you wanted to, you could send results back early if the query is empty, maybe an error?

  // ? imagine if you had a million animals, this would be slow just to filter and find nothing
  const results = animals.filter((animal) => animal.type.toLowerCase().includes(q));

  res.send(results);
});

// TODO discuss .env vars for PORT
app.listen(8080, () => console.log("Listening on port http://localhost:8080"));
