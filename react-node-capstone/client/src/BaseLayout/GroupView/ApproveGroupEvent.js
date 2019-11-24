import React, { Fragment } from "react";
import { MenuItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import EventListPending from "./EventListPending";

class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      events: [],
      creator_id: this.props.creator_id,
      open: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.getGroupEvents = this.getGroupEvents.bind(this);
  }

  componentDidMount() {
    this.getGroupEvents();
  }

  getGroupEvents() {
    var groupEventsURL = "/groups/pendingGroupEvents/" + this.props.groupID;
    fetch(groupEventsURL)
      .then(res => res.json())
      .then(group_events => this.setState({ events: group_events }))
      .catch(err => {
        console.log(err);
      });
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleSubmit = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const { open } = this.state;
    return (
      <Fragment>
        <MenuItem
          type="submit"
          size="large"
          className="msgBtn2"
          onClick={this.handleToggle}
        >
          <i className="material-icons">done_all</i>Approve Events
        </MenuItem>
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Approve Group Events</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose which events to approve and deny.
            </DialogContentText>
            <hr />
            <EventListPending
              events={this.state.events}
              action={this.getGroupEvents}
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

export default CreateGroup;
