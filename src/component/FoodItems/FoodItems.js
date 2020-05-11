import React from "react";
import "./FoodItems.css";
import { Link } from "react-router-dom";

const FoodItems = (props) => {
  //console.log(props.food);
  const { id, name, shortDescription, price, images } = props.food;
  return (
    <div className="itemContainer col-md-4 mb-4">
      <Link to={"/foodDetails/" + id}>
        {
          <div className="card text-center">
            <img src={images[0]} alt="" className="card-img-top" />

            <div className="card-body">
              <h5>{name}</h5>
              <p>{shortDescription}</p>
              <h4>${price.toFixed(2)}</h4>
            </div>
          </div>
        }
      </Link>
    </div>
  );
};

export default FoodItems;
