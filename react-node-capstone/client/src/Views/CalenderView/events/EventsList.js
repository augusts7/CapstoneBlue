
import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import MaterialButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from "../generic-components/Progress";
import { get, post } from "../../../ApiHelper/ApiHelper";
import Select from "../../../components/Select/Select";
import EventListItem from "./EventListItem";


export default class EventsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "isLoading": false,
            "events": [],
        };
    }

    componentDidMount() {

        this.loadAllEvents();
    }

    loadAllEvents = () => {
        this.setState({ "isLoading": true });

        get("events/all/main", (res) => {
            if (res.success) {

                let events = [];

                if (res.results) {
                    res.results.forEach((item) => {
                        events.push(item);
                    });
                }

                this.setState({ "isLoading": false, "events": events });

            } else {
                this.setState({ "isLoading": false, message: res.message });
            }
        });
    };

    eventsLayout = () => {

        let slots = [];

        if (this.state.events) {
            this.state.events.forEach((slot) => {
                slots.push(<EventListItem event={slot}/>);
            });
        }

        return (
            <div>
                {slots}
            </div>
        );
    };

    render() {

        let allEvents = this.eventsLayout();

        return (
            <div>
                <Dialog style={{ padding: "0px" }} open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{
                        backgroundColor: "#01579B", color: "white" }}>

                        <h4>{this.props.title || "Events"}</h4>
                    </DialogTitle>

                    <Progress show={this.state.progress} />

                    <DialogContent>

                        <Grid container justify="center">

                            {allEvents}


                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <MaterialButton onClick={this.props.onCancel} color="primary">
                            Cancel
                        </MaterialButton>
                    </DialogActions>
                </Dialog>
            </div>

        );
    }
}

