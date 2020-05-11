import React from "react";
//import fakeData from "../../fakeData";

const Inventory = () => {
  const handleAddInventory = () => {
    // fetch("http://localhost:3002/addFood", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(fakeData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("post successful", data);
    //   });
  };
  return (
    <div>
      <h1 style={{ marginTop: "100px" }}>Add Inventory to sell more....</h1>
      <button onClick={handleAddInventory}>Add Inventory</button>
    </div>
  );
};

export default Inventory;
