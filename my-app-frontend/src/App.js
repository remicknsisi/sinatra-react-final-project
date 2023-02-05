import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import NavBar from "./components/NavBar.js";
import Home from "./components/Home.js"

function App() {

  fetch("http://localhost:9292")
  .then((res) => res.json())
  .then((data) => console.log(data));

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
