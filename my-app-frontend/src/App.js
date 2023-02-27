import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import NavBar from "./components/NavBar.js";
import Home from "./components/Home.js"
import DisplayCards from "./containers/DisplayCards.js";
import ChefDetails from "./containers/ChefDetails.js";
import RecipeDetails from "./containers/RecipeDetails.js";
import NewRecipeForm from "./containers/NewRecipeForm"
import NewChefForm from "./containers/NewChefForm"

function App() {
  const [recipes, setRecipes] = useState([])
  const [chefs, setChefs] = useState([])
  const [selectedType, setSelectedType] = useState('all')
  const [search, setSearch] = useState('')

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

  // no need to store recipes in state if we are accessing it via chefs

  function handleSubmitRecipe (newRecipeObj){
    console.log(newRecipeObj)
      setRecipes([...recipes, newRecipeObj])
      history.push(`/recipes/${newRecipeObj.id}`)}

  function handleSubmitChef(newChefObj){
    setChefs([...chefs, newChefObj])
    history.push(`/chefs/${newChefObj.id}`)
  }

  function handleNewSelection(type){
      setSelectedType(type)
    }

  const recipesToDisplay = recipes.filter(recipe => {
    if (selectedType === "all") return true;
    else if (selectedType === "favorite") return recipe.isFavorited === true;
    return recipe.cuisine_type === selectedType;
  })
  //this would need to move to details page of a specific component
  //add a filter functionality from a chef's page to utilize that relationship
  //will change how i display and how I add a recipe

  const chefsToDisplay = chefs.filter(chef => {
    if (chef.first_name.toLowerCase().includes(search)) return true;
    else if (chef.last_name.toLowerCase().includes(search)) return true;
  })

  function handleDeleteRecipe(deletedRecipe){
    const recipesToDisplay = recipes.filter(recipe => recipe.id !== deletedRecipe.id)
    setRecipes(recipesToDisplay)
  }

  function handleDeleteChef(deletedChef){
      const chefsToDisplay = chefs.filter(chef => chef.id !== deletedChef.id)
      setChefs(chefsToDisplay)
  }

  function handleClickFavorite(updatedRecipe){
    const updatedRecipes = recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe)
    setRecipes(updatedRecipes)
  }

  return (
    <div className="App">
      <br></br>
      <div className="title">What's Cookin'?</div>
      <NavBar />
      <br></br>
      <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/recipes">
            <DisplayCards onClickFavorite={handleClickFavorite} inRecipes={true} onNewSelection={handleNewSelection} setRecipes={setRecipes} selectedType={selectedType} collectionData={recipesToDisplay} onDeleteRecipe={handleDeleteRecipe} />
        </Route>
        <Route exact path="/recipes/:id">
          <RecipeDetails />
        </Route>
        <Route exact path="/chefs">
            <DisplayCards search={search} setSearch={setSearch} inRecipes={false} collectionData={chefsToDisplay} onDeleteChef={handleDeleteChef}/>
        </Route>
        <Route exact path="/chefs/:id">
          <ChefDetails />
        </Route>
        <Route exact path="/new">
          <NewRecipeForm chefs={chefs} onSubmit={handleSubmitRecipe} />
          <NewChefForm onChefSubmit={handleSubmitChef} />
          {/* add specific routes for both models recipe / chefs eg recipe/new chefs/new */}
            {/* if I route from a chef details page make sure to use nested route (/chefs/chef id/recipes/new) */}
          <br></br>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
