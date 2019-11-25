import React from "react";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";
import ProfileItemGridTitle from "../generic/ProfileItemGridTitle";
import CalendarItemGridRow from "../generic/CalendarItemGridRow";
import ProfileItemBlockContainer from "../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";
import {post} from "../../../../ApiHelper/ApiHelper";
import CreatedUsersDataStore from "./CreatedUsersDataStore";
import UserListItemGridRow from "../generic/UserListItemGridRow";

const createdUsersTitles = ["Name", "Email", "User Type"];

const menuItems =  [
    {name: "Delete Created User", key: "delete"},
    {name: "Edit Created User", key: "edit"}
];

export default class CreatedUsersList extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            progress: false
        };
    }

    componentDidMount() {
        this.dataStore = new CreatedUsersDataStore(this.onDataChange, this.onProgressChange);
    }

    onDataChange = (newState) => {
        this.setState(newState);
    };

    onProgressChange = (showProgress) => {
        this.setState({progress: showProgress});
    };

    handleDelete = (id) => {
        this.dataStore.deleteUser(id);
    };

    handleMenuClick = (key, id) => {
        if (key === "delete") {
            this.handleDelete(id);
        } else if (key === "edit") {
            this.handleEdit(id);
        }
    };

    handleEdit = (id) => {

    };


    render () {
        let createdUsers = [];
        console.log(this.state.createdUsers);
        if (LengthValidator.isNotEmpty(this.state.createdUsers)) {
            createdUsers.push(<ProfileItemGridTitle titles={createdUsersTitles}/>);
            this.state.createdUsers.forEach((user) => {
                createdUsers.push(<UserListItemGridRow menuOptions={menuItems} onMenuClick={this.handleMenuClick} data={user}/>);
            });
        }

        return (

            <ProfileItemBlockContainer progress={this.state.progress} title="Users Created By Me">
                {createdUsers}
            </ProfileItemBlockContainer>
        );
    }
}