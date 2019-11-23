import React from "react";
import UploadUsersFromFileForm from "../../../../../GenericViews/forms/upload-users-form/UploadUsersFromFileForm";
import {post} from "../../../../../../ApiHelper/ApiHelper";
import LengthValidatorForMultipleValues from "../../../../../../utils/length-utils/LengthValidatorForMultipleValues";
import ArrayLengthValidator from "../../../../../../utils/length-utils/ArrayLengthValidator";


const containerStyle = {paddingTop: "32px", paddingBottom: "32px"};

export default class CreateUsersFromFileForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: ""
        };
    }

    handleSubmit = (allSelectedUsers) => {

        if (ArrayLengthValidator.isEmpty(allSelectedUsers)) {
            this.setState({message: "Please Upload a file before submitting"});
            return false;
        }
        const data = {users: allSelectedUsers};
        post("/auth/createMultipleUsers", data, (res) => {
            if (res.success) {
                this.props.onClose();
            } else {
                alert("error while adding students");
            }

        });
    };


    hideMessage = () => {
        this.setState({message: ""});
    };

    render() {


        return (
            <UploadUsersFromFileForm
                message={this.state.message}
                hideMessage={this.hideMessage}
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

