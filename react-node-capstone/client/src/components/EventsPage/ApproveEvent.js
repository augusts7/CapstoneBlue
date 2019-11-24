import React from "react";
import "./ApproveEvent.css";
import ApproveEventsList from "./ApproveEventsList";

class ApproveEvent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }

    componentDidMount() {
        fetch("/events/approveEvent")
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
                <ApproveEventsList events={this.state.events}/>
            </div>
        );
    }
}

export default ApproveEvent;