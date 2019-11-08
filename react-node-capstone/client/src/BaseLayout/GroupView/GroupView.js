import React from "react";
import EventList from "../../components/EventList/EventList";
import GroupMemberList from "./GroupMemberList";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { MenuItem, Menu } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import ls from "local-storage";

import "./GroupView.css";

import CreateGroupEvent from "./CreateGroupEvent";
import AddGroupMember from "./AddGroupMember";
import GroupOptions from "./GroupOptionsMenu";

//Mockup: https://www.figma.com/file/r5yEpMlG5SzIAkONOOAWc0/Groups-faculty-%26-student?node-id=0%3A1

class GroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_id: 2,
      my_groups: [],
      groupName: "",
      creator_id: 0,
      eventListItems: [],
      groupMembers: [],
      user_id: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getMyGroups();
    this.getGroupEvents(this.state.group_id);
    this.getGroupMembers(this.state.group_id);
    this.getGroupInfo(this.state.group_id);
  }
  getMyGroups() {
    var myGroupsURL = "/my_groups";
    fetch(myGroupsURL)
      .then(res => res.json())
      .then(myGroups => this.setState({ my_groups: myGroups }));
  }
  getGroupInfo(groupID) {
    var groupInfoURL = "/groups/groupInfo/" + groupID;
    fetch(groupInfoURL)
      .then(res => res.json())
      .then(groupInfo => this.getGroupInfoHelper(...groupInfo));
  }
  getGroupInfoHelper(args) {
    var info = { ...args };
    this.setState({
      groupName: info.group_name,
      group_id: info.group_id,
      creator_id: info.creator_id
    });
  }
  getGroupMembers(groupID) {
    var groupMembersURL = "/groups/groupMembers/" + groupID;
    fetch(groupMembersURL)
      .then(res => res.json())
      .then(group_members => this.setState({ groupMembers: group_members }));
  }
  getGroupEvents(groupID) {
    var groupEventsURL = "/groups/groupEvents/" + groupID;
    fetch(groupEventsURL)
      .then(res => res.json())
      .then(group_events => this.setState({ eventListItems: group_events }));
  }
  handleChange(event) {
    let groupID = event.target.value;
    this.setState({ group_id: groupID });
    this.getGroupEvents(groupID);
    this.getGroupInfo(groupID);
    this.getGroupMembers(groupID);
  }

  render() {
    var groups = this.state.my_groups.map(g => {
      return <MenuItem value={g.group_id}>{g.group_name}</MenuItem>;
    });

    if (this.state.user_id === this.state.creator_id) {
      return (
        <div className="group-view">
          <div className="group-header">
            <div className="my-groups-select">
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-simple">My Groups</InputLabel>
                <Select
                  autoWidth={true}
                  value={this.state.group_id}
                  onChange={this.handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {groups}
                </Select>
              </FormControl>
            </div>
            <div className="group-name">
              <h2>{this.state.groupName}</h2>
            </div>
            <div className="group-options">
              <GroupOptions />
            </div>
          </div>
          <hr />
          <div className="group-events">
            <h3 className="group-events-list-header">Group Events</h3>
            <div className="buttons-group-events">
              <CreateGroupEvent user={"owner"} groupID={this.state.group_id} />
            </div>
            <div className="group-event-list">
              <hr />
              <EventList events={this.state.eventListItems} />
            </div>
          </div>
          <div className="group-members">
            <h3 className="list-header">Group Members</h3>
            <div className="buttons-group-members">
              <AddGroupMember />
            </div>
            <hr />
            <GroupMemberList groupMembers={this.state.groupMembers} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="group-view">
          <div className="group-header">
            <div className="my-groups-select">
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-simple">My Groups</InputLabel>
                <Select
                  autoWidth={true}
                  value={this.state.group_id}
                  onChange={this.handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {groups}
                </Select>
              </FormControl>
            </div>
            <div className="group-name">
              <h2>{this.state.groupName}</h2>
            </div>
          </div>
          <hr />
          <div className="group-events">
            <h3 className="group-events-list-header">Group Events</h3>
            <div className="buttons-group-events">
              <CreateGroupEvent user={"member"} groupID={this.state.group_id} />
            </div>
            <div className="group-event-list">
              <hr />
              <EventList events={this.state.eventListItems} />
            </div>
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
}

export default GroupView;
