import React from 'react';
import MessageBox from "../../../../components/Form/MessageBox/MessageBox"
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import MaterialButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from "../../generic-components/progress"
import { get, post } from "../../../../ApiHelper/ApiHelper"
import { getSlots } from "../utils/slotsHelper";
import Select from "../../../../components/Select/Select";
import AdvisingItem from "../../events/AdvisingItem";

const dialogStyle = {padding: "0px"};


export default class AdvisingSignUpForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "isLoading": false,
            "slots": [],
            "selectedSlotId": -1,
            "calendarId": -1,
            "calendarOptions": []
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    componentDidMount() {

        this.loadCalendars();
        this.loadAllSlots();
    }

    loadCalendars = () => {
        this.setState({ "isLoading": true });

        get("calendar/", (res) => {
            if (res.success) {

                let calendarOptions = [];

                if (res.results) {
                    res.results.forEach((item) => {
                        calendarOptions.push({"name":item.calendarName , "value": item.calendarId});
                    });
                }

                this.setState({ "isLoading": false, "calendarOptions": calendarOptions });

            } else {
                this.setState({ "isLoading": false, message: res.message });
            }
        });
    };

    loadAllSlots = () => {
        this.setState({ "isLoading": true });

        get("advising/all/main", (res) => {
            if (res.success) {

                let slots = [];

                if (res.results) {
                    res.results.forEach((item) => {
                        slots.push(item);
                    });
                }

                this.setState({ "isLoading": false, "slots": slots });

            } else {
                this.setState({ "isLoading": false, message: res.message });
            }
        });
    };

    hideMessage() {
        this.setState({message: ""});
    }

    handleChange(name, value) {
        this.setState({[name] : value});
    }

    handleSave() {

        if (this.state.selectedSlotId === -1) {
            this.setState({"message": "Please select a slot."});
            return;
        }
        if (this.state.calendarId === -1) {
            this.setState({"message": "Please select a calendar id."});
            return;
        }

        let data = {"calendarId": this.state.calendarId, "selectedSlotId": this.state.selectedSlotId};
        post("/advising/main", data, (res => {
            this.setState({isLoading: false, "message": res.message});
            if (res.success) {

            }
            this.props.onClose();
        }))        
    }

    slotsLayout = () => {

        let slots = [];

        if (this.state.slots) {
            this.state.slots.forEach((slot) => {
                slots.push(<AdvisingItem event={slot}/>);
            });
        }

        return (
            <div>
                {slots}
            </div>
        );
    };

    render() {

        let allSlots = this.slotsLayout();

        return (
            <div>
                <Dialog fullWidth={true} style={dialogStyle} open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{
                        backgroundColor: "#01579B", color: "white" }}>

                        <h4>{this.props.title || "Select Advising Slot"}</h4>
                    </DialogTitle>

                    <Progress show={this.state.progress} />

                    <DialogContent>

                            <div>
                                <Select
                                    label="Calendar"
                                    helperText="Select the Calendar to associate these slots with"
                                    value={this.state.calendarId}
                                    options={this.state.calendarOptions}
                                    onChange={(value) => this.handleChange("calendarId", value)} />

                                <MessageBox message={this.state.message} hideMessage={this.hideMessage} />

                                {allSlots}

                            </div>

                    </DialogContent>
                    <DialogActions>
                        <MaterialButton onClick={this.props.onClose} color="primary">
                            Cancel
                    </MaterialButton>
                    </DialogActions>
                </Dialog>
            </div>
            
        );
    }
}
