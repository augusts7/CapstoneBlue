import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import Modal from '@material-ui/core/Modal';

export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            anchorEl: null,
            group_id: this.props.groupID,
            open: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
    }

  handleClick(event){
    this.setState({anchorEl: event.currentTarget});
      this.setState({open: !this.state.open});
  };

  handleCreate(){
      this.setState({anchorEl: null});
  };

  handleClose(){
      this.setState({anchorEl: null});
      this.setState({open: false});
  };

  handleDelete(){
      console.log(this.state.group_id + " groupid");
      this.setState({anchorEl: null});
      fetch("/groups/delete/" + this.state.group_id, {
          method: "DELETE",
          headers: {
              Accept: 'application/json',
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              group_id: this.state.group_id
          }),
      })
          .then(function(response) {
              return response.json();
          })
          .then(function(body) {
              console.log(body);
          });
      window.alert("group deleted");
  };
render(){
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
        open={this.state.anchorEl}
        onClose={this.handleClose}
      >
        <MenuItem>
        <Link to="/createGroup">Create Group</Link>
        </MenuItem>
        <MenuItem onClick={this.handleDelete}>Delete Group</MenuItem>
      </Menu>
        {/*<Modal open={open}*/}
        {/*       onClose={handleClose}>*/}

        {/*</Modal>*/}
    </div>
  );
}}
