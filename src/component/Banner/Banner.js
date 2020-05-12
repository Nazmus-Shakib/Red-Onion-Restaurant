import React from "react";
import banner from "../../logo/bannerbackground.png";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner col-xl-12 align-items-center d-flex text-center">
      <img src={banner} alt="Banner of Red Onion Restaurant" />
      <div className="centered">
        <h1>Best foods are waiting for you !!!</h1>

        <div className="search-box col-md-6 my-5 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search Food Item"
          />

          <button className="btn btn-danger search-btn">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
