import React from "react";
import EventList from "../../components/EventList/EventList";
import Button from "@material-ui/core/Button";
import GroupMemberList from "./GroupMemberList";

import "./GroupView.css";

//Mockup: https://www.figma.com/file/r5yEpMlG5SzIAkONOOAWc0/Groups-faculty-%26-student?node-id=0%3A1

class GroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "Group Name",
      eventListItems: [
        {
          title: "Event Title",
          description: "This is a description for the event",
          start: new Date(),
          end: new Date()
        },
        {
          title: "Event Title",
          description: "This is a description for the event",
          start: new Date(),
          end: new Date()
        }
      ],
      groupMembers: [
        {
          user_id: 1,
          name: "Nick Fontana"
        },
        {
          user_id: 2,
          name: "Bob Builder"
        }
      ],
      groupOwner: ""
    };
  }

  render() {
    return (
      <div className="group-view">
        <div className="group-name">
          <h2>{this.state.groupName}</h2>
          <hr />
        </div>
        <div className="group-events">
          <h3 className="list-header">Group Events</h3>
          <hr />
          <EventList events={this.state.eventListItems} />
        </div>
        <div className="group-members">
          <h3 className="list-header">Group Members</h3>
          <hr />
          <GroupMemberList groupMembers={this.state.groupMembers} />
        </div>
      </div>
    );
  }
}

export default GroupView;
