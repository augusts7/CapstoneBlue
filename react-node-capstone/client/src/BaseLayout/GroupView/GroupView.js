import React from "react";
import EventList from "../../components/EventList/EventList";
import GroupMemberList from "./GroupMemberList";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {MenuItem} from "@material-ui/core";
import Select from "@material-ui/core/Select";

import "./GroupView.css";

import CreateGroupEvent from "./CreateGroupEvent";
import AddGroupMember from "./AddGroupMember";
import GroupOptions from "./GroupOptionsMenu";
import AddMultipleUsersFromList from "../../Views/GroupView/AddMultipleUsersFromList";
import UserContext from "../../Context/UserContext";
import LengthValidator from "../../utils/length-utils/LengthValidator";
import AddMultipleUsersFromFile from "../../Views/GroupView/AddMultipleUsersFromFile";

//Mockup: https://www.figma.com/file/r5yEpMlG5SzIAkONOOAWc0/Groups-faculty-%26-student?node-id=0%3A1

class GroupView extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            group_id: 0,
            my_groups: [],
            groupName: "",
            creator_id: 0,
            eventListItems: [],
            groupMembers: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.refreshGroup = this.refreshGroup.bind(this);
        this.getMyGroups = this.getMyGroups.bind(this);
    }

    componentDidMount() {
        this.getMyGroups();
    }

    refreshGroup(group) {
        this.getGroupEvents(group);
        this.getGroupMembers(group);
        this.getGroupInfo(group);
    }

    getMyGroups() {
        var myGroupsURL = "/my_groups";
        fetch(myGroupsURL)
            .then(res => res.json())
            .then(myGroups =>
                this.setState({group_id: myGroups[0].group_id}, () => {
                    this.setState({my_groups: myGroups});
                    this.refreshGroup(myGroups[0].group_id);
                })
            );
    }

    getGroupInfo(groupID) {
        var groupInfoURL = "/groups/groupInfo/" + groupID;
        fetch(groupInfoURL)
            .then(res => res.json())
            .then(groupInfo => this.getGroupInfoHelper(...groupInfo));
    }

    getGroupInfoHelper(args) {
        var info = {...args};
        this.setState({
            groupName: info.group_name,
            creator_id: info.creator_id
        });
    }

    getGroupMembers(groupID) {
        var groupMembersURL = "/groups/groupMembers/" + groupID;
        fetch(groupMembersURL)
            .then(res => res.json())
            .then(group_members => this.setState({groupMembers: group_members}));
    }

    getGroupEvents(groupID) {
        var groupEventsURL = "/groups/groupEvents/" + groupID;
        fetch(groupEventsURL)
            .then(res => res.json())
            .then(group_events => this.setState({eventListItems: group_events}));
    }

    handleChange(event) {
        this.setState({group_id: event.target.value}, () => {
            this.refreshGroup(event.target.value);
        });
    }

    render() {
        var groups = this.state.my_groups.map(g => {
            return <MenuItem value={g.group_id}>{g.group_name}</MenuItem>;
        });

        return (
            <div className="group-view">
                <div className="group-header">
                    <div className="my-groups-select">
                        <FormControl variant="standard">
                            <InputLabel>My Groups</InputLabel>
                            <Select
                                displayEmpty
                                autoWidth={true}
                                value={this.state.group_id}
                                onChange={this.handleChange}
                                children={groups}
                            />
                        </FormControl>
                    </div>
                    <div className="group-name">
                        <h2>{this.state.groupName}</h2>
                    </div>
                    <div className="group-options">
                        <GroupOptions groupID={this.state.group_id}/>
                    </div>
                </div>
                <hr/>
                <div className="group-body">
                    <div className="group-events">
                        <h3 className="group-events-list-header">Group Events</h3>
                        <div className="buttons-group-events">
                            <CreateGroupEvent
                                action={() => this.refreshGroup(this.state.group_id)}
                                user={this.state.creator_id}
                                groupID={this.state.group_id}
                            />
                        </div>
                        <div className="group-event-list">
                            <hr/>
                            <EventList
                                action={() => this.refreshGroup(this.state.group_id)}
                                events={this.state.eventListItems}
                            />
                        </div>
                    </div>
                    <div className="group-members">
                        <h3 className="list-header">Group Members</h3>
                        <div className="buttons-group-members">
                            <AddGroupMember/>
                            <AddMultipleUsersFromList/>
                            <AddMultipleUsersFromFile/>
                        </div>
                        <hr/>
                        <GroupMemberList
                            value={this.state.group_id}
                            groupMembers={this.state.groupMembers}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default GroupView;
