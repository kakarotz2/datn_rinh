import React from "react";
import "./App.css";
import HomePage from "./page/HomePage/HomePage.jsx";
import DetailsPage from "./page/DetailsPage/DetailsPage.jsx";
import CartPage from "./page/CartPage/CartPage.jsx";
import RegisterPage from "./page/RegisterPage/RegisterPage.jsx";
import LoginPage from "./page/LoginPage/LoginPage.jsx";
import ProductPage from "./page/ProductPage/ProductPage.jsx";
import SearchPage from "./page/SearchPage/SearchPage.jsx";
import CheckoutPage from "./page/CheckoutPage/CheckoutPage.jsx";
import AccountPage from "./page/AccountPage/AccountPage";
import AdminPage from "./page/AdminPage/AdminPage.jsx";
import DashBoard from "./components/AdminComponents/Dashboard/DashBoard.jsx";
import NewAdmin from './components/AdminComponents/NewProduct/NewProduct.jsx'
import VansAdmin from "./components/AdminComponents/Vans/VansAdmin.jsx";
import ConverseAdmin from "./components/AdminComponents/Converse/ConverseAdmin.jsx";
import AccessoriesAdmin from "./components/AdminComponents/Accessories/AccessoriesAdmin.jsx";
import OrderAdmin from "./components/AdminComponents/Order/OrderAdmin.jsx";
import UserAdmin from "./components/AdminComponents/User/UserAdmin.jsx";
import NotFound from "./page/NotFound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/cart" component={CartPage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/search" component={SearchPage}></Route>
          <Route path="/checkout" component={CheckoutPage}></Route>
          <Route path="/cart" component={CartPage}></Route>
          <Route path="/account" component={AccountPage}></Route>
          <Route path="/product/:id" component={DetailsPage}></Route>
          <Route path="/admin/" exact={true}>
            <AdminPage>
              <Switch>
                <Route path="/admin" component={DashBoard}></Route>
              </Switch>
            </AdminPage>
          </Route>
          <Route path="/admin/:slug" exact={true}>
            <AdminPage>
              <Switch>
                <Route path="/admin/new" component={NewAdmin}></Route>
                <Route path="/admin/converse" component={ConverseAdmin}></Route>
                <Route path="/admin/vans" component={VansAdmin}></Route>
                <Route
                  path="/admin/accessories"
                  component={AccessoriesAdmin}
                ></Route>
                <Route path="/admin/order" component={OrderAdmin}></Route>
                <Route path="/admin/user" component={UserAdmin}></Route>
              </Switch>
            </AdminPage>
          </Route>
          <Route path="/:slug" component={ProductPage}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
