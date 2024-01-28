import cors from 'cors';
import express from 'express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Load Chance
// TODO use const
const Chance = require('chance');

// Instantiate Chance so it can be used
const chance = new Chance();

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
app.get('/', (req, res) => {
  //filter results by query
  const q = req.query.q?.toLowerCase() || '';

  // TODO if you wanted to, you could send results back early if the query is empty, maybe an error?

  // ? imagine if you had a million animals, this would be slow just to filter and find nothing
  const results = animals.filter((animal) =>
    animal.type.toLowerCase().includes(q)
  );

  res.send(results);
});

// TODO move to .env
app.listen(8080, () => console.log('Listening on port http://localhost:8080'));
