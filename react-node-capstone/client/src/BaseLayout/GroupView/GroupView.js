import React from "react";
import EventList from "../../components/EventList/EventList";

import "./GroupView.css";

//Mockup: https://www.figma.com/file/r5yEpMlG5SzIAkONOOAWc0/Groups-faculty-%26-student?node-id=0%3A1

class GroupView extends React.Component {
  render() {
    return (
      <div class="group-view">
        <div class="group-name">
          <h2>Group Name</h2>
        </div>
        <div class="group-picture">
          <p>A picture that the group owner selected.</p>
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
