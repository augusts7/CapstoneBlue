import React from "react";
import EventList from "../../components/EventList/EventList";

import "./GroupView.css";

//Mockup: https://www.figma.com/file/r5yEpMlG5SzIAkONOOAWc0/Groups-faculty-%26-student?node-id=0%3A1

class GroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "Group Name",
      groupPicture:
        "https://www.nationalgeographic.com/content/dam/expeditions/destinations/north-america/private/Yosemite/Hero-Yosemite.jpg",

      eventListItems: [],
      groupMembers: [],
      groupOwner: ""
    };
  }
  render() {
    return (
      <div class="group-view">
        <div class="group-name">
          <h2>{this.state.groupName}</h2>
        </div>
        <div class="group-picture">
          <img src={this.state.groupPicture} alt="Group Picture" />
        </div>
        <div class="group-events">
          <EventList />
          <EventList />
          <EventList />
          <EventList />
        </div>
        <div class="group-info">
          <p>A list of members. Something scrollable.</p>
        </div>
      </div>
    );
  }
}

export default GroupView;
