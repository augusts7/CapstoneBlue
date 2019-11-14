import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
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
      groupID: this.props.groupID
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
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Group Options</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this group?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleToggle} color="primary">
            No
          </Button>
          <Button onClick={this.handleToggle} color="primary">
            Yes 
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
    );
  }
}
