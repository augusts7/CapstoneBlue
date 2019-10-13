import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Profile from "../../Authentication/Profile/Profile";
import CalenderView from "../../Views/CalenderView/CalenderView";
import GroupView from "../GroupView/GroupView";
import EventsView from "../EventsView/EventsView";
import RequestEvent from "../../components/EventsPage/RequestEvent";
import ViewAllEvents from "../../components/EventsPage/ViewAllEvents";
import CreateEvent from "../../components/EventsPage/CreateEvent";
import ApproveEvent from "../../components/EventsPage/ApproveEvent";

import "./App.css";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.onLogout();  
    }

    render() {

       
        return (
            <Router>
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header full">
                    <Header onLogout={this.handleLogout} />

                    <main className="mdl-layout__content mdl-color--grey-200">
                        <div id="content-div">
                            <Switch>
                                <Route path="/profile" component={Profile} />
                                <Route path="/calenderView" component={CalenderView} />
                                <Route path="/groupView" component={GroupView} />
                                <Route path="/eventsView" component={EventsView} />
                                <Route path="/requestEvent" component={RequestEvent} />
                                <Route path="/viewAllEvents" component={ViewAllEvents} />
                                <Route path="/createEvent" component={CreateEvent} />
                                <Route path="/approveEvent" component={ApproveEvent} />
                                <Route path="/" component={Main} />
                            </Switch>
                        </div>

                        <Footer />
                    </main>
                </div>
            </Router>
        );
    }
}

export default App;
