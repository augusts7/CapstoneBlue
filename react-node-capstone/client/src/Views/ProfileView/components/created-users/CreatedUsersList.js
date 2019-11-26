import React from "react";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";
import ProfileItemGridTitle from "../generic/ProfileItemGridTitle";
import CalendarItemGridRow from "../generic/CalendarItemGridRow";
import ProfileItemBlockContainer from "../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";
import {post} from "../../../../ApiHelper/ApiHelper";
import CreatedUsersDataStore from "./CreatedUsersDataStore";
import UserListItemGridRow from "../generic/UserListItemGridRow";
import CreateUserForm from "../side-view/components/create-user-form/CreateUserForm";

const createdUsersTitles = ["Name", "Email", "User Type"];

const menuItems = [
    {name: "Delete Created User", key: "delete"},
    {name: "Edit Created User", key: "edit"}
];

export default class CreatedUsersList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            progress: false,
            showUpdateForm: false,
            userToUpdate: null
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
        if (LengthValidator.isNotEmpty(id)) {
            let selectedUser = null;
            this.state.createdUsers.forEach((user) => {
                if (user.user_id === id) {
                    selectedUser = {...user};
                }
            });
            this.setState({showUpdateForm: true, userToUpdate: selectedUser});
        }
    };

    hideUserForm = () => {
        this.setState({showUpdateForm: false});
    };

    onSuccessfulUpdate = () => {
        this.dataStore.loadAllCreatedUsers();
    };

    render() {
        let createdUsers = [];
        console.log(this.state.createdUsers);
        if (LengthValidator.isNotEmpty(this.state.createdUsers)) {
            createdUsers.push(<ProfileItemGridTitle titles={createdUsersTitles}/>);
            this.state.createdUsers.forEach((user) => {
                createdUsers.push(<UserListItemGridRow key={user.campusEmail} menuOptions={menuItems} onMenuClick={this.handleMenuClick}
                                                       data={user}/>);
            });
        }

        return (
            <ProfileItemBlockContainer progress={this.state.progress} title="Users Created By Me">
                <CreateUserForm onUpdate={this.onSuccessfulUpdate} user={this.state.userToUpdate} scope="update" open={this.state.showUpdateForm} onClose={this.hideUserForm}/>
                {createdUsers}
            </ProfileItemBlockContainer>
        );
    }
}