import React from "react";

function Search({ search, setSearch }) {

  return (
    <div className="filter">
      <label>Search Chefs by Name: </label>
      <input type="text" placeholder="E.g. Gordon Ramsay" value={search} onChange={e => setSearch(e.target.value)}>
      </input>
    </div>
  );
}

export default Search;