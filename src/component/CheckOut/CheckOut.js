import React, { useState } from "react";
import "./CheckOut.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../useAuth/useAuth";
import Payment from "../Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const CheckOut = (props) => {
  const auth = useAuth();
  const { register, handleSubmit, watch, errors } = useForm();

  const stripePromise = loadStripe(
    "pk_test_QsfONLaKpNdyz0cv97kEJHmi00zlsfcgmg"
  );
  const [paid, setPaid] = useState(null);
  const markAsPaid = (paymentInfo) => {
    setPaid(paymentInfo);
  };

  const onSubmit = (data) => {
    //console.log(data)
    props.deliveryDetailsHandler(data);
    props.getUserName(auth.user.name);
    props.getUserEmail(auth.user.email);
  };
  const { todoor, road, flat, businessname, address } = props.deliveryDetails;

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
        <div
          style={{
            display:
              todoor && road && flat && businessname && address
                ? "none"
                : "block",
          }}
        >
          <h4>Delivery Details</h4>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                name="todoor"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={todoor}
                placeholder="Delivery To Door"
              />
              {errors.todoor && <span>Delivery To Door is required</span>}
            </div>

            <div className="form-group">
              <input
                name="road"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={road}
                placeholder="Road No."
              />
              {errors.road && <span>Road No. is required</span>}
            </div>

            <div className="form-group">
              <input
                name="flat"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={flat}
                placeholder="Flat, Suite or Floor"
              />
              {errors.flat && <span>Flat, Suite or Floor is required</span>}
            </div>

            <div className="form-group">
              <input
                name="businessname"
                className="form-control"
                ref={register()}
                defaultValue={businessname}
                placeholder="Business Name"
              />
            </div>

            <div className="form-group">
              <input
                name="address"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={address}
                placeholder="Address"
              />
              {errors.address && <span>Address Name is required</span>}
            </div>

            <div className="form-group">
              <button className="btn btn-danger btn-block" type="submit">
                Save & Continue
              </button>
            </div>
          </form>
        </div>

        <div
          style={{
            display:
              todoor && road && flat && businessname && address
                ? "block"
                : "none",
          }}
        >
          <h3>Payment Information</h3>
          <Elements stripe={stripePromise}>
            <Payment markAsPaid={markAsPaid}></Payment>
          </Elements>
        </div>
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
          {totalQuantity ? (
            paid ? (
              <Link to="/shipment">
                <button
                  onClick={() => props.clearCart()}
                  className="btn btn-block btn-danger"
                >
                  Check Out Your Food
                </button>
              </Link>
            ) : (
              <button disabled className="btn btn-block btn-secondary">
                Check Out Your Food
              </button>
            )
          ) : (
            <button disabled className="btn btn-block btn-secondary">
              Nothing to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
