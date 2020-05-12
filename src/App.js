import React, { useState } from "react";
import "./App.css";
import Header from "./component/Header/Header";
import Banner from "./component/Banner/Banner";
import FoodSelectionLink from "./component/FoodSelectionLink/FoodSelectionLink";
import Review from "./component/Review/Review";
import Footer from "./component/Footer/Footer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FoodDetails from "./component/FoodDetails/FoodDetails";
import NotFound from "./component/NotFound/NotFound";
import LogIn from "./component/LogIn/LogIn";
import { AuthContextProvider } from "./component/useAuth/useAuth";
import CheckOut from "./component/CheckOut/CheckOut";
import Shipment from "./component/Shipment/Shipment";
import Inventory from "./component/Inventory/Inventory";

function App() {
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    todoor: null,
    road: null,
    flat: null,
    businessname: null,
    address: null,
  });
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const getUserName = (name) => {
    setUserName(name);
  };
  const getUserEmail = (email) => {
    setUserEmail(email);
  };

  const clearCart = () => {
    const orderedItems = cart.map((cartItem) => {
      return { food_id: cartItem.id, quantity: cartItem.quantity };
    });

    // place orders
    const orderDetailsData = {
      name: userName,
      email: userEmail,
      items: orderedItems,
      details: deliveryDetails,
    };
    fetch("https://red-onion-restaurant-by-shakib.herokuapp.com/placeOrder", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(orderDetailsData),
    })
      .then((res) => res.json())
      .then((data) => setOrderId(data._id));
    console.log(orderId);

    setCart([]);
  };

  const deliveryDetailsHandler = (data) => {
    setDeliveryDetails(data);
  };

  // for managing quantity in cart in header
  const cartHandler = (data) => {
    const alreadyAdded = cart.find((crt) => crt.id == data.id);
    const newCart = [...cart, data];
    setCart(newCart);
    if (alreadyAdded) {
      const reamingCarts = cart.filter((crt) => cart.id != data);
      setCart(reamingCarts);
    } else {
      const newCart = [...cart, data];
      setCart(newCart);
    }
  };

  // final food plus-minus buttons
  const checkOutItemHandler = (productId, productQuantity) => {
    const newCart = cart.map((item) => {
      if (item.id == productId) {
        item.quantity = productQuantity;
      }
      return item;
    });

    const filteredCart = newCart.filter((item) => item.quantity > 0);
    setCart(filteredCart);
  };

  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Switch>
            <Route path="/home">
              <Header cart={cart}></Header>
              <Banner></Banner>
              <FoodSelectionLink cart={cart}></FoodSelectionLink>
              <Review></Review>
              <Footer></Footer>
            </Route>

            <Route exact path="/">
              <Header cart={cart}></Header>
              <Banner></Banner>
              <FoodSelectionLink cart={cart}></FoodSelectionLink>
              <Review></Review>
              <Footer></Footer>
            </Route>

            <Route path="/foodDetails/:foodId">
              <Header cart={cart}></Header>
              <FoodDetails cart={cart} cartHandler={cartHandler}></FoodDetails>
            </Route>

            <Route path="/login">
              <LogIn></LogIn>
            </Route>

            <Route path="/checkout">
              <Header cart={cart}></Header>
              <CheckOut
                cart={cart}
                checkOutItemHandler={checkOutItemHandler}
                deliveryDetails={deliveryDetails}
                deliveryDetailsHandler={deliveryDetailsHandler}
                clearCart={clearCart}
                getUserName={getUserName}
                getUserEmail={getUserEmail}
              ></CheckOut>
              <Footer></Footer>
            </Route>

            <Route path="/shipment">
              <Header cart={cart}></Header>
              <Shipment
                deliveryDetails={deliveryDetails}
                cart={cart}
                orderId={orderId}
              ></Shipment>
              <Footer></Footer>
            </Route>

            <Route path="/inventory">
              <Header cart={cart}></Header>
              <Inventory></Inventory>
            </Route>

            <Route path="*">
              <Header cart={cart}></Header>
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
