import { useState, useEffect } from 'react';
import Animal from './components/Animal';
import './App.css';

//Custom Hook for returning data + setting local storage
function useAnimalSearch() {
  const [animals, setAnimals] = useState([]);

  // Set local storage - this runs on refresh
  useEffect(() => {
    // Set lastQuery to item in local storage
    const lastQuery = localStorage.getItem('lastQuery');
    //Run search -> This will display data
    search(lastQuery);
  }, []);

  // Async Search function - takes in passed query
  const search = async (q) => {
    // Get Data from server
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({ q }).toString()
    );

    //JSON Data -> throw into state
    const data = await response.json();
    setAnimals(data);

    // Set local storage query so we can display data when it runs
    localStorage.setItem('lastQuery', q);
  };
  //Return search and animals for use elsewhere in the app
  return { search, animals };
}

function App() {
  // Set search/animals from hook
  const { search, animals } = useAnimalSearch();
  return (
    <main>
      <h1>Animal Farm</h1>

      <input
        type="text"
        placeholder="Search"
        onChange={(e) => search(e.target.value)}
      />

      <ul>
        {animals.map((animal) => (
          <Animal key={animal.id} {...animal}></Animal>
        ))}

        {animals.length === 0 && 'No animals found'}
      </ul>
    </main>
  );
}

export default App;
