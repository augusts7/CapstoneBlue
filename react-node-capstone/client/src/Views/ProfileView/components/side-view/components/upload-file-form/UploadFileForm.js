import React from "react";
import DialogForm from "../../../../../CalenderView/components/forms/dialog-form/DialogForm";
import ExcelFileReader from "../../../../../../utils/file-utils/ExcelFileReader";
import LengthValidator from "../../../../../../utils/length-utils/LengthValidator";
import UploadedUserDataListRow from "./uploaded-user-list/UploadedUserDataListRow";
import {post} from "../../../../../../ApiHelper/ApiHelper";
import DialogFormContentText from "../../../../../CalenderView/components/forms/dialog-form/DialogFormContentText";
import ArrayToggleHelper from "../../../../../../utils/array-utils/ArrayToggleHelper";


const containerStyle = {paddingTop: "32px", paddingBottom: "32px"};

export default class UploadFileForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: null,
            progress: false,
            fileData: [],
            usersList: [],
            selectedUsersEmails: []
        };
    }

    handleSubmit = () => {
        if (LengthValidator.isEmpty(this.state.file)) {
            return false;
        }

        const data = {};
        post("/auth/createUsersFromFile", data, res => {

        });
    };

    buttons = [
        {name: "Cancel", onClick: this.props.onClose},
        {name: "Upload", onClick: this.handleSubmit}
    ];

    handleChange = (event) => {
        let fileToUpload = event.target.files[0];
        this.setState({file: fileToUpload, progress: true});

        ExcelFileReader.readFile(fileToUpload, fileData => {
            const [users, emails] = this.mapFileDataToUsersList(fileData);
            this.setState({progress: false, fileData, usersList: users, selectedUsersEmails: emails});
        });
    };

    mapFileDataToUsersList = (fileData) => {
        if (LengthValidator.isEmpty(fileData)) {
            return false;
        }
        let users = [];
        let usersEmailList = [];
        fileData.forEach((singleRow) => {

            const first_name = singleRow["First name"];
            const last_name = singleRow["Last name"];
            const campusEmail = singleRow["Email address"];

            usersEmailList.push(campusEmail);

            users.push({first_name, last_name, campusEmail});
        });
        return [users, usersEmailList];
    };

    onToggleUser = (userEmail) => {
        let results = ArrayToggleHelper.toggleStringValue(this.state.selectedUsersEmails, userEmail);
        this.setState({selectedUsersEmails: results});
        console.log(results);
    };

    render() {

        let readFileData = [];

        if (LengthValidator.isNotEmpty(this.state.usersList)) {
            readFileData.push(<DialogFormContentText>Select all the Users that you want to
                create</DialogFormContentText>);
            let index = 1;
            this.state.usersList.forEach((data) => {
                readFileData.push(<UploadedUserDataListRow onToggleUser={this.onToggleUser} data={data}
                                                           index={index}/>);
                index++;
            });
        }

        return (
            <DialogForm open={this.props.open} buttons={this.buttons} onClose={this.props.onClose}
                        progress={this.state.progress}
                        title="Create Users Using File"
                        text="To create a new users using file, upload the file with the user information.">

                <div style={containerStyle}>
                    <input
                        accept=".xlsx"
                        id="text-button-file"
                        onChange={this.handleChange}
                        multiple
                        type="file"
                    />
                </div>
                <div>
                    {readFileData}
                </div>
            </DialogForm>
        );
    }
}

