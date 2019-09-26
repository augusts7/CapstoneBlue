import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Profile from "../../Authentication/Profile/Profile";
import MyCalendar from "../../Components/Calendar/MyCalendar";

import "./App.css";

class App extends React.Component {

    render() {

        let id = this.props.id || "";

        return (
            <Router>
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header full">
                    <Header id={id} />

                    <main className="mdl-layout__content mdl-color--grey-200">
                        <div id="content-div">
                            <Route path="/profile" component={Profile} />
                            <Route path="/calendar" component={MyCalendar} />
                            <Route exact path="/" component={Main} />
                        </div>

                        <Footer />
                    </main>
                </div>
            </Router>
        );
    }

    
}

export default App;
