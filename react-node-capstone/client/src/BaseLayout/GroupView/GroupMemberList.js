import React, { Component } from "react";

import "./GroupMemberList.css";

class GroupMemberList extends Component {
  render() {
    var memberList = this.props.groupMembers.map(member => {
      return (
        <div className="member-list-container" key={member.user_id}>
          <div className="member-name">
            {member.first_name + " " + member.last_name}
          </div>
          <div className="member-status">{member.status}</div>
        </div>
      );
    });

    return <div className="member-list">{memberList}</div>;
  }
}

export default GroupMemberList;
