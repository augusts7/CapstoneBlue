
import React from 'react';
import 'date-fns';
import MaterialButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from "../generic-components/Progress";
import EventListItem from "../events/EventListItem";


const dialogStyle = {padding : "0px"};

export default class EventsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "isLoading": false,
            "events": [],
            "mode": "",
        };
    }

    componentDidMount() {


    }

    componentWillReceiveProps(nextProps, nextContext) {

    }

    eventsLayout = (events) => {

        let slots = [];

        if (events !== null && events.length > 0) {
            events.forEach((slot) => {
                slots.push(<EventListItem event={slot}/>);
            });
        }

        return (
            <div>
                {slots}
            </div>
        );
    };

    getEvents () {

        let items = [];
        if (this.props.data.sortBy === "date") {

            let selectedDate = this.props.data.date;
            let date = new Date(selectedDate);
            let nextDate = new Date(selectedDate);

            nextDate.setDate(date.getDate() + 1);

            nextDate.setMinutes(0);

            this.props.events.forEach((item) => {
                let start = new Date(item.start);
                if (start > date && start < nextDate) {
                    items.push(item);
                }
            });

        } else if (this.props.data.sortBy === "id") {

            let id = this.props.data.id;

            this.props.events.forEach((item) => {

                if (("" + item.id) === id) {
                    items.push(item);
                }
            });

        }


        return items;
    };

    render() {

        let events = this.eventsLayout(this.getEvents());

        return (
            <div>
                <Dialog fullWidth={true} className="dialog" open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle className="dialog-title">

                        <h4>{this.props.title || "Events"}</h4>
                    </DialogTitle>

                    <Progress show={this.state.progress} />

                    <DialogContent style={dialogStyle} className="styleScroll dialog-grey-content">

                        {events}

                    </DialogContent>
                    <DialogActions className="dialog-grey-footer">
                        <MaterialButton onClick={this.props.onCancel} color="primary">
                            Cancel
                        </MaterialButton>
                    </DialogActions>
                </Dialog>
            </div>

        );
    }
}

