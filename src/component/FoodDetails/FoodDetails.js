import React, { useState, useEffect } from "react";
import "./FoodDetails.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const FoodDetails = (props) => {
  const [selectedFood, setSelectedFood] = useState([]);

  const { foodId } = useParams();

  const [selectedBigImg, setSelectedBigImg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3002/food/" + foodId)
      .then((res) => res.json())
      .then((data) => {
        setSelectedFood(data);
      })
      .catch((err) => console.log(err));

    if (selectedFood.images) {
      setSelectedBigImg(selectedFood.images[0]);
    }
  }, [selectedFood.name]);

  const finalCartHandler = (selectedFood) => {
    selectedFood.quantity = quantity;
    props.cartHandler(selectedFood);
    setIsSuccess(true);
  };
  if (isSuccess) {
    setTimeout(() => setIsSuccess(false), 1500);
  }

  const updatedPrice = selectedFood.price * quantity;

  return (
    <div className="food-details my-5 pt-5 container">
      {selectedFood.name && (
        <div className="row">
          <div className="col-md-6 pr-md-4">
            <h1>{selectedFood.name}</h1>
            <p className="my-5">{selectedFood.fullDescription}</p>
            <div className="pmButton d-flex my-4">
              <h2 className="price">$ {updatedPrice.toFixed(2)}</h2>

              {/* plus-minus button controller */}
              <div className="cart-controller ml-3 ">
                <button
                  className="btn"
                  onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}
                >
                  -
                </button>
                {quantity}
                <button
                  className="btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="addBtn d-flex align-items-center">
              <button
                className="signUpButton"
                onClick={() => finalCartHandler(selectedFood)}
              >
                <FontAwesomeIcon icon={faCartArrowDown} /> Add
              </button>
              {isSuccess && (
                <p className="ml-3 success-mgs text-success">
                  <FontAwesomeIcon icon={faCheckCircle} /> Item added to Cart
                </p>
              )}
            </div>

            <div className="more-images mt-5 ">
              {selectedFood.images.map((img, index) => (
                <img
                  onClick={() => setSelectedBigImg(selectedFood.images[index])}
                  className={
                    selectedFood.images[index] === selectedBigImg
                      ? "mr-4 small-img active-small-img"
                      : "mr-4 small-img"
                  }
                  height="150px"
                  src={img}
                  alt=""
                />
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <img className="img-fluid" src={selectedFood.images[0]} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
