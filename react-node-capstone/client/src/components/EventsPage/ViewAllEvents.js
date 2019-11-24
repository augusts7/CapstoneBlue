import React from "react";
import ApproveEventsList from "./ApproveEventsList";
import "./ViewAll.css";

class ViewAllEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }

    componentDidMount() {
        fetch("/events/notattendingGlobal")
            .then(res => res.json())
            .then(eventData =>
                this.setState({events: eventData}));

    }

    render() {
        return (
            <div className="viewAll">
                <div className="allEventsTitle">
                    <h4>All Events</h4>
                </div>
                <hr/>
                <ApproveEventsList events={this.state.events}/>
            </div>
        );
    }
}

export default ViewAllEvents;