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
  const [chefs, setChefs] = useState([])
  const [selectedType, setSelectedType] = useState('all')
  const [search, setSearch] = useState('')

  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:9292/chefs")
    .then((res) => res.json())
    .then((chefData) => setChefs(chefData));
  }, [])

  //Declaring constants to dictate displayed
  const recipes = chefs.flatMap(chef => chef.recipes)
  const reviews = chefs.flatMap(chef => chef.reviews)
  const recipesToDisplay = recipes.filter(recipe => {
    if (selectedType === "all") return true;
    else if (selectedType === "favorite") return recipe.isFavorited === true;
    return recipe.cuisine_type === selectedType;
  })
  const chefsToDisplay = chefs.filter(chef => {
    if (chef.first_name.toLowerCase().includes(search)) return true;
    else if (chef.last_name.toLowerCase().includes(search)) return true;
  })

  //Submissions updating in frontend
  function handleSubmitRecipe (updatedChef, id){
    const chefsWithUpdatedRecipes = chefs.map(chef => chef.id === updatedChef.id ? updatedChef : chef)
    setChefs(chefsWithUpdatedRecipes)
    history.push(`/chefs/${updatedChef.id}/recipes/${id}`)
    }
  function handleSubmitChef(newChefObj){
    setChefs([...chefs, newChefObj])
    history.push(`/chefs/${newChefObj.id}`)
  }

  //Deletions updating in frontend
  function handleDeleteChef(deletedChef){
      const chefsToDisplay = chefs.filter(chef => chef.id !== deletedChef.id)
      setChefs(chefsToDisplay)
  }
  function handleDeleteRecipe(deletedRecipe){
      const chef = chefs.find(chef => chef.id === deletedRecipe.chef_id)
      const chefUpdatedRecipes = chef.recipes.filter(recipe => recipe.id !== deletedRecipe.id)
      const updatedChef = {...chef, recipes: chefUpdatedRecipes}
      const chefsWithUpdatedRecipes = chefs.map(chef => chef.id === updatedChef.id ? updatedChef : chef)
      setChefs(chefsWithUpdatedRecipes)
  }

  //Handle other user interactions
  function handleNewSelection(type){
      setSelectedType(type)
    }
  function handleClickFavorite(updatedRecipe){
    const chef = chefs.find(chef => chef.id === updatedRecipe.chef_id)
    const chefUpdatedRecipes = chef.recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe)
    const updatedChef = {...chef, recipes: chefUpdatedRecipes}
    const chefsWithUpdatedRecipes = chefs.map(chef => chef.id === updatedChef.id ? updatedChef : chef)
    setChefs(chefsWithUpdatedRecipes)
  }
  function handleEditChefSubmit(updatedChef){
    const updatedChefs = chefs.map(chef => chef.id === updatedChef.id ? updatedChef : chef)
    setChefs(updatedChefs)
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
            <DisplayCards inRecipes={true} onNewSelection={handleNewSelection} selectedType={selectedType} recipes={recipesToDisplay} onDeleteRecipe={handleDeleteRecipe} reviews={reviews} onClickFavorite={handleClickFavorite}/>
        </Route>
        <Route path="/chefs/:chef_id/recipes/new">
          <NewRecipeForm chefs={chefs} onSubmit={handleSubmitRecipe}/>
        </Route>
        <Route exact path="/chefs/:chef_id/recipes/:id">
          <RecipeDetails />
        </Route>
        <Route exact path="/chefs/new">
          <NewChefForm onChefSubmit={handleSubmitChef} />
          <br></br>
        </Route>
        <Route exact path="/chefs">
            <DisplayCards search={search} setSearch={setSearch} inRecipes={false} chefs={chefsToDisplay} onDeleteChef={handleDeleteChef}/>
        </Route>
        <Route exact path="/chefs/:id">
          <ChefDetails onEditChefSubmit={handleEditChefSubmit}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
