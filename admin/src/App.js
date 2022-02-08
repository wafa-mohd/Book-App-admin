import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./css/sb-admin-2.min.css";
import AddBook from "./pages/books/AddBook";
import Book from "./pages/books/Book";
import Login from "./pages/login/Login";
import AddCategory from "./pages/category/AddCategory";
import Category from "./pages/category/Category";
import AddSubCategory from "./pages/subCategory.js/AddSubCategory";
import SubCategory from "./pages/subCategory.js/SubCategory";
import EditCategory from "./pages/category/EditCategory";
import EditSubCategory from "./pages/subCategory.js/EditSubCategory";
import EditBook from "./pages/books/EditBook";
import OrderList from "./pages/orders/OrderList";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/book/add">
          <AddBook />
        </Route>
        <Route path="/book/edit/:id">
          <EditBook />
        </Route>
        <Route path="/book">
          <Book />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/category/add">
          <AddCategory />
        </Route>
        <Route path="/category/edit/:id">
          <EditCategory />
        </Route>
        <Route path="/category">
          <Category />
        </Route>
        <Route path="/sub-category/add">
          <AddSubCategory />
        </Route>
        <Route path="/sub-category/edit/:id">
          <EditSubCategory />
        </Route>
        <Route path="/sub-category">
          <SubCategory />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <OrderList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
