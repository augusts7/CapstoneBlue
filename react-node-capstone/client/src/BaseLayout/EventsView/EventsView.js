import React from "react";
import "./EventsView.css";
import ls from "local-storage";
import Button from "@material-ui/core/Button";
import CreateEvent from "../../components/EventsPage/CreateEvent";
import RequestEvent from "../../components/EventsPage/RequestEvent";
import UserContext from "../../Context/UserContext";
import ApproveEventsList from "../../components/EventsPage/ApproveEventsList";
import ApproveEvent from "../../components/EventsPage/ApproveEvent";
import { isNullOrUndefined } from "util";

class EventsView extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      user: 0,
      user_type: ls.get("user_type"),
      events: []
    };
  }

  componentDidMount() {
    this.getEvents();
    this.getUser();
  }

  getUser() {
    var getUserURL = "/user_info/user";
    fetch(getUserURL)
      .then(res => res.json())
      .then(userInfo => {
        if (userInfo === isNullOrUndefined || userInfo.length <= 0) {
        } else {
          this.setState({ user: userInfo[0].user_id });
        }
      });
  }

  getEvents() {
    var eventsURL = "/events/attendingGlobal";
    fetch(eventsURL)
      .then(res => res.json())
      .then(global_events => this.setState({ events: global_events }));
  }

  render() {
    if (this.state.user_type === "student") {
      return (
        <div className="flex-full">
          <div className="inner">
            <RequestEvent user={this.state.user} />
          </div>
          <div className="inner">
            <Button
              type="submit"
              variant="contained"
              size="large"
              className="msgBtn"
              href="/viewAllEvents"
            >
              <i className="material-icons">event</i>View All Events
            </Button>
          </div>
          <h4 className="title">My Events</h4>
          <hr />
          <div>
            <ApproveEventsList events={this.state.events} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex-full">
          <div className="inner">
            <CreateEvent user={this.state.user} />
          </div>
          <div className="inner">
            <ApproveEvent />
          </div>
          <div className="inner">
            <Button
              type="submit"
              variant="contained"
              size="large"
              className="msgBtn"
              href="/viewAllEvents"
            >
              <i className="material-icons">event</i>View All Events
            </Button>
          </div>
          <h4 className="title">My Events</h4>
          <hr />
          <div>
            <ApproveEventsList events={this.state.events} />
          </div>
        </div>
      );
    }
  }
}

export default EventsView;
