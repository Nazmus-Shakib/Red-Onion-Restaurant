import React, { useState, useEffect } from "react";
import "./Shipment.css";
import image1 from "../../red-onion-restaurent-resources-master/Image/satelight image.png";
import image2 from "../../red-onion-restaurent-resources-master/Image/Group 1151.png";
import image3 from "../../red-onion-restaurent-resources-master/Image/Group 1152.png";
import { useAuth } from "../useAuth/useAuth";

const Shipment = (props) => {
  const auth = useAuth();

  const [orderId, setOrderId] = useState();
  useEffect(() => {
    setOrderId(props.orderId);
    window.scrollTo(0, 0);
  }, [props]);

  return (
    <div className="shipContainer">
      <div className="col-md-6 satImg">
        <img src={image1} alt="" />
      </div>
      <div className="col-md-6 shipImg">
        <img src={image2} alt="" />
        <br />

        <div>
          {auth.user ? (
            <h2>{auth.user.name}</h2>
          ) : (
            <h4>User Name will be displayed here</h4>
          )}
          <h5>Thanks for placing Order !!! </h5>
        </div>
        <hr />

        <div>
          {orderId ? (
            <div>
              <h4>Order Id: {props.orderId}</h4>
            </div>
          ) : (
            <h5>Fetching Order Id ...</h5>
          )}
          <br />
          <h4>Your Location:</h4>
          {props.deliveryDetails ? (
            <div>
              <h6>{props.deliveryDetails.flat}</h6>
              <h6>{props.deliveryDetails.address}</h6>
            </div>
          ) : (
            <p>Loading data ...</p>
          )}
        </div>
        <hr />

        <h4>9:30 PM</h4>
        <h5>Estimated delivery Time</h5>

        <div className="bg-white rounded p-3 d-flex">
          <img className="w-10 mr-4" src={image3} alt="" />
          <div>
            <h6>Hamim</h6>
            <p>Your Rider</p>
          </div>
        </div>

        <button className="btn btn-danger ml-5">Contact</button>
      </div>
    </div>
  );
};

export default Shipment;
