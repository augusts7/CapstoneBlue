import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      groupID: this.props.groupID,
      new_member: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

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
        >
          <i className="material-icons">group_add</i>Add Members
        </Button>
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Group Members</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add user type in there name or email address. To add a group
              type in the group name.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="new_member"
              label="Type in new members here."
              type="text"
              onChange={this.handleChange}
              value={this.state.new_member}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleToggle} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleToggle} color="primary">
              Add Member(s)
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
