import React from "react";
import UploadUsersFromFileForm from "../../../../../GenericViews/forms/upload-users-form/UploadUsersFromFileForm";


const containerStyle = {paddingTop: "32px", paddingBottom: "32px"};

export default class CreateUsersFromFileForm extends React.Component {

    constructor(props) {
        super(props);


    }

    handleSubmit = (allSelectedUsers) => {

    };


    render() {


        return (
            <UploadUsersFromFileForm
                selectTitle="Select all the users who you want to add to this group"
                text="To create users from file, upload the file with the users information"
                title="Create users from file"
                open={this.props.open}
                onClose={this.props.onClose}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

