
import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Drawer from '../Drawer/Drawer';
import Profile from "../../Authentication/Profile/Profile"
import Calendar from "../../Components/Calendar/Calendar"
import DayView from "../../Components/DayView/DayView"
import Table from "../../Components/Table/Table"

import "./App.css";

function App() {
    return (
        <Router>
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header full">

                <Header />

                <Drawer />

                <main className="mdl-layout__content mdl-color--grey-200">

                    <div id="content-div">

                        <Route path="/profile" component={Profile} />
                        <Route path="/calendar" component={Calendar} />
                        <Route path="/dayView" component={DayView} />
                        <Route path="/table" component={Table} /> 
                        <Route exact path="/" component={Main} />  

                    </div>

                    <Footer />

                </main>
            </div>

        </Router>
    );
}

export default App;
