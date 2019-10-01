import React from "react";
import "./slot.css";


class Slot extends React.Component {
    constructor(props) {
        super(props);


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

        return (
            <div className="slotRoot">

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
                            <button onClick={this.props.onAddToCalendar} className="mdl-button mdl-js-button mdl-button--colored"><i className="material-icons slotButtonIcon">done</i>Add to Calendar</button>
                        </div>
                    </div>
                </div>

            </div>
        );

    }
}

export default Slot;
