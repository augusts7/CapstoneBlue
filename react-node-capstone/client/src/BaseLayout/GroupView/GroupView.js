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
        "https://www.visittheusa.com/sites/default/files/styles/hero_m_1300x700/public/images/hero_media_image/2016-10/Yosemite_CROPPED_Web72DPI.jpg?itok=uvDdtCkC",
      eventListItems: [],
      groupMembers: [],
      groupOwner: ""
    };
  }

  componentDidMount(){
    fetch("/events/")
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
          <h4 class="list-header">Group Events</h4>
          <EventList events={this.state.eventListItems}/>
        </div>
        <div class="group-members">
          <h4 class="list-header">Group Members</h4>
        </div>
        <div class="group-selector">
          Put a search box here to search for groups. Need to have the first
          item that pops up in search be a button to create new group.
        </div>
        <div class="group-actions">
          Put a drop down here with options to edit the current group.
        </div>
        <div class="group-description">
          <h4 class="list-header">Group News</h4>
        </div>
      </div>
    );
  }
}

export default GroupView;
