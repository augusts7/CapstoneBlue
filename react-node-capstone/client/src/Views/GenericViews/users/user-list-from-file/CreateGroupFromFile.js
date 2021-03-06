import React from "react";
import UploadUsersFromFileForm from "../../forms/upload-users-form/UploadUsersFromFileForm";
import {post} from "../../../../ApiHelper/ApiHelper";



export default class CreateGroupFromFile extends React.Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    handleSubmit = (allSelectedUsers) => {
        const data = {users: allSelectedUsers, group_id: this.props.groupId};
        post("/my_groups/addMultipleUsers/", data, (res) => {
            this.props.onClose();
        });
    };


    render() {

        return (
            <UploadUsersFromFileForm
                selectTitle="Select all the users that you want to add to this group"
                text="To create a group from file, upload the file with the users information"
                title="Create group from file"
                open={this.props.open}
                onClose={this.props.onClose}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

