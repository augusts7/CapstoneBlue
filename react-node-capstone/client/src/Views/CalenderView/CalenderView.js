import React from "react";
import Calendar from "../../components/Calendar/Calendar";
import "./main.css";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button"
import MaterialButton from "@material-ui/core/Button"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ls from "local-storage"

class CalenderView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "created": [],
            "attending": [],
            "userType": ls.get("user_type")
        };
    }

    componentDidMount() {
        fetch("/events/created", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "credentials": "include",
            }
        }).then(res => {
            return res.json();
        })
            .then((res) => {

                if (res.success) {

                    let data = [];

                    res.results.forEach(d => {
                        console.log(d);
                        data.push({
                            "key": d.eventID,
                            "start": d.start,
                            "end": d.end,
                            "title": d.title,
                            "description": d.description,
                            "color": "white",
                            "backgroundColor": "#880E4F"
                        });
                    });
                    this.setState({ "created": data });
                }
            });

        fetch("/events/attending", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "credentials": "include",
            }
        }).then(res => {
            return res.json();
            })
            .then((res) => {

                if (res.success) {

                    let calData = [];
                    let data = [];

                    res.results.forEach(d => {
                        console.log(d);
                        data.push({
                            "key": d.eventID,
                            "start": d.start,
                            "end": d.end,
                            "title": d.title,
                            "description": d.description,
                            "color": "white",
                            "backgroundColor": "#E65100"
                        });
                    });
                    this.setState({ "attending": data });

                }

            });

    }

    singleEventHtml(data) {

        var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { minute: '2-digit', hour: "2-digit" }

        const start = new Date(data.start);
        const end = new Date(data.end);

        const date = start.toLocaleDateString("en-US", dateOptions);
        const startTime = start.toLocaleTimeString("en-US", timeOptions);
        const endTime = end.toLocaleTimeString("en-US", timeOptions);

        const dateString = date + " from " + startTime + " to " + endTime;

        let buttons = [];

        buttons.push(<div style={{ "display": "inline-block" }}><MaterialButton key="1" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={this.props.onAddToCalendar}>Delete</MaterialButton></div>);

        if (data.created) {
            buttons.push(<div style={{ "display": "inline-block", "marginLeft": "4px" }}><MaterialButton key="2" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={this.props.onAddToCalendar}>Modify</MaterialButton></div>);
        }

        return (<div className="slotRoot" key={data.key}>

            <div className="mdl-grid">
                <div className="mdl-cell--2-col">
                    <i className="material-icons mdl-color-text--blue-900">today</i>
                </div>
                <div className="mdl-cell--10-col">
                    <div className="mdl-color-text--blue-900">
                        {date}
                    </div>
                    <div style={{ "fontWeight": "600" }}>
                        {data.title}
                    </div>

                    <div className="cols-2">
                        <div>
                            {startTime}
                        </div>
                        <div>
                            {endTime}
                        </div>
                    </div>
                    <div>
                        {data.description}
                    </div>
                    <div style={{"paddingTop": "8px"}}>
                        {buttons}
                    </div>
                </div>
            </div>

        </div>);

    }

    singleActionHtml(data) {

        return (<div className="slotRoot">

            <div className="mdl-grid">
                <div className="mdl-cell--2-col">
                    <i className="material-icons">today</i>
                </div>
                <div className="mdl-cell--10-col">
                    <div>
                        {data.title}
                    </div>
                    <div>
                        {data.description}

                    </div>
                    <div>
                        <Button style={{ "padding": "2px" }} onClick={this.props.onAddToCalendar}>{data.button}</Button>
                    </div>
                </div>
            </div>

        </div>);

    }



    render() {

        let largeCardStyle = { "overflowY": "scroll", "height": window.innerHeight * 0.8 };
        let smallCardStyle = { "overflowY": "scroll", "height": window.innerHeight * 0.35 };

        let events = this.state.attending.concat(this.state.created);

        let showEvents = [];

        this.state.attending.forEach(data => {
            data.created = false;
            showEvents.push(data);
        });

        this.state.created.forEach(data => {
            data.created = true;
            showEvents.push(data);
        });

        let listItemStyle = { "background": "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)" };

        let links = [];

        if (this.state.userType === "faculty") {
            links.push({ "name": "Create Advising Slots", "link": "/advisingSlots/add" });

        } else {
            links.push({ "name": "Sign up for Advising", "link": "/advisingSlots/view" });

        }
        links.push({ "name": "Add Appointment", "link": "/appointment/add" });
        links.push({ "name": "Modify Appointment", "link": "/appointment/modify" });
        links.push({ "name": "Share Calendar", "link": "/calendar/share" });
        links.push({ "name": "Export Calendar", "link": "/calendar/export" });

        return (
            <div className="calendarViewRoot">

                <div className="calendarViewContainer">

                    <div>

                        <div className="calendarView_side_wrapper">

                            <div className="calendarView_side_card">
                                <div>
                                    <h4>All Events</h4>
                                </div>
                                <div style={largeCardStyle} className="styleScroll">
                                    {showEvents.map(data => {
                                        return this.singleEventHtml(data);
                                    })}

                                </div>
                            </div>
                        </div>

                    </div>

                    <div>
                        <Calendar events={this.state.attending} />
                    </div>

                    <div>
                        <div className="calendarView_side_card">
                            <div>
                                <h4>Calendar Options</h4>
                            </div>

                            <div style={smallCardStyle} className="styleScroll">


                            </div>
                        </div>

                        <div className="calendarView_side_card">
                            <div>
                                <h4>Actions</h4>
                            </div>


                            <List component="nav">
                                {links.map(link => {
                                    return(
                                    <ListItem style={listItemStyle} button>
                                        <Link to={link.link}><ListItemText primary={link.name} /></Link>
                                    </ListItem>);
                                })}
                            </List>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default CalenderView;
