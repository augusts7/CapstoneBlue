import React from "react";
import AuthFormSubmitButton from "../../../../../Authentication/AuthenticationFormLayout/AuthFormSubmitButton";
import Button from "@material-ui/core/Button";
import DialogForm from "../../../../CalenderView/components/forms/dialog-form/DialogForm";
import {uploadFile} from "../../../../../ApiHelper/ApiHelper";

const containerStyle = {paddingTop: "32px", paddingBottom: "32px"};

export default class CreateUsersUsingFileForm extends React.Component {

    uploadFileUrl = "/auth/createUsersFromFile";

    constructor(props) {
        super(props);

        this.state = {
            file: null,
        };
    }

    handleSubmit = () => {
        if (this.state.file === null) {
            return;
        }
        this.setState({isLoading: true});
        uploadFile(this.uploadFileUrl, this.state.file, (res) => {
            this.setState({isLoading: false});
        });
    };

    buttons = [
        {name: "Cancel", onClick: this.props.onClose},
        {name: "Submit", onClick: this.handleSubmit}
    ];

    handleSelectedFileChange = ({files}) => {
        let fileToUpload = files[0];
        this.setState({file: fileToUpload});
    };

    render() {


        return (
            <DialogForm open={this.props.open} buttons={this.buttons} onClose={this.props.onClose}
                        progress={this.state.isLoading}
                        title="Create Users Using File"
                        text="To create a new users using file, upload the file with the user information.">

                <div style={containerStyle}>
                    <input
                        accept="image/*"
                        id="text-button-file"
                        onChange={this.handleSelectedFileChange}
                        multiple
                        type="file"
                    />
                </div>
            </DialogForm>
        );
    }

}