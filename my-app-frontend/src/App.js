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

  const history = useHistory();

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

  function handleSubmitRecipe (newRecipeObj){
      setRecipes([...recipes, newRecipeObj])
      history.push(`/recipes/${newRecipeObj.id}`)}

  function handleNewSelection(type){
      setSelectedType(type)
    }

  const recipesToDisplay = recipes.filter(recipe => {
    if (selectedType === "all") return true;
    else if (selectedType === "favorite") return recipe.isFavorited == true;
    return recipe.cuisine_type === selectedType;
  })

  function handleDeleteRecipe(deletedRecipe){
    const recipesToDisplay = recipes.filter(recipe => recipe.id !== deletedRecipe.id)
    setRecipes(recipesToDisplay)
}

  // function handleFavoriteClick(updatedRecipe){
  //   const updatedRecipes = recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe)
  //   setRecipes(updatedRecipes)
  // }

  return (
    <div className="App">
      <br></br>
      <div className="title">Recipe App Title!</div>
      <NavBar />
      <br></br>
      <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/recipes">
            <DisplayCards inRecipes={true} onNewSelection={handleNewSelection} setRecipes={setRecipes} selectedType={selectedType} setSelectedType={setSelectedType} collectionData={recipesToDisplay} chefs={chefs} onDeleteRecipe={handleDeleteRecipe}/>
        </Route>
        <Route exact path="/chefs">
            <DisplayCards inRecipes={false} collectionData={chefs}/>
        </Route>
        <Route exact path="/chefs/:id">
          <CardDetails isRecipe={false} dataForDetails={chefs} recipes={recipes} />
        </Route>
        <Route exact path="/recipes/:id">
          <CardDetails isRecipe={true} dataForDetails={recipes} recipes={recipes} />
        </Route>
        <Route exact path="/new">
          <NewCardForm onSubmit={handleSubmitRecipe}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
