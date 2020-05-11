import React, { useState } from "react";
import "./LogIn.css";
import banner from "../../logo/bannerbackground.png";
import logo from "../../logo/logo2.png";
import Auth from "../useAuth/useAuth";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const LogIn = () => {
  const [registeredUser, setRegisteredUser] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();

  const auth = Auth();

  const onSubmit = (data) => {
    if (registeredUser) {
      if (data.email && data.password) {
        auth.signIn(data.email, data.password);
      }
    } else {
      if (data.name && data.email && data.password && data.confirm_password) {
        auth.signUp(data.email, data.confirm_password, data.name);
      }
    }
  };

  return (
    <div>
      <img src={banner} alt="" />
      <div className="centeredLogo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>

        {registeredUser ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            {auth.user != null && (
              <p className="text-danger">* {auth.user.error}</p>
            )}

            <div className="form-group">
              <input
                name="email"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Email"
              />
              {errors.email && <span>Email is required</span>}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Password"
              />
              {errors.password && <span>Password is required</span>}
            </div>

            <div className="form-group">
              <button className="btn btn-danger btn-block" type="submit">
                Sign In
              </button>
            </div>
            <div className="option text-center">
              <label onClick={() => setRegisteredUser(false)}>
                Create a new Account
              </label>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {auth.user != null && (
              <p className="text-danger">* {auth.user.error}</p>
            )}
            <div className="form-group">
              <input
                name="name"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Name"
              />
              {errors.name && <span>Name is required</span>}
            </div>
            <div className="form-group">
              <input
                name="email"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Email"
              />
              {errors.email && <span>Email is required</span>}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Password"
              />
              {errors.password && (
                <span>Password required & must be at least 6 characters</span>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirm_password"
                className="form-control"
                ref={register({
                  validate: (value) => value === watch("password"),
                })}
                placeholder="Confirm Password"
              />
              {errors.confirm_password && <span>Passwords don't match.</span>}
            </div>
            <div className="form-group">
              <button className="btn btn-danger btn-block" type="submit">
                Sign Up
              </button>
            </div>
            <div className="option text-center">
              <label onClick={() => setRegisteredUser(true)}>
                Already Have an Account
              </label>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LogIn;
