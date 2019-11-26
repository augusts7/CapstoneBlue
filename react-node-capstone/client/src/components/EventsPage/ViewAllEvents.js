import React from "react";
import ApproveEventsList from "./ApproveEventsList";
import "./ViewAll.css";
import ls from "local-storage";

class ViewAllEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user_type: ls.get("user_type"),
        events: []
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
      console.log(this.state.user_type);
    fetch("/events/notattendingGlobal")
      .then(res => res.json())
      .then(eventData => this.setState({ events: eventData }));
  }

  render() {
    return (
      <div className="viewAll">
        <div className="allEventsTitle">
          <h4>All Events</h4>
        </div>
        <hr />
        <ApproveEventsList
          action={() => this.getEvents()}
          events={this.state.events}
          user_type={this.state.user_type}
        />
      </div>
    );
  }
}

export default ViewAllEvents;
