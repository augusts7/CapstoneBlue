import React from "react";
import DialogForm from "../../../CalenderView/components/forms/dialog-form/DialogForm";
import ExcelFileReader from "../../../../utils/file-utils/ExcelFileReader";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";
import UsersListSingleRow from "./UploadUsersFromFileListSingleRow";
import DialogFormContentText from "../../../CalenderView/components/forms/dialog-form/DialogFormContentText";
import ArrayToggleHelper from "../../../../utils/array-utils/ArrayToggleHelper";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import MessageBox from "../../../../components/Form/MessageBox/MessageBox";


const containerStyle = {paddingTop: "32px", paddingBottom: "32px"};
const inputContainerStyle = {border: "1px solid #BDBDBD", borderRadius: "8px", display: "flex", alignItems: "center"};
const fileInputStyle = {display: "none"};

export default class UploadUsersFromFileForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: null,
            progress: false,
            fileData: [],
            usersList: [],
            selectedUsersEmails: [],
        };
    }

    handleSubmit = () => {
        if (LengthValidator.isEmpty(this.state.file)) {
            this.props.onSubmit([]);
            return false;
        }

        let results = [];
        this.state.usersList.forEach((user) => {
            if (this.state.selectedUsersEmails.includes(user.campusEmail)) {
                results.push(user);
            }
        });
        this.props.onSubmit(results);
    };

    buttons = [
        {name: "Cancel", onClick: this.props.onClose},
        {name: "Upload", onClick: this.handleSubmit}
    ];

    handleChange = (event) => {
        let fileToUpload = event.target.files[0];
        this.setState({files: event.target.files, file: fileToUpload, progress: true});

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

            if (!usersEmailList.includes(campusEmail)) {
                // Only add the users if their email is not in the array already
                usersEmailList.push(campusEmail);
                users.push({first_name, last_name, campusEmail});
            }
        });
        return [users, usersEmailList];
    };

    handleClearData = () => {
        this.setState({fileData: [], usersList: [], selectedUsersEmails: []});
    };

    onToggleUser = (userEmail) => {
        let results = ArrayToggleHelper.toggleStringValue(this.state.selectedUsersEmails, userEmail);
        this.setState({selectedUsersEmails: results});
        console.log(results);
    };

    render() {

        let readFileData = [];

        if (LengthValidator.isNotEmpty(this.state.usersList)) {
            readFileData.push(<DialogFormContentText>{this.props.selectTitle}</DialogFormContentText>);
            let index = 1;
            this.state.usersList.forEach((data) => {
                readFileData.push(<UsersListSingleRow key={data.campusEmail} onToggleUser={this.onToggleUser} data={data}
                                                      index={index}/>);
                index++;
            });
        }

        return (
            <DialogForm open={this.props.open} buttons={this.buttons} onClose={this.props.onClose}
                        progress={this.state.progress}
                        title={this.props.title}
                        text={this.props.text}>

                <MessageBox message={this.props.message} hideMessage={this.props.hideMessage} />

                <div style={containerStyle}>
                    <div style={inputContainerStyle}>
                        <div className="flex-main">
                            <IconButton aria-label="menu">
                                <Icon>cloud_upload</Icon>
                            </IconButton>
                            <input
                                style={fileInputStyle}
                                accept=".xls, .xlsx"
                                onChange={this.handleChange}
                                id="outlined-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="outlined-button-file">
                                <Button color="primary" component="span">
                                    Upload
                                </Button>
                            </label>
                        </div>

                        <div className="flex-sub">
                            <Divider orientation="vertical"/>
                            <IconButton color="primary" onClick={this.handleClearData} aria-label="directions">
                                <Icon>clear</Icon>
                            </IconButton>
                        </div>

                    </div>
                </div>
                <div>
                    {readFileData}
                </div>
            </DialogForm>
        );
    }
}

