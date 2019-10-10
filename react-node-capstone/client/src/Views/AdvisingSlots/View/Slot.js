import React from "react";
import "./slot.css";


class Slot extends React.Component {
    constructor(props) {
        super(props);

        this.onAddToCalendar = this.onAddToCalendar.bind(this);
    }

    onAddToCalendar(id) {

        let data = { "eventID": id };

        fetch("/advising/attend", {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => { return res.json(); })
            .then((res) => {
                this.setState({
                    "isLoading": false,
                    "message": res.message
                });
            });
    }

    render() {

        let data = this.props.data;

        if (this.props.data == null) {
            data = {
                "title": "Title",
                "start": "Start Time",
                "end": "End Time",
                "description": "Description",
            };
        } else {
            data = {
                "title": data.title || "Event",
                "start": data.start,
                "end": data.end,
                "type": data.event_type,
                "description": data.description || "Timeslot",
            };
        }
        var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = {minute : '2-digit', hour : "2-digit"}

        const start = new Date(data.start);
        const end = new Date(data.end);

        const date = start.toLocaleDateString("en-US", dateOptions);
        const startTime = start.toLocaleTimeString("en-US", timeOptions);
        const endTime = end.toLocaleTimeString("en-US", timeOptions);

        const dateString = date + " from " + startTime + " to " + endTime;

        let className = "slotRoot";
        if (this.props.className) {
            className += " " + this.props.className;
        }

        let buttons = [];
        if (this.props.userType === "student") {
            buttons.push(
                <button onClick={() => this.onAddToCalendar(this.props.data.eventID)} className="mdl-button mdl-js-button mdl-button--colored"><i className="material-icons slotButtonIcon">done</i>Add to Calendar</button>

            );
        } else if (this.props.userType === "faculty") {
            buttons.push(
                <button onClick={this.props.onAddToCalendar} className="mdl-button mdl-js-button mdl-button--colored"><i className="material-icons slotButtonIcon">delete</i>Delete</button>

            );
        }

        return (
            <div className={className}>

                <div className="mdl-grid">
                    <div className="mdl-cell--1-col">
                        <i className="material-icons">today</i>
                    </div>
                    <div className="mdl-cell--11-col">
                        <div className="mdl-grid">
                            <div className="mdl-cell--6-col">
                                {data.title}
                            </div>
                            <div className="mdl-cell--6-col">
                                {date}
                            </div>
                        </div>
                        <div className="mdl-grid">
                            <div className="mdl-cell--6-col">
                                {startTime}                               
                            </div>
                            <div className="mdl-cell--6-col">
                                {endTime}
                            </div>
                        </div>
                        <div className="mdl-grid">
                            <div className="mdl-cell--12-col">
                                {data.description}
                            </div>
                        </div>
                        <div className="slotButtons">
                            {buttons}
                        </div>
                    </div>
                </div>

            </div>
        );

    }
}

export default Slot;
