import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import AdminIndex from "./AdminIndex";

function Main() {
  return (
    <div className="main" style={{ height: "100%" }}>
      <Router>
        <Redirect from="/" to="/login"></Redirect>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/index" component={AdminIndex}></Route>
      </Router>
    </div>
  );
}

export default Main;
