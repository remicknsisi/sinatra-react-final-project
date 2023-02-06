import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import NavBar from "./components/NavBar.js";
import Home from "./components/Home.js"
import DisplayCards from "./components/DisplayCards.js";
import CardDetails from "./components/CardDetails.js";

function App() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/recipes")
    .then((res) => res.json())
    .then((recipeData) => setRecipes(recipeData));
  }, [])

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/recipes">
            <DisplayCards recipes={recipes}/>
        </Route>
        <Route exact path="/chefs">
        </Route>
        <Route exact path="/chefs/:id">
        </Route>
        <Route exact path="/recipes/:id">
          <CardDetails/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
