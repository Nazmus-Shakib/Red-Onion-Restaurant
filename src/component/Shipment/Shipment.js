import React from "react";
import "./Shipment.css";
import image1 from "../../red-onion-restaurent-resources-master/Image/satelight image.png";
import image2 from "../../red-onion-restaurent-resources-master/Image/Group 1151.png";
import image3 from "../../red-onion-restaurent-resources-master/Image/Group 1152.png";
import { useAuth } from "../useAuth/useAuth";

const Shipment = (props) => {
  const auth = useAuth();
  console.log(auth.user);

  return (
    <div className="shipContainer">
      <div className="col-md-6 satImg">
        <img src={image1} alt="" />
      </div>
      <div className="col-md-6 shipImg">
        <img src={image2} alt="" />
        <br />
        <br />
        <br />
        <h4>9:30</h4>
        <h5>Estimated delivery Time</h5>
        <br />

        <div className="d-flex smallImg">
          <img src={image3} alt="" />

          <div className="userInfo">
            {auth.user ? (
              <h4>{auth.user.name}</h4>
            ) : (
              <h4>User Name will be displayed here</h4>
            )}
            <h2>Thanks for placing Order !!! </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
