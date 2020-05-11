import React, { useState } from "react";
import "./CheckOut.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const CheckOut = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  const subTotal = props.cart.reduce((acc, crr) => {
    return acc + crr.price * crr.quantity;
  }, 0);
  const totalQuantity = props.cart.reduce((acc, crr) => {
    return acc + crr.quantity;
  }, 0);
  const tax = (subTotal / 100) * 5;
  const deliveryFee = totalQuantity && 2;
  const grandTotal = subTotal + tax + deliveryFee;

  return (
    <div className="checkOutContainer">
      <div className="col-md-4 detailsContainer ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              name="deliveryAddress1"
              className="form-control"
              ref={register({ required: true })}
              placeholder="Delivery To Door"
            />
            {errors.deliveryAddress1 && (
              <span>Delivery To Door is required</span>
            )}
          </div>

          <div className="form-group">
            <input
              name="deliveryAddress2"
              className="form-control"
              ref={register({ required: true })}
              placeholder="Road No."
            />
            {errors.deliveryAddress2 && <span>Road No. is required</span>}
          </div>

          <div className="form-group">
            <input
              name="deliveryAddress3"
              className="form-control"
              ref={register({ required: true })}
              placeholder="Flat, Suite or Floor"
            />
            {errors.deliveryAddress3 && (
              <span>Flat, Suite or Floor is required</span>
            )}
          </div>

          <div className="form-group">
            <input
              name="deliveryAddress4"
              className="form-control"
              ref={register({ required: true })}
              placeholder="Business Name"
            />
            {errors.deliveryAddress4 && <span>Business Name is required</span>}
          </div>

          <div className="form-group">
            <input
              name="deliveryAddress5"
              className="form-control"
              ref={register({ required: true })}
              placeholder="Address"
            />
            {errors.deliveryAddress5 && <span>Address Name is required</span>}
          </div>

          <div className="form-group">
            <button className="btn btn-danger btn-block" type="submit">
              Save & Continue
            </button>
          </div>
        </form>
      </div>

      <div className="col-md-6 itemContainer">
        {props.cart.map((item) => (
          <div className=" mb-3 bg-light rounded d-flex align-items-center justify-content-between p-3">
            <img width="100px" src={item.images[0]} alt="" />
            <div>
              <h6>{item.name}</h6>

              <h4 className="text-danger">${item.price.toFixed(2)}</h4>
            </div>
            <div className="checkout-item-button ml-3 btn">
              <button
                onClick={() =>
                  props.checkOutItemHandler(item.id, item.quantity + 1)
                }
                className="btn font-weight-bolder"
              >
                +
              </button>
              <button className="btn bg-white rounded">{item.quantity}</button>

              {item.quantity > 0 ? (
                <button
                  className="btn font-weight-bolder"
                  onClick={() =>
                    props.checkOutItemHandler(item.id, item.quantity - 1)
                  }
                >
                  -
                </button>
              ) : (
                <button disabled className="btn font-weight-bolder">
                  -
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="cart-calculation">
          <p className="d-flex justify-content-between">
            <span>
              Sub Total: <b>{totalQuantity}</b> Item
            </span>
            <span>$ {subTotal.toFixed(2)}</span>
          </p>
          <p className="d-flex justify-content-between">
            <span>Tax</span>
            <span>$ {tax.toFixed(2)}</span>
          </p>
          <p className="d-flex justify-content-between">
            <span>Delivery Fee</span>
            <span>$ {deliveryFee}</span>
          </p>
          <p className="h5 d-flex justify-content-between">
            <span>Total</span>
            <span>$ {grandTotal.toFixed(2)}</span>
          </p>
          <br />
          <Link to="/shipment">
            <button className="btn btn-secondary placeButton">
              Place Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
