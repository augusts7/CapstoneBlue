import React from "react";
import "./AddSlots.css"
import MessageBox from "../../../components/Form/MessageBox/MessageBox"
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';
import TextField from "@material-ui/core/TextField"
import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button"
import MaterialButton from "@material-ui/core/Button"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import "../../CalenderView/main.css";


class AddSlots extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "message": "",
            "description": "",
            "title": "",
            "start": new Date().getTime(),
            "end": new Date().getTime(),
            "interval": 15,
            "slots": [],
            "count": 0
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showSlots = this.showSlots.bind(this);
    }

    handleChange(name, value) {
        this.setState({ [name]: value });
    }

    showSlots() {

        var slots = [];
        const start = this.state.start;
        const end = new Date(this.state.end);
        const interval = parseInt(this.state.interval);

        var current = new Date(start);

        current.setUTCSeconds(0, 0);

        end.setUTCSeconds(0, 0);

        var index = 0;

        while (this.testAddTime(current, interval) <= end) {

            var slot = {};
            slot.interval = interval;
            slot.index = index;
            slot.title = this.state.title;
            slot.description = this.state.description;
            slot.start = new Date(current);
            slot.end = this.addTime(new Date(current), interval);

            slots.push(slot);
            index++;
            console.log(index);

            current = new Date(slot.end);
            current.setSeconds(0);
        }

        console.log(current);
        console.log(end);

        if (index === 0) {
            this.setState({ "message": "No slot could be created for the specified time.", "count": index });
        } else {
            this.setState({ "slots": slots, "count": index });
        }

        

    }

    addTime(time, interval) {

        var newMins = time.getMinutes() + interval;

        if (newMins >= 60) {
            var newHours = time.getHours() + Math.floor(newMins / 60);
            var mins = newMins - Math.floor(newMins / 60) * 60;
            time.setHours(newHours);
            time.setMinutes(mins);
        } else {
            time.setMinutes(newMins);
        }
        time.setSeconds(0);
        return time;
    }

    testAddTime(testTime, interval) {
        console.log("Test = " + testTime);
        var time = new Date(testTime);

        var newMins = time.getMinutes() + interval;

        if (newMins >= 60) {
            var newHours = time.getHours() + Math.floor(newMins / 60);
            var mins = newMins - Math.floor(newMins / 60) * 60;
            time.setHours(newHours);
            time.setMinutes(mins);
        } else {
            time.setMinutes(newMins);
        }
        time.setSeconds(0);
        console.log("Test = " + time);
        return time;
    }

    hideMessage() {
        this.setState({ "message": "" });
    }

    handleOptionChange = changeEvent => {
        this.setState({
            user_type: changeEvent.target.value
        });
    };

    onSubmit() {

        this.setState({ "isLoading": true });

        let data = {
            "title": this.state.title,
            "description": this.state.description,
            "start": this.state.start,
            "end": this.state.end,
            "interval": this.state.interval,
            "carousel": 1
        };
        if (data.title.length === 0 || data.description.length === 0 || data.start == null || data.start.length === 0 || data.end == null || data.end.length === 0 || data.interval <= 0) {
            this.setState({ "message": "Enter all fields" });
            return;
        }
        fetch("/advising", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'credentials': "include"
            }
        }).then(res => { return res.json(); })
            .then((res) => {
                this.setState({
                    "isLoading": false,
                    "message": res.message
                });
                if (res.success) {

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

        let buttons = [];

        buttons.push(<div style={{}}><MaterialButton key="1" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={this.props.onAddToCalendar}>Delete</MaterialButton></div>);

        if (data.created) {
            buttons.push(<div style={{}}><MaterialButton key="2" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={this.props.onAddToCalendar}>Modify</MaterialButton></div>);
        }

        return (<div className="slotRoot" key={data.key}>

            <div className="mdl-grid">
                <div className="mdl-cell--2-col">
                    <i className="material-icons mdl-color-text--blue-900">today</i>
                </div>
                <div className="mdl-cell--10-col">
                    <div className="mdl-color-text--grey-700">
                        {date}
                    </div>
                    <div>
                        {data.title}
                    </div>

                    <div className="cols-2">
                        <div style={{ "fontWeight": "600" }}>
                            {startTime}
                        </div>
                        <div style={{ "fontWeight": "600" }}>
                            {endTime}
                        </div>
                    </div>
                    <div>
                        {data.description}
                    </div>

                </div>
            </div>

        </div>);

    }

    render() {


        let largeCardStyle = { "overflowY": "scroll", "height": window.innerHeight * 0.8 };
        let smallCardStyle = { "overflowY": "scroll", "height": window.innerHeight * 0.35 };

        let listItemStyle = { "background": "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)" };

        let links = [];

        links.push({ "name": "View all Advising slots", "link": "/advisingSlots/view" });
        links.push({ "name": "View calendar", "link": "/calenderView" });
        links.push({ "name": "Add Appointment", "link": "/appointment/add" });
        links.push({ "name": "Modify Appointment", "link": "/appointment/modify" });
        links.push({ "name": "Share Calendar", "link": "/calendar/share" });

        return (
            <div className="calendarViewRoot">

                <div className="calendarViewContainer">

                    <div>

                        <div className="calendarView_side_wrapper">

                            <div className="calendarView_side_card">
                                <div>
                                    <h4>Created Advising Slots</h4>
                                    <h4>{this.state.count} Slots created</h4>
                                </div>
                                <div style={largeCardStyle} className="styleScroll">
                                    {this.state.slots.map(data => {
                                        return this.singleEventHtml(data);
                                    })}

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mdl-grid">
                        <div className="mdl-color--white mdl-shadow--4dp addSlotsContainer">
                            <div className="addSlotsHeader">
                                <h4>Add Advising Slots</h4>
                            </div>
                            <div>
                                <MessageBox message={this.state.message} hideMessage={this.hideMessage} />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="center">

                                        <DateTimePicker
                                            fullWidth
                                            autoOk
                                            disablePast
                                            inputVariant="outlined"
                                            margin="normal"
                                            label="Start Time"
                                            value={this.state.start}
                                            onChange={(value) => this.handleChange("start", value)}
                                        />
                                        <DateTimePicker
                                            fullWidth
                                            autoOk
                                            disablePast
                                            inputVariant="outlined"
                                            margin="normal"
                                            label="End Time"
                                            value={this.state.end}
                                            onChange={(value) => this.handleChange("end", value)}
                                        />

                                        <TextField
                                            fullWidth
                                            type="number"
                                            onChange={(event) => this.handleChange("interval", event.target.value)}
                                            value={this.state.interval}
                                            label="Enter each slot's interval"
                                            margin="normal" />

                                        <TextField
                                            fullWidth
                                            type="text"
                                            onChange={(event) => this.handleChange("title", event.target.value)}
                                            value={this.state.title}
                                            label="Enter Title of each slot"
                                            margin="normal" />

                                        <TextField
                                            fullWidth
                                            type="text"
                                            onChange={(event) => this.handleChange("description", event.target.value)}
                                            value={this.state.description}
                                            label="Enter description for each slot"
                                            margin="normal" />


                                    </Grid>

                                    <div style={{ "marginTop": "16px" }}><MaterialButton color="primary" onClick={this.showSlots}><i className="material-icons">list</i>View Created Slots</MaterialButton></div>
                                    <div style={{"marginTop": "16px"}}><Button color="primary" onClick={this.onSubmit}><i className="material-icons">done</i>Submit Slots</Button></div>
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>

                    </div>

                    <div>
                        <div className="calendarView_side_card">
                            <div>
                                <h4>Advising Slots Options</h4>
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
                                    return (
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

export default AddSlots;










