import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      groupID: this.props.groupID,
      title: "",
      description: "",
      start: new Date(),
      end: new Date()
    };

    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleStartTimeChange(datetime) {
    this.setState({ start: datetime });
  }

  handleEndTimeChange(datetime) {
    this.setState({ end: datetime });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { open } = this.state;

    return (
      <Fragment>
        <Button
          type="submit"
          variant="contained"
          size="large"
          className="msgBtn2"
          onClick={this.handleToggle}
          mini
        >
          <i className="material-icons">schedule</i>Request Event
        </Button>
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Request Group Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To request a event for this group please fill out the following
              form.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              onChange={this.handleChange}
              value={this.state.title}
              fullWidth
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              onChange={this.handleChange}
              value={this.state.description}
              fullWidth
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="datePicker">
                <DateTimePicker
                  autoOk
                  disablePast
                  inputVariant="outlined"
                  label="Start Time"
                  value={this.state.start}
                  onChange={this.handleStartTimeChange}
                ></DateTimePicker>
              </div>
              <div className="datePicker">
                <DateTimePicker
                  autoOk
                  disablePast
                  inputVariant="outlined"
                  label="End Time"
                  value={this.state.end}
                  onChange={this.handleEndTimeChange}
                ></DateTimePicker>
              </div>
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleToggle} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleToggle} color="primary">
              Request Event
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
