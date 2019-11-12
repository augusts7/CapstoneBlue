import React from 'react';
import MessageBox from "../../../../../components/Form/MessageBox/MessageBox"
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';
import TextField from "@material-ui/core/TextField"
import {post} from "../../../../../ApiHelper/ApiHelper"
import {getSlots} from "../../../utils/advising-slots/AdvisingSlotsHelper";
import CalendarFormBaseLayout from "../dialog-layout/BaseLayout";
import AdvisingSlotShowAdvisingItem from "./AdvisingSlotShowAdvisingItem";


export default class AdvisingSlotForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "start": new Date(),
            "end": new Date(),
            "message": "",
            "title": "",
            "description": "",
            "isLoading": false,
            "interval": 15,
            "slots": [],
            "count": 0,
        };

        this.handleChange = this.handleChange.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    showSlots = () => {

        if (!this.state.start || !this.state.end || !this.state.interval) {
            this.setState({"message": "Please enter start time, end time, and interval to view the slots."});
            return false;
        }

        let data = {
            "title": this.state.title || "Title",
            "description": this.state.description || "Description",
            "start": this.state.start,
            "end": this.state.end,
            "interval": this.state.interval
        };

        let result = getSlots(data);

        if (result.count === 0) {
            this.setState({"message": "No slot could be created for the specified time.", "count": result.count});
        } else {
            this.setState({"slots": result.slots, "count": result.count});
        }

    };

    componentDidMount() {


    }

    hideMessage() {
        this.setState({message: ""});
    }

    handleChange(name, value) {
        this.setState({[name]: value});
    }

    handleSave = () => {

        let requiredKeys = ["title", "description", "start", "end", "interval"];
        let data = {};

        for (var i = 0; i < requiredKeys.length; i++) {

            let key = requiredKeys[i];

            if (!this.state[key] || ("" + this.state[key]).length === 0) {
                this.setState({progress: false, "message": "Please enter all fields. Don't forget to add " + key});
                return false;
            } else {
                data[key] = this.state[key];
            }
        }
        data["carousel"] = 1;

        this.setState({"progress": true});

        post("/advising", data, (res => {
            this.setState({
                "progress": false,
                "message": res.message
            });
            if (res.success) {

            }
            this.props.onClose();
        }))
    };


    dialogButtons = [
        {name: "Cancel", onClick: this.props.onClose},
        {name: "Show Slots", onClick: this.showSlots},
        {name: "Create Slots", onClick: this.handleSave}
    ];

    render() {

        return (
            <CalendarFormBaseLayout open={this.props.open} buttons={this.dialogButtons} onClose={this.props.onClose} progress={this.state.isLoading} title="Add Advising Slot">
                <div>
                    <MessageBox message={this.state.message} hideMessage={this.hideMessage}/>
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
                                margin="normal"/>

                            <TextField
                                fullWidth
                                type="text"
                                onChange={(event) => this.handleChange("title", event.target.value)}
                                value={this.state.title}
                                label="Enter Title of each slot"
                                margin="normal"/>

                            <TextField
                                fullWidth
                                type="text"
                                onChange={(event) => this.handleChange("description", event.target.value)}
                                value={this.state.description}
                                label="Enter description for each slot"
                                margin="normal"/>

                        </Grid>

                        <div style={{"width": "100%"}}>
                            {this.state.slots.map(data => {
                                return (<AdvisingSlotShowAdvisingItem data={data}/>);
                            })}
                            <div>
                                {this.state.count + " Slots created"}
                            </div>

                        </div>

                    </MuiPickersUtilsProvider>
                </div>
            </CalendarFormBaseLayout>
        );
    }
}
