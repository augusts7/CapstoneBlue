import React from 'react';
import 'date-fns';
import MaterialButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from "../../../GenericViews/Progress/Progress";
import EventListItem from "./single-event-layout/EventListItem";
import Slide from "@material-ui/core/Slide";
import DateTimeFormatter from "../../utils/date-time-utils/DateTimeFormatter";
import DeleteDialog from "../calendar-dialogs/delete-dialog/DeleteDialog";
import CalendarEventsListContext from "./calendar-popup-context/CalendarEventsListContext";
import EmptyListView from "../../../GenericViews/empty-view/EmptyListView";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";

const dialogStyle = {padding: "0px 4px"};
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class EventsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            events: [],
            mode: "",
            "openDeleteDialog": false
        };
        this.title = DateTimeFormatter.formatDate(new Date());
    }

    componentDidMount() {


    }

    componentWillReceiveProps(nextProps, nextContext) {

    }

    eventsLayout = (events) => {

        if (LengthValidator.isEmpty(events)) {
            return (
                <EmptyListView message="No events available to display!" />
            );
        }

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

    getEvents() {

        let items = [];

        if (this.props.data.sortBy === "date") {

            let selectedDate = this.props.data.date;
            let date = new Date(selectedDate);
            let nextDate = new Date(selectedDate);

            this.title = DateTimeFormatter.formatDate(date);

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

    deleteDialog = {
        title: "Delete",
        text: "Are you sure you want to delete this item?",
        onDelete: () => {
        },
        onClose: () => {
            this.setState({openDeleteDialog: false});
        }
    };

    calendarEventsListContext = {
        showDeleteDialog: (title, text, onDeleteClick) => {
            this.deleteDialog.title = title;
            this.deleteDialog.text = text;
            this.deleteDialog.onDelete = onDeleteClick;
            this.setState({openDeleteDialog: true});
        },
        hideDeleteDialog: () => {
            this.setState({openDeleteDialog: false});
        }
    };

    render() {

        let events = this.eventsLayout(this.getEvents());

        return (
            <CalendarEventsListContext.Provider value={this.calendarEventsListContext}>

                <Dialog TransitionComponent={Transition} fullWidth={true} className="dialog" open={this.props.open}
                        onClose={this.props.onClose}
                        aria-labelledby="form-dialog-title">

                    <DialogTitle className="dialog-title">
                        {this.title}
                    </DialogTitle>

                    <Progress show={this.state.progress}/>

                    <DialogContent style={dialogStyle} className="styleScroll dialog-grey-content">

                        <DeleteDialog onClose={this.deleteDialog.onClose} open={this.state.openDeleteDialog} title={this.deleteDialog.title}
                                      onDelete={this.deleteDialog.onDelete}>
                            {this.deleteDialog.text}
                        </DeleteDialog>

                        {events}

                    </DialogContent>
                    <DialogActions className="dialog-grey-footer">
                        <MaterialButton onClick={this.props.onCancel} color="primary">
                            Cancel
                        </MaterialButton>
                    </DialogActions>
                </Dialog>
            </CalendarEventsListContext.Provider>
        );
    }
}

