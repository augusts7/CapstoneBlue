import React from "react";
import "./ApproveEvent.css";
import EventsList from "./EventsList";

class ApproveEvent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }

    componentDidMount() {
        fetch("/single-event-layout/approveEvent")
            .then(res => res.json())
            .then(eventData =>
                this.setState({events: eventData}));

    }
    render(){
        return(
            <div>
                <div className="approveTitle">
                    <h4>Approve Events</h4>
                </div>
                <hr/>
                <EventsList events={this.state.events}/>
            </div>
        );
    }
}

export default ApproveEvent;