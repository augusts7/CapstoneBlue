import React, {Component} from "react";
import {Button} from '@material-ui/core';

import "./Event.css";

class EventsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event_id: 0,
            attendee_id: 0
        };
        this.addToCalendar = this.addToCalendar.bind(this);
        this.approveEvent = this.approveEvent.bind(this);
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

    addToCalendar(e) {
        // e.preventDefault();
        // fetch("/attending", {
        //     method: "POST",
        //     headers: {
        //         Accept: 'application/json',
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         event_id: this.state.event_id,
        //         attendee_id: this.state.attendee_id
        //     }),
        // })
        //     .then(function(response) {
        //         return response.json();
        //     })
        //     .then(function(body) {
        //         console.log(body);
        //     });
        window.alert("added to calendar");
    }

    approveEvent(e) {
        window.alert("approved");
    }

    deleteEvent(e) {
        window.alert("denied");
    }

    render() {
        if (this.props.events && window.location.pathname === "/viewAllEvents") {
            var events = this.props.events.map(event => {
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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    className="addButton"
                                    onClick={this.addToCalendar}
                                >
                                    <i className="material-icons">check_circle_outline</i> Add Event to Calendar
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            });
        }
        if (this.props.events && window.location.pathname === "/approveEvent") {
            var events = this.props.events.map(event => {
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
                            <div className="approveButtons">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    className="denyButton"
                                    onClick={this.deleteEvent}
                                >
                                    <i className="material-icons">delete</i> Deny
                                </Button>
                            </div>
                            <div className="approveButtons">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    className="approveButton"
                                    onClick={this.approveEvent}
                                >
                                    <i className="material-icons">check_circle_outline</i> Approve
                                </Button></div>
                        </div>
                    </div>
                );
            });
        }
        return <div className="event">{events}</div>;
    }
}

export default EventsList;
