import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import NavBar from "./components/NavBar.js";
import Home from "./components/Home.js"
import DisplayCards from "./components/DisplayCards.js";
import CardDetails from "./components/CardDetails.js";
import NewCardForm from "./components/NewCardForm";


function App() {
  const [recipes, setRecipes] = useState([])
  const [chefs, setChefs] = useState([])
  const [selectedType, setSelectedType] = useState('all')

  useEffect(() => {
    fetch("http://localhost:9292/chefs")
    .then((res) => res.json())
    .then((chefData) => setChefs(chefData));
  }, [])

  useEffect(() => {
    fetch("http://localhost:9292/recipes")
    .then((res) => res.json())
    .then((recipeData) => setRecipes(recipeData));
  }, [])

  function handleSubmitRecipe (newRecipeCard){
    fetch(`http://localhost:9292/recipes`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(
        newRecipeCard
      )
    })
    .then(res => res.json())
    .then(newRecipe => setRecipes([...recipes, newRecipe]))
    }


  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/recipes">
            <DisplayCards inRecipes={true} selectedType={selectedType} setSelectedType={setSelectedType} collectionData={recipes} chefs={chefs}/>
        </Route>
        <Route exact path="/chefs">
            <DisplayCards inRecipes={false} collectionData={chefs}/>
        </Route>
        <Route exact path="/chefs/:id">
          <CardDetails isRecipe={false} dataForDetails={chefs} />
        </Route>
        <Route exact path="/recipes/:id">
          <CardDetails isRecipe={true} dataForDetails={recipes} />
        </Route>
        <Route exact path="/new">
          <NewCardForm onSubmit={handleSubmitRecipe}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
