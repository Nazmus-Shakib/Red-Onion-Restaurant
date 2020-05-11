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
              ></CheckOut>
              <Footer></Footer>
            </Route>

            <Route path="/shipment">
              <Header cart={cart}></Header>
              <Shipment cart={cart}></Shipment>
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
