import React from "react";
import "./AddSlots.css"
import Form from "../../../components/Form/Form"
import MessageBox from "../../../components/Form/MessageBox/MessageBox"
import 'date-fns';
import Container from "../../../components/Container/Container"
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Slots from "../View/AdvisingSlots"
import MaterialTable from "material-table"

const columns = [
    { title: 'Slot Number', field: 'index' },
    { title: 'Date', field: 'date', type: "date" },
    {
        title: 'Start Time', field: 'start', type: 'time', 
        headerStyle: {
            backgroundColor: '#039be5',
        } },
    { title: 'End Time', field: 'end', type: 'time' },
    { title: 'Interval', field: 'interval' },
];

class AddSlots extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "message": "",
            "start": new Date().getTime(),
            "end": new Date().getTime(),
            "interval": 15,
            "demoData": []
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
        current.setSeconds(0);

        var index = 1;

        while (this.testAddTime(current, interval) < end) {

            var slot = {};
            slot.date = new Date(current);
            slot.interval = interval;
            slot.index = index;
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

        this.setState({ "demoData": slots });

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
        console.log("Test = " + testTime);
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

    onSubmit(target) {

        this.showSlots();

        return;

        this.setState({ "isLoading": true });

        let data = {
            "campusEmail": target.campusEmail.value,
            "password": target.password.value,
        };
        fetch("/advising", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
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

    render() {

        let body = <MuiPickersUtilsProvider utils={DateFnsUtils}>
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

                <Button color="primary" onClick={this.onSubmit}><i className="material-icons">done</i>Create Slots</Button>
            </Grid>
        </MuiPickersUtilsProvider>;

        let title = "Add Advising slots";
        let icon = "add";

        return (
            <div className="mdl-grid">
                <div className="mdl-cell--4-col">
                    <div className="mdl-color--white mdl-shadow--4dp addSlotsContainer">
                        <div className="addSlotsHeader">
                            <h4>Add Advising Slots</h4>
                        </div>
                        <div>
                            <MessageBox message={this.state.message} hideMessage={this.hideMessage} />
                            {body}
                        </div>
                    </div>
                </div>
                <div className="mdl-cell--8-col">
                    <MaterialTable
                        classes={{ "root": { "width": "100%" }}}
                        title="All time slots"
                        columns={columns}
                        data={this.state.demoData}
                        options={{
                            headerStyle: {
                                backgroundColor: '#01579b',
                                color: '#FFF'
                            }
                        }}

                    />
                </div>
                

            </div>
        );
    }
}

export default AddSlots;










