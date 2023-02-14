import React from "react";

function ListOfChefIds({ chefs }) {
  return (
    <div className="list-of-chefs">
        <h4>KEY: Chef IDs</h4>
        {chefs.map(chef => {
            return (
                <li>{chef.first_name} {chef.last_name} - {chef.id}</li>
            )
        })}
    </div>
  );
}

export default ListOfChefIds;