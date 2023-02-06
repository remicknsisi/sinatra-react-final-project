import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import NavBar from "./components/NavBar.js";
import Home from "./components/Home.js"
import DisplayCards from "./components/DisplayCards.js";
import CardDetails from "./components/CardDetails.js";
import NewCardForm from "./components/NewCardForm";


function App() {
  const [recipes, setRecipes] = useState([])
  const [selectedType, setSelectedType] = useState('all')

  useEffect(() => {
    fetch("http://localhost:9292/recipes")
    .then((res) => res.json())
    .then((recipeData) => setRecipes(recipeData));
  }, [])

  function handleSubmitCard (newCard){
    console.log(newCard)
  }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/recipes">
            <DisplayCards selectedType={selectedType} setSelectedType={setSelectedType} recipes={recipes}/>
        </Route>
        <Route exact path="/chefs">
        </Route>
        <Route exact path="/chefs/:id">
        </Route>
        <Route exact path="/recipes/:id">
          <CardDetails recipes={recipes} />
        </Route>
        <Route exact path="/new">
          <NewCardForm onSubmit={handleSubmitCard}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
