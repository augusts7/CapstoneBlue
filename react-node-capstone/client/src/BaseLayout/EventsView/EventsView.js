import React from "react";
import EventList from "../../components/EventList/EventList";
import "./EventsView.css";
import ls from "local-storage";

class EventsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_type: ls.get("user_type")
        };
    }

    render() {
        if (this.state.user_type === "student") {
            return (
                <div>
                    <h4>My Events</h4>
                    <h4 className="buttons">View All Events</h4>
                    <h4 className="buttons">Request Event</h4>
                    <hr/>
                    <div><EventList/><EventList/></div>
                </div>
            );
        } else {
            return (
                <div>
                    <h4>My Events</h4>
                    <h4 className="buttons">View All Events</h4>
                    <h4 className="buttons">Approve Events</h4>
                    <h4 className="buttons">Create Event</h4>
                    <hr/>
                    <div><EventList/><EventList/></div>
                </div>
            );
        }
    }
}

export default EventsView;