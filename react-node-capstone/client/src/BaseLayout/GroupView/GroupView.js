import React from "react";
import EventList from "../../components/EventList/EventList";
import GroupMemberList from "./GroupMemberList";
import ls from "local-storage";

import "./GroupView.css";

//Mockup: https://www.figma.com/file/r5yEpMlG5SzIAkONOOAWc0/Groups-faculty-%26-student?node-id=0%3A1

class GroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_id: 2,
      my_groups: [],
      groupName: "Group Name",
      eventListItems: [],
      groupMembers: [],
      user_type: ls.get()
    };
    this.getGroupInfoHelper = this.getGroupInfoHelper.bind(this);
  }

  componentDidMount() {
    this.getMyGroups();
    this.getGroupEvents();
    this.getGroupMembers();
    this.getGroupInfo();
  }

  getMyGroups() {
    var myGroupsURL = "/my_groups/" + this.state.group_id;
    fetch(myGroupsURL)
      .then(res => res.json())
      .then(myGroups => this.setState({ my_groups: myGroups }));
  }

  getGroupInfoHelper(args) {
    var info = { ...args };
    this.setState({
      groupName: info.group_name,
      group_id: info.group_id
    });
  }
  getGroupInfo() {
    var groupInfoURL = "/groups/groupInfo/" + this.state.group_id;
    fetch(groupInfoURL)
      .then(res => res.json())
      .then(groupInfo => this.getGroupInfoHelper(...groupInfo));
  }

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
