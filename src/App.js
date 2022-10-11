import React, { Component } from "react";
// import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddUser from "./components/add-user.component";
import LoginUser from "./components/login-user.component";
import User from "./components/user.component";
import UsersList from "./components/users-list.component";


function App() {
  return (
    <Router>   
     <nav className="navbar navbar-expand navbar-dark bg-dark t-pad">
          <Link to={"/"} className="navbar-brand">
            TPC.FRONTEND
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<UsersList/>} />
            <Route path="/add" element={<AddUser/>} />
            <Route path="/login" element={<LoginUser/>} />
            <Route path="/users/:id" element ={<User/>} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
