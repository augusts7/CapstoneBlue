
import React from 'react';
import 'date-fns';
import MaterialButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from "../generic-components/progress";
import {get} from "../../../ApiHelper/ApiHelper";
import Select from "../../../components/Select/Select";
import AppointmentItem from "../events/AppointmentItem";

const dialogStyle = { padding: "0px" };
const dialogTitleStyle = { backgroundColor: "#01579B", color: "white" };

export default class AppointmentsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "isLoading": false,
            "appointments": [],
            "mode": "",
            "calendarOptions": [],
            "calendarId" : -1,
        };
    }

    componentDidMount() {

        this.loadAllAppointments();
        this.loadCalendars();
    }

    componentWillReceiveProps(nextProps, nextContext) {

    }

    handleChange = (name, value) => {
        if (name === "calendarId") {

            this.setState({[name]: [value]});
        }

    };


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

    loadAllAppointments = () => {
        this.setState({ "isLoading": true });

        get("appointments/created/main", (res) => {
            if (res.success) {

                let items = [];

                if (res.results) {
                    res.results.forEach((item) => {
                        items.push(item);
                    });
                }

                this.setState({ "isLoading": false, "appointments": items });

            } else {
                this.setState({ "isLoading": false, message: res.message });
            }
        });
    };

    appointmentsLayout = () => {

        let items = [];

        if (this.state.appointments.length > 0) {
            this.state.appointments.forEach((slot) => {
                items.push(<AppointmentItem handleAction={this.props.handleAction} event={slot}/>);
            });
        }

        return (
            <div>
                {items}
            </div>
        );
    };



    render() {

        let events = this.appointmentsLayout();

        return (
            <div>
                <Dialog fullWidth={true} style={dialogStyle} open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={dialogTitleStyle}>

                        <h4>{this.props.title || "Events"}</h4>
                    </DialogTitle>

                    <Progress show={this.state.progress} />

                    <DialogContent>

                        <Select
                            label="Calendar"
                            helperText="Select Appointment Calendar"
                            name="calendarId"
                            value={this.state.calendarId}
                            options={this.state.calendarOptions}
                            onChange={(value) => this.handleChange("calendarId", value)} />

                        <div>
                            {events}
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

