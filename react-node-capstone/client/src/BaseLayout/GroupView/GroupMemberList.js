import React, { Component } from "react";

import "./GroupMemberList.css";
import Button from "@material-ui/core/Button";

class GroupMemberList extends Component {

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            group_id: this.props.value
        }
    }

    onSubmit(event){
        var member_id = event.target.value;
        console.log(event.target.value);
        fetch("/groups/deleteUser/" + member_id, {
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
        window.alert(member_id + "user deleted");
    }

    render() {
    var memberList = this.props.groupMembers.map(member => {
        console.log(member.user_id);
      return (
        <div className="member-list-container" key={member.user_id}>
          <div className="member-name">
            {member.first_name + " " + member.last_name}
          </div>
          <div className="member-status">{member.status}</div>
            <Button
                type="submit"
                variant="contained"
                size="large"
                className="msgBtn"
                value={member.user_id}
                onClick={this.onSubmit}
            >
                <i className="material-icons">highlight_off</i>
            </Button>
        </div>
      );
    });

    return <div className="member-list">{memberList}</div>;
  }
}

export default GroupMemberList;
