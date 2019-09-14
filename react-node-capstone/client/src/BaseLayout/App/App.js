import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Profile from "../../Authentication/Profile/Profile";
import Calendar from "../../Components/Calendar/Calendar";
import DayView from "../../Components/DayView/DayView";
import Table from "../../Components/Table/Table";
import StudentList from "../../Views/Students/StudentList/StudentList";
import AddStudents from "../../Views/Students/AddStudents/AddStudents";
import Register from "../../Authentication/Register/Register.js";
import Login from "../../Authentication/Login/Login.js";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header full">
        <Header />

        <main className="mdl-layout__content mdl-color--grey-200">
          <div id="content-div">
            <Route path="/profile" component={Profile} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/dayView" component={DayView} />
            <Route path="/table" component={Table} />
            <Route path="/studentList" component={StudentList} />
            <Route path="/addStudents" component={AddStudents} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route exact path="/" component={Main} />
          </div>

          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;
