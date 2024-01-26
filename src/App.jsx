import { useState } from "react";
import "./App.css";

function App() {
  const [animals, setAnimals] = useState([]);

  const search = async (q) => {
    // Get Data
    const response = await fetch("http://localhost:8080?" + new URLSearchParams({ q }).toString());

    console.log(response);

    //JSON Data, throw into
    const data = await response.json();
    setAnimals(data);
  };

  return (
    <main>
      <h1>Animal Farm</h1>

      {/* //TODO a good exercise would be hooking up search to a button instead */}
      <input type="text" placeholder="Search" onChange={(e) => search(e.target.value)} />

      <ul>
        {animals.map((animal) => (
          <Animal key={animal.id} {...animal}></Animal>
        ))}

        {animals.length === 0 && "No animals found"}
      </ul>
    </main>
  );
}

// TODO recommend this being placed in ./components/Animal.jsx
function Animal({ type, name, age }) {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
}

export default App;
