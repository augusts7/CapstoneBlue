import React from "react";
import Carosel from "../../components/Carousel/HomeCarousel";
import CalendarView from "../../Views/CalenderView/HomeCalenderView";
import ApproveEventsList from "../../components/EventsPage/ApproveEventsList";
import "./Main.css";
import {isNullOrUndefined} from "util";

const carouselStyle = {height: 0.9 * window.innerHeight, width: "100%"};
const eventListStyle = {height: 0.77 * window.innerHeight};

class Main extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            user: 0,
            events: [{
                eventID: 1,
                start: new Date(),
                end: new Date(),
                title: "Title",
                description: "esf"
            }]
        };
    }

    getUser() {
        var getUserURL = "/user_info/user";
        fetch(getUserURL)
            .then(res => res.json())
            .then(userInfo => {
                if (userInfo === isNullOrUndefined || userInfo.length <= 0) {
                } else {
                    try {
                        this.setState({user: userInfo[0].user_id});
                    } catch (e) {
                    }
                }
            });
    }

    getEvents() {
        fetch("/events/allattending")
            .then(res => res.json())
            .then(eventData => this.setState({events: eventData}));
    }

    componentDidMount() {
        this.getUser();
        this.getEvents();
    }


    render() {
        return (
            <div class="main">
                <div class="main-carousel" style={carouselStyle}>
                    <Carosel/>
                </div>
                <div class="main-calendar">
                    <CalendarView/>
                </div>
                <div class="main-events">
                    <div className="events">
                        <h3>My Events</h3>
                        <ApproveEventsList
                            style={eventListStyle}
                            events={this.state.events}
                            action={() => this.getEvents()}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
