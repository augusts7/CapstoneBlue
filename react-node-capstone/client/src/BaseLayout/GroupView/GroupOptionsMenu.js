import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CreateGroup from "./CreateGroup";
import EditGroup from "./EditGroup";
import ApproveGroupEvent from "./ApproveGroupEvent";
// import Modal from '@material-ui/core/Modal';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
    this.setState({ open: !this.state.open });
  }

  handleCreate() {
    this.setState({ anchorEl: null });
  }

  handleClose() {
    this.setState({ anchorEl: null });
    this.setState({ open: false });
  }

  handleDelete() {
    this.setState({ anchorEl: null });
    fetch("/groups/delete/" + this.props.groupID, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        group_id: this.props.groupID
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        console.log(body);
      });
  }

  checkOwner() {
    if (this.props.creatorID === this.props.userID) {
      return (
        <Fragment>
          <EditGroup
            user_id={this.props.userID}
            groupID={this.props.groupID}
            groupMembers={this.props.groupMembers}
          />
          <ApproveGroupEvent
            creator_id={this.props.creatorID}
            groupID={this.props.groupID}
          />
          <MenuItem onClick={this.handleDelete}>
            <i className="material-icons">delete</i>Delete Group
          </MenuItem>
        </Fragment>
      );
    }
  }

  render() {
    return (
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}
        >
          Group Options
        </Button>
        <Menu
          id="group-options"
          keepMounted
          anchorEl={this.state.anchorEl}
          open={this.state.anchorEl !== null}
          onClose={this.handleClose}
        >
          <CreateGroup creator_id={this.props.creatorID} />
          {this.checkOwner()}
        </Menu>
      </div>
    );
  }
}
