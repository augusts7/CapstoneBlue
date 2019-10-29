import React from "react";
import EventList from "../../components/EventList/EventList";
import GroupMemberList from "./GroupMemberList";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import ls from "local-storage";

import "./GroupView.css";
import CreateGroupEvent from "./CreateGroupEvent";
import { minWidth } from "@material-ui/system";

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
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getMyGroups();
    this.getGroupEvents();
    this.getGroupMembers();
    this.getGroupInfo();
  }

  getMyGroups() {
    var myGroupsURL = "/my_groups";
    fetch(myGroupsURL)
      .then(res => res.json())
      .then(myGroups => this.setState({ my_groups: myGroups }));
  }

  getGroupInfo() {
    var groupInfoURL = "/groups/groupInfo/" + this.state.group_id;
    fetch(groupInfoURL)
      .then(res => res.json())
      .then(groupInfo => this.getGroupInfoHelper(...groupInfo));
  }
  getGroupInfoHelper(args) {
    var info = { ...args };
    this.setState({
      groupName: info.group_name,
      group_id: info.group_id
    });
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

  handleChange(event) {
    this.setState({ group_id: event.target.value });
  }

  render() {
    var groups = this.state.my_groups.map(g => {
      return <option value={g.group_id}>{g.group_name}</option>;
    });

    return (
      <div className="group-view">
        <div className="group-name">
          <h2>{this.state.groupName}</h2>
        </div>
        <div className="my-groups-select">
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">
              My Groups
            </InputLabel>
            <Select
              native={true}
              autoWidth={true}
              value={this.state.group_id}
              onChange={this.handleChange}
            >
              <option value="" />
              {groups}
            </Select>
          </FormControl>
        </div>
        <hr />
        <div className="group-events">
          <h3 className="group-events-list-header">Group Events</h3>
          <div className="buttons-group-events">
            <Button
              type="submit"
              variant="contained"
              size="large"
              className="create-group-event"
              href="/createGroupEvent"
            >
              <i className="material-icons">schedule</i>Create Event
            </Button>
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

export default GroupView;
