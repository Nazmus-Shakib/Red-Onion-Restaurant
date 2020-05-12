import React from "react";
import logo from "../../logo/logo2.png";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../useAuth/useAuth";

const Header = (props) => {
  const auth = useAuth();

  return (
    <nav className="navbar navbar-expand navbar-light bg-white py-2 fixed-top">
      <div class="container">
        <Link to="/">
          <img src={logo} alt="Red Onion Logo"></img>
        </Link>

        {/* <Link to="/inventory">
          <button>Inventory</button>
        </Link> */}

        <ul className="navbar-nav align-items-center">
          <li className="nav-item active">
            {auth.user ? (
              <Link to="/checkout" className="nav-link">
                <FontAwesomeIcon className="cart-icon" icon={faCartArrowDown} />
                <span className="badge bg-light">{props.cart.length}</span>
              </Link>
            ) : (
              <Link to="/login" className="nav-link">
                <FontAwesomeIcon className="cart-icon" icon={faCartArrowDown} />
                <span className="badge bg-light">{props.cart.length}</span>
              </Link>
            )}
          </li>

          <li className="nav-item">
            {auth.user ? (
              <h2>{auth.user.name}</h2>
            ) : (
              <Link to="/login">
                <button className="logInButton">Log In</button>
              </Link>
            )}
          </li>

          <li className="nav-item">
            {auth.user ? (
              <button className="signUpButton" onClick={auth.signOut}>
                Sign Out
              </button>
            ) : (
              <Link to="/login">
                <button className="signUpButton">Sign Up</button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
