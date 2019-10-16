import React from 'react';
import MessageBox from "../../../../components/Form/MessageBox/MessageBox"
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';
import TextField from "@material-ui/core/TextField"
import MaterialButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from "../parts/progress"
import { get, post } from "../../../../ApiHelper/ApiHelper"
import { getSlots } from "./slotsHelper";
import Select from "../../../../components/Select/Select"



export default class AdvisingSlotForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            start: new Date(),
            end: new Date(),
            message: "",
            title: "",
            description: "",
            "isLoading": false,
            "interval": 15,
            "slots": [],
            "count": 0,
            "calendarId": "",
            "calendarOptions": []
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
        this.showSlots = this.showSlots.bind(this);
    }

    showSlots() {

        var data = { "title": this.state.title, "description": this.state.description, "start": this.state.start, "end": this.state.end, "interval": this.state.interval };

        var result = getSlots(data);

        if (result.count === 0) {
            this.setState({ "message": "No slot could be created for the specified time.", "count": result.count });
        } else {
            this.setState({ "slots": result.slots, "count": result.count });
        }

    }

    componentDidMount() {

        this.setState({ "isLoading": true });

        get("calendar/all", (res) => {
            if (res.success) {

                let calendarOptions = [];

                if (res.data) {
                    res.data(d => {
                        calendarOptions.push({ "name": d.name, "value": d.id });
                    });
                }

                this.setState({ "isLoading": false, "calendarOptions": calendarOptions });

            } else {
                this.setState({ "isLoading": false, message: res.message });
            }
        });
    }

    hideMessage() {
        this.setState({message: ""});
    }

    handleChange(name, value) {
        this.setState({[name] : value});
    }

    handleSave() {

        let requiredKeys = ["title", "description", "start", "end", "interval"];
        let data = {};

        for (var i = 0; i < requiredKeys.length; i++) {

            let key = requiredKeys[i];

            if (!this.state[key] || ("" + this.state[key]).length === 0) {
                this.setState({ progress: false, "message": "Please enter all fields. Don't forget to add " + key });
                return false;
            } else {
                data[key] = this.state[key];
            }
        }
        data["carousel"] = 1;

        this.setState({ "progress": true });

        post("/advising/tobeimplemented", data, (res => {
            this.setState({
                "progress": false,
                "message": res.message
            });
            if (res.success) {

            }
        }))        
    }

    
    singleEventHtml(data) {

        var dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
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

        let title = "Slot # " + (data.index + 1);

        return (<div key={data.key}>



            <div style={{ "display": "grid", "grid-template-columns": "6% 20% 30% 22% 22%" }}>
                <div>
                    <i className="material-icons mdl-color-text--blue-900">today</i>
                </div>
                <div style={{ overflowY: "hidden" }}>
                    {title}
                </div>
                <div className="mdl-color-text--grey-700">
                    {date}
                </div>
                <div style={{ "fontWeight": "600" }}>
                    {startTime}
                </div>
                <div style={{ "fontWeight": "600" }}>
                    {endTime}
                </div>
            </div>

        </div>);

    }

    render() {

        return (
            <div>
                <Dialog style={{ padding: "0px" }} open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{
                        backgroundColor: "#01579B", color: "white" }}>

                        <h4>{this.props.title || "Add Advising Slot"}</h4>
                    </DialogTitle>

                    <Progress show={this.state.progress} />

                    <DialogContent>

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

                                    <TextField
                                        fullWidth
                                        type="text"
                                        onChange={(event) => this.handleChange("description", event.target.value)}
                                        value={this.state.description}
                                        label="Enter description for each slot"
                                        margin="normal" />

                                    <Select
                                        label="Calendar"
                                        helperText="Select the Calendar to associate these slots with"
                                        value={this.state.calendarId}
                                        options={this.state.calendarOptions}
                                        onChange={(value) => this.handleChange("calendarId", value)} />


                                </Grid>

                                <div style={{ "width": "100%" }}>
                                    {this.state.slots.map(data => {
                                        return this.singleEventHtml(data);
                                    })}
                                    <div>
                                        {this.state.count + " Slots created"}
                                    </div>

                                </div>

                            </MuiPickersUtilsProvider>
                            </div>

                    </DialogContent>
                    <DialogActions>
                        <MaterialButton onClick={this.props.onCancel} color="primary">
                            Cancel
                    </MaterialButton>
                    <MaterialButton onClick={this.showSlots} color="primary">
                        View Slots
                    </MaterialButton>
                        <MaterialButton onClick={this.handleSave} color="primary">
                            Create Slots
                    </MaterialButton>
                    </DialogActions>
                </Dialog>
            </div>
            
        );
    }
}
