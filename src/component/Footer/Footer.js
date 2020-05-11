import React from "react";
import Logo from "../../logo/logo2.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark py-3">
      <div className="container">
        <div className="row footer-top py-5">
          <div className="col-md-6 mb-5">
            <img src={Logo} alt="Hot Onion White Logo" />
          </div>
          <div className="col-md-3">
            <ul className="list-unstyled">
              <li>About Online Food</li>
              <li>Read Our Blog</li>
              <li>Sign up to deliver</li>
              <li>Add your restaurant</li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="list-unstyled">
              <li>Get Help</li>
              <li>Read FAQ</li>
              <li>View All Cities</li>
              <li>Restaurants near me</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom d-flex justify-content-between align-items-center">
          <small className="text-info">
            Copyright &copy; 2020 Nazmus Shakib - Red Onion Online Food Service
          </small>
          <ul className="list-inline">
            <li className="list-inline-item ml-3">
              <a href="">Privacy Policy</a>
            </li>
            <li className="list-inline-item  ml-3">
              <a href="">Terms & Conditions</a>
            </li>
            <li className="list-inline-item  ml-3">
              <a href="">Pricing</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
