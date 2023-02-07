import React from "react";

function Filter({ selectedType, setSelectedType, onNewSelection }) {

  return (
    <div className="filter">
      <label>Search Recipes by Type: </label>
      <select value={selectedType} onChange={e => onNewSelection(e.target.value)}>
        {/* (e) => setSelectedType(e.target.value)}> */}
        <option value="all">All</option>
        <option value="dessert">Desserts</option>
        <option value="sides">Sides</option>
        <option value="main">Mains</option>
      </select>
    </div>
  );
}

export default Filter;