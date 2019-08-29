//Libs
import React from "react";
import { Switch, Route } from "react-router-dom";

//Components
import Home from "../Home/Home";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  </main>
);

export default Main;
