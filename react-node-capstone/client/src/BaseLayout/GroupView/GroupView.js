import React from "react";
import EventList from "../../components/EventList/EventList";

import "./GroupView.css";

//Mockup: https://www.figma.com/file/r5yEpMlG5SzIAkONOOAWc0/Groups-faculty-%26-student?node-id=0%3A1

class GroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "Group Name",
      eventListItems: [{
        title: "Event Title",
        description: "This is a description for the event",
        start: new Date(),
        end: new Date()
      },{
        title: "Event Title",
        description: "This is a description for the event",
        start: new Date(),
        end: new Date()
      }],
      groupMembers: [],
      groupOwner: ""
    };
  }

  componentDidMount() {
    fetch("/events/");
  }

  render() {
    return (
      <div class="group-view">
        <div class="group-name">
          <h2>{this.state.groupName}</h2>
          <hr/>
        </div>
        <div class="group-events">
          <h3 class="list-header">Group Events</h3>
          <EventList events={this.state.eventListItems} />
        </div>
        <div class="group-members">
          <h3 class="list-header">Group Members</h3>
        </div>
      </div>
    );
  }
}

export default GroupView;
