import React from "react";
import UploadUsersFromFileForm from "../../GenericViews/forms/upload-users-form/UploadUsersFromFileForm";


const containerStyle = {paddingTop: "32px", paddingBottom: "32px"};

export default class CreateGroupFromFile extends React.Component {

    constructor(props) {
        super(props);


    }

    handleSubmit = (results) => {
        console.log(results);
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

