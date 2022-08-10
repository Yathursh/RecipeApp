
import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {

  const APP_ID = "ea819230";
  const APP_KEYS = "f2bd18ff4cbe39c9dbea6d6f85b2b74c";


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('banana'); //set a default query

  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEYS}`
      );

      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
    
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e =>{
    e.preventDefault(); // stop the page refresh
    setQuery(search);
    setSearch(' '); //after search the item it will be hide.
  }

  return(
    <div className='App'>
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch} ></input>
          <button className="search-button" type="submit">Search</button>  
      </form>
     <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
             key={recipe.recipe.label}
             title = {recipe.recipe.label}
             calories = {recipe.recipe.calories}
             image = {recipe.recipe.image}
             ingredients = {recipe.recipe.ingredients}
          />
        ))}
     </div>
      

     
    </div>
  );
};
 // .map method is an array and just want to map over all the objects in this array 
export default App;
