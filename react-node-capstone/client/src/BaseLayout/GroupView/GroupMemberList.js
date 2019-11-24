import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import "./GroupMemberList.css";

class GroupMemberList extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(member_id) {
    fetch("/groups/deleteUser/" + member_id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        group_id: this.props.group_id
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        console.log(body);
      });
    this.props.action();
  }

  getDeleteButton(member_id, status) {
    if (this.props.creator_id === this.props.user_id && status !== "Owner") {
      return (
        <IconButton
          aria-label="delete"
          className="delete-user-button"
          onClick={() => this.onSubmit(member_id)}
        >
          <DeleteIcon />
        </IconButton>
      );
    }
  }

  render() {
    var memberList = this.props.groupMembers.map(member => {
      return (
        <div className="member-list-container" key={member.user_id}>
          <div className="member-name">
            {member.first_name + " " + member.last_name}
          </div>
          <div className="member-status">{member.status}</div>
          {this.getDeleteButton(member.user_id, member.status)}
        </div>
      );
    });

    return <div className="member-list">{memberList}</div>;
  }
}

export default GroupMemberList;
