import React, { useState, useEffect } from "react";
import "./FoodSelectionLink.css";
import FoodItems from "../FoodItems/FoodItems";
import { Link } from "react-router-dom";

const FoodSelectionLink = (props) => {
  const [foods, setFoods] = useState([]);
  const [selectedFoodType, setSelectedFoodType] = useState("Breakfast");

  useEffect(() => {
    fetch("http://localhost:3002/foods")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const selectedFoods = foods.filter((food) => food.type === selectedFoodType);

  return (
    <section className="food-area my-5">
      <div className="container">
        <nav>
          <ul className="nav justify-content-center">
            <li
              onClick={() => setSelectedFoodType("Breakfast")}
              className="nav-item"
            >
              <span
                to="breakfast"
                className={
                  selectedFoodType === "Breakfast"
                    ? "active nav-link"
                    : "nav-link"
                }
              >
                Breakfast
              </span>
            </li>

            <li
              onClick={() => setSelectedFoodType("Lunch")}
              className="nav-item"
            >
              <span
                to="breakfast"
                className={
                  selectedFoodType === "Lunch" ? "active nav-link" : "nav-link"
                }
              >
                Lunch
              </span>
            </li>

            <li
              onClick={() => setSelectedFoodType("Dinner")}
              className="nav-item"
            >
              <span
                to="breakfast"
                className={
                  selectedFoodType === "Dinner" ? "active nav-link" : "nav-link"
                }
              >
                Dinner
              </span>
            </li>
          </ul>
        </nav>

        <div className="row my-5">
          {selectedFoods.map((food) => (
            <FoodItems key={food.id} food={food}></FoodItems>
          ))}
        </div>

        <div className="text-center">
          {props.cart.length ? (
            <Link to="/checkout">
              <button className="btn btn-danger checkOutBtn">Check Out</button>
            </Link>
          ) : (
            <button disabled className="btn btn-secondary checkOutBtn">
              Check Out
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FoodSelectionLink;
