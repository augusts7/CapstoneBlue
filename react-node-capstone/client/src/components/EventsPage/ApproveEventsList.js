import React, { Component } from "react";

import "./Event.css";
import EventIcon from "@material-ui/icons/Event";
import IconButton from "@material-ui/core/IconButton";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";

class ApproveEventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event_id: 0,
      attendee_id: 0
    };
    this.addToCalendar = this.addToCalendar.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  getMonth(month, type) {
    var monthName = "";
    var monthAbrv = "";
    switch (month) {
      case 1:
        monthName = "January";
        monthAbrv = "Jan";
        break;
      case 2:
        monthName = "Febuary";
        monthAbrv = "Feb";
        break;
      case 3:
        monthName = "March";
        monthAbrv = "Mar";
        break;
      case 4:
        monthName = "April";
        monthAbrv = "Apr";
        break;
      case 5:
        monthName = "May";
        monthAbrv = "May";
        break;
      case 6:
        monthName = "June";
        monthAbrv = "Jun";
        break;
      case 7:
        monthName = "July";
        monthAbrv = "Jul";
        break;
      case 8:
        monthName = "August";
        monthAbrv = "Aug";
        break;
      case 9:
        monthName = "September";
        monthAbrv = "Sept";
        break;
      case 10:
        monthName = "October";
        monthAbrv = "Oct";
        break;
      case 11:
        monthName = "November";
        monthAbrv = "Nov";
        break;
      case 12:
        monthName = "December";
        monthAbrv = "Dec";
        break;
      default:
        monthName = "Error: Not a valid month.";
        monthAbrv = "Error: Not a valid month.";
    }
    if (type === "name") {
      return monthName;
    } else if (type === "abrv") {
      return monthAbrv;
    }
  }

  addToCalendar(event) {
    fetch("/events/attending", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event_id: event
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        console.log(body);
      });
    this.props.action();
  }

  deleteEvent(event) {
    console.log(event);
    fetch("/events/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event_id: event
      })
    })
        .then(function(response) {
          return response.json();
        })
        .then(function(body) {
          console.log(body);
        });
    this.props.action();
  }

  removeEvent(event) {
    fetch("/events/remove", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event_id: event
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        console.log(body);
      });
    this.props.action();
  }

  getRemoveButton(eventID) {
      return (
          <Tooltip title="Remove from Calendar">
            <IconButton
                aria-label="delete"
                onClick={() => this.removeEvent(eventID)}
            >
              <EventBusyIcon />
            </IconButton>
          </Tooltip>
      );
  }

  getAddButton(eventID) {
    return (
        <Tooltip title="Add To Calendar">
          <IconButton
              aria-label="delete"
              onClick={() => this.addToCalendar(eventID)}
          >
            <EventIcon />
          </IconButton>
        </Tooltip>
    );
  }

  getDeleteButton(eventID) {
    if (this.props.user_type === "faculty") {
      return (
          <Tooltip title="Delete Event">
            <IconButton
                aria-label="delete"
                onClick={() => this.deleteEvent(eventID)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
      );
    }
  }

  render() {
    var eventList = <div>Error</div>;
    if (
      this.props.events !== undefined &&
      this.props.events !== null &&
      this.props.events.length > 0
    ) {
      if (window.location.pathname === "/viewAllEvents") {
        eventList = this.props.events.map(event => {
          return (
            <div className="eventItem" key={event.eventID}>
              <div className="date">
                <div className="date-number">
                  {new Date(event.start).getDate()}
                </div>
                <div className="date-name">
                  {this.getMonth(new Date(event.start).getMonth() + 1, "abrv")}{" "}
                </div>
              </div>
              <div className="description">
                <div className="event-title">{event.title}</div>
                <div className="time">
                  {new Date(event.start).toLocaleTimeString("en-US")} -{" "}
                  {new Date(event.end).toLocaleTimeString("en-US")}
                </div>
                {event.description}
                <div className="addButton">
                  {this.getAddButton(event.eventID)}
                  {this.getDeleteButton(event.eventID)}
                </div>
              </div>
            </div>
          );
        });
      }  else if (window.location.pathname === "/eventsView"){
        eventList = this.props.events.map(event => {
          return (
            <div className="eventListItem" key={event.eventID}>
              <div className="date">
                <div className="date-number">
                  {new Date(event.start).getDate()}
                </div>
                <div className="date-name">
                  {this.getMonth(new Date(event.start).getMonth() + 1, "abrv")}{" "}
                </div>
              </div>
              <div className="description">
                <div className="event-title">{event.title}</div>
                <div className="time">
                  {new Date(event.start).toLocaleTimeString("en-US")} -{" "}
                  {new Date(event.end).toLocaleTimeString("en-US")}
                </div>
                {event.description}
              </div>
              {this.getRemoveButton(event.eventID)}
            </div>
          );
        });
      }else {
        eventList = this.props.events.map(event => {
          return (
              <div className="eventItem" key={event.eventID}>
                <div className="date">
                  <div className="date-number">
                    {new Date(event.start).getDate()}
                  </div>
                  <div className="date-name">
                    {this.getMonth(new Date(event.start).getMonth() + 1, "abrv")}{" "}
                  </div>
                </div>
                <div className="description">
                  <div className="event-title">{event.title}</div>
                  <div className="time">
                    {new Date(event.start).toLocaleTimeString("en-US")} -{" "}
                    {new Date(event.end).toLocaleTimeString("en-US")}
                  </div>
                  {event.description}
                </div>
              </div>
          );
        });
      }
    } else {
      eventList = (
        <div className="emptyEventList">
          <h5>No Events Scheduled</h5>
        </div>
      );
    }
    return <div className="event">{eventList}</div>;
  }
}

export default ApproveEventsList;
