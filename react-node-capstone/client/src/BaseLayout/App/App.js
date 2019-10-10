import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Profile from "../../Authentication/Profile/Profile";
import CalenderView from "../../Views/CalenderView/CalenderView";
import GroupView from "../GroupView/GroupView";
import AddAdvisingSlots from "../../Views/AdvisingSlots/Add/AddSlots";
import ViewAdvisingSlots from "../../Views/AdvisingSlots/View/AdvisingSlots";
import EventsView from "../EventsView/EventsView";
import RequestEvent from "../../components/EventsPage/RequestEvent";
import ViewAllEvents from "../../components/EventsPage/ViewAllEvents";
import CreateEvent from "../../components/EventsPage/CreateEvent";
import ApproveEvent from "../../components/EventsPage/ApproveEvent";

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
              <Route path="/calenderView" component={CalenderView} />
              <Route path="/advisingSlots/view" component={ViewAdvisingSlots} />
              <Route path="/advisingSlots/add" component={AddAdvisingSlots} />
              <Route path="/groupView" component={GroupView} />
              <Route path="/eventsView" component={EventsView}/>
              <Route path="/requestEvent" component={RequestEvent} />
              <Route path="/viewAllEvents" component={ViewAllEvents} />
              <Route path="/createEvent" component={CreateEvent} />
              <Route path="/approveEvent" component={ApproveEvent} />
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
