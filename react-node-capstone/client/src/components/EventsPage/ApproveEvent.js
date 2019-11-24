import React, { Fragment } from "react";
import { MenuItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import EventListPending from "../../BaseLayout/GroupView/EventListPending";

class ApproveEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      open: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.getPendingEvents = this.getPendingEvents.bind(this);
  }

  componentDidMount() {
    this.getPendingEvents();
  }

  getPendingEvents() {
    var eventsURL = "/events/approveEvent";
    fetch(eventsURL)
      .then(res => res.json())
      .then(pending_events => this.setState({ events: pending_events }))
      .catch(err => {
        console.log(err);
      });
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const { open } = this.state;
    return (
      <Fragment>
        <Button
          type="submit"
          variant="contained"
          size="large"
          className="msgBtn"
          onClick={this.handleToggle}
        >
          <i className="material-icons">check_circle_outline</i>Approve Events
        </Button>
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Approve Global Events
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose which events to approve and deny.
            </DialogContentText>
            <hr />
            <EventListPending
              events={this.state.events}
              action={this.getPendingEvents}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleToggle} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default ApproveEvent;
