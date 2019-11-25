import React from "react";
import ProfileSectionTitle from "../../generic/profile-view-section/ProfileSectionTitle";
import ProfileSectionButtons from "../../generic/profile-view-section/ProfileSectionButtons";
import CreateUserForm from "./components/create-user-form/CreateUserForm";
import CreateUsersUsingFileForm from "./components/upload-file-form/CreateUsersFromFileForm";
import ProfileItemBlockContainer from "../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";
import Icon from "@material-ui/core/Icon";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default class ManageUsersView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showSimpleForm: false,
            showFileUploadForm: false
        };
    }

    showSimpleForm = () => {
        this.setState({showSimpleForm: true});
    };

    showFileUploadForm = () => {
        this.setState({showFileUploadForm: true});
    };

    hideSimpleForm = () => {
        this.setState({showSimpleForm: false});
    };

    hideFileUploadForm = () => {
        this.setState({showFileUploadForm: false});
    };

    buttons = [
        {name: "Add user", onClick: this.showSimpleForm},
        {name: "Upload File", onClick: this.showFileUploadForm}
    ];

    render() {
        return (
            <div>
                <ProfileSectionTitle>Manage Users</ProfileSectionTitle>

                <ProfileSectionButtons buttons={this.buttons} />

                <CreateUserForm open={this.state.showSimpleForm} onClose={this.hideSimpleForm}/>
                <CreateUsersUsingFileForm open={this.state.showFileUploadForm} onClose={this.hideFileUploadForm}/>

                <ProfileItemBlockContainer title="Create New Users">

                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader">
                        <ListItem onClick={this.showSimpleForm} button>
                            <ListItemIcon>
                                <Icon>add</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Create User From Form" style={{color: "black"}}/>
                        </ListItem>
                        <ListItem onClick={this.showFileUploadForm} button>
                            <ListItemIcon>
                                <Icon>cloud_upload</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Create Users From File" style={{color: "black"}}/>
                        </ListItem>

                    </List>

                </ProfileItemBlockContainer>


            </div>

        );
    }
}
