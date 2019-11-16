import React from "react";
import ProfileSectionTitle from "../../generic/profile-view-section/ProfileSectionTitle";
import ProfileSectionButtons from "../../generic/profile-view-section/ProfileSectionButtons";
import CreateUserForm from "./components/create-user-form/CreateUserForm";
import CreateUsersUsingFileForm from "./components/upload-file-form/UploadFileForm";
import ProfileItemBlockContainer from "../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";

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
        {name: "Create Users", onClick: this.showSimpleForm},
        {name: "Create Users From File", onClick: this.showFileUploadForm}
    ];

    render() {
        return (
            <div>
                <ProfileSectionTitle>Manage Users</ProfileSectionTitle>
                <ProfileSectionButtons buttons={this.buttons}/>

                <CreateUserForm open={this.state.showSimpleForm} onClose={this.hideSimpleForm}/>
                <CreateUsersUsingFileForm open={this.state.showFileUploadForm} onClose={this.hideFileUploadForm}/>

                <ProfileItemBlockContainer title="Create Users Using File Drop">


                </ProfileItemBlockContainer>


            </div>

        );
    }
}
