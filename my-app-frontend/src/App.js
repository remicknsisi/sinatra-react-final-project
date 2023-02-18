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
  const [reviews, setReviews] = useState([])
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

  useEffect(() => {
    fetch("http://localhost:9292/reviews")
    .then((res) => res.json())
    .then((reviewData) => setReviews(reviewData));
  }, [])

  function handleSubmitRecipe (newRecipeObj){
      setRecipes([...recipes, newRecipeObj])
      history.push(`/recipes/${newRecipeObj.id}`)}

  function handleSubmitChef(newChefObj){
    setChefs([...chefs, newChefObj])
    history.push(`/chefs/${newChefObj.id}`)
  }

  function handleNewSelection(type){
      setSelectedType(type)
    }

  function handlePostComment(newComment){
    setReviews([...reviews, newComment])
  }

  const recipesToDisplay = recipes.filter(recipe => {
    if (selectedType === "all") return true;
    else if (selectedType === "favorite") return recipe.isFavorited == true;
    return recipe.cuisine_type === selectedType;
  })

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
            <DisplayCards inRecipes={true} onNewSelection={handleNewSelection} setRecipes={setRecipes} selectedType={selectedType} setSelectedType={setSelectedType} collectionData={recipesToDisplay} chefs={chefs} onDeleteRecipe={handleDeleteRecipe} reviews={reviews}/>
        </Route>
        <Route exact path="/chefs">
            <DisplayCards search={search} setSearch={setSearch} inRecipes={false} collectionData={chefsToDisplay} recipes={recipes} onDeleteChef={handleDeleteChef} reviews={reviews} chefs={chefs}/>
        </Route>
        <Route exact path="/chefs/:id">
          <CardDetails isRecipe={false} dataForDetails={chefs} reviews={reviews} />
        </Route>
        <Route exact path="/recipes/:id">
          <CardDetails isRecipe={true} reviews={reviews} dataForDetails={recipes} onPostComment={handlePostComment} chefs={chefs} />
        </Route>
        <Route exact path="/new">
          <NewCardForm chefs={chefs} onSubmit={handleSubmitRecipe} onChefSubmit={handleSubmitChef}/>
          <br></br>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
