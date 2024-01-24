import express from 'express';
import cors from 'cors';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
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

app.get('', (req, res) => {
  //filter results by query
  const q = req.query.q?.toLowerCase() || '';
  const results = animals.filter((animal) =>
    animal.type.toLowerCase().includes(q)
  );

  res.send(results);
});

app.listen(8080, () => console.log('Listening on port http://localhost:8080'));
