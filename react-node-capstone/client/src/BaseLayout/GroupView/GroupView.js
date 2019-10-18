import React from "react";
import EventList from "../../components/EventList/EventList";
import GroupMemberList from "./GroupMemberList";

import "./GroupView.css";

//Mockup: https://www.figma.com/file/r5yEpMlG5SzIAkONOOAWc0/Groups-faculty-%26-student?node-id=0%3A1

class GroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_id: 2,
      groupName: "Group Name",
      eventListItems: [
        {
          title: "Event Title 1",
          description: "This is a description for the event",
          start: new Date(),
          end: new Date()
        },
        {
          title: "Event Title 2",
          description: "This is a description for the event",
          start: new Date(),
          end: new Date()
        }
      ],
      groupMembers: [
        {
          user_id: 1,
          first_name: "Nick",
          last_name: "Fontana",
          status: "Owner"
        },
        {
          user_id: 2,
          first_name: "Bob",
          last_name: "Builder",
          status: "Member"
        }
      ],
      groupOwner: 1
    };
  }

  componentDidMount() {
    this.getGroupEvents();
    this.getGroupMembers();
    //this.getGroupInfo();
  }
  /**
   * @todo Doesnt work properly. Data comes in correctly.
  getGroupInfo() {
    var groupInfoURL = "/groups/groupInfo/" + this.state.group_id;
    fetch(groupInfoURL)
      .then(res => res.json())
      .then(groupInfo =>
        this.setState({
          groupName: groupInfo.group_name,
          groupOwner: groupInfo.creator_id
        })
      );
  }
  */
  getGroupMembers() {
    var groupMembersURL = "/groups/groupMembers/" + this.state.group_id;
    fetch(groupMembersURL)
      .then(res => res.json())
      .then(group_members => this.setState({ groupMembers: group_members }));
  }

  getGroupEvents() {
    var groupEventsURL = "/groups/groupEvents/" + this.state.group_id;
    fetch(groupEventsURL)
      .then(res => res.json())
      .then(group_events => this.setState({ eventListItems: group_events }));
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
