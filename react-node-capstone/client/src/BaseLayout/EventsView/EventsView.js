import React from "react";
import EventList from "../../components/EventList/EventList";
import "./EventsView.css";
import ls from "local-storage";
import Button from "@material-ui/core/Button";
import CreateEvent from "../../components/EventsPage/CreateEvent";
import RequestEvent from "../../components/EventsPage/RequestEvent";

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
                <div className="flex-full">
                    <div className="inner">
                        <RequestEvent
                            user={this.state.creator_id}
                        />
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
                        <EventList />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex-full">
                    <div className="inner">
                        <CreateEvent
                            user={this.state.creator_id}
                        />
                    </div>
                    <div className="inner">
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            className="msgBtn"
                            href="/approveEvent"
                        >
                            <i className="material-icons">check_circle_outline</i>Approve
                            Events
                        </Button>
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
                    <div></div>
                </div>
            );
        }
    }
}

export default EventsView;