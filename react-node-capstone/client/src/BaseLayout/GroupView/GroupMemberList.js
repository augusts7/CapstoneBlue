import React, { Component } from "react";

import "./GroupMemberList.css";

class GroupMemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupMembers: [
        {
          user_id: 1,
          name: "Member Name",
          status: "Owner"
        },
        {
          user_id: 2,
          name: "Member Name",
          status: "Member"
        }
      ]
    };
  }

  render() {
    var memberList = this.state.groupMembers.map(member => {
      return (
        <div className="member-list-container" key={member.user_id}>
          <div className="member-name">{member.name}</div>
          <div className="member-status">{member.status}</div>
        </div>
      );
    });

    return <div className="member-list">{memberList}</div>;
  }
}

export default GroupMemberList;
