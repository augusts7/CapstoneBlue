import React from "react";
import ProfileItemBlockContainer from "../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";
import ProfileListItemContents from "../../generic/profile-view-item/list-items/ProfileListItemContents";
import ProfileSectionContainer from "../../generic/profile-view-section/ProfileSectionContainer";
import ManageUsersView from "./ManageUsersView";
import AuthContext from "../../../../Context/AuthContext";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";

import {get} from "../../../../ApiHelper/ApiHelper";


export default class ProfileSideBar extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            progress: false
        };
    }

    handleResetPassword = () => {
        this.setState({progress: true});
        get("auth/sendPasswordResetEmail", (res) => {
            console.log(res);
            this.setState({progress: false})
        });
    };

    componentDidMount() {
        this.setState({progress: true});
        get("user_info/", (res) => {
            let user = null;
            if (res.success) {
                if (LengthValidator.isNotEmpty(res.results)) {
                    user = res.results[0];
                }
            }
            this.setState({progress: false, user: user});
        });
    }

    getProfileItems = () => {
        let profileItems = [];

        const user = this.state.user;

        if (LengthValidator.isNotEmpty(user)) {
            profileItems.push({name: "First name", value: user.first_name});
            profileItems.push({name: "Last name", value: user.last_name});
            profileItems.push({name: "Email", value: user.campusEmail});
            profileItems.push({name: "User Type", value: user.user_type});
        }
        return profileItems;
    };



    render() {
        let title = "Profile";

        let buttons = [
            {name: "Log Out", onClick: () => this.context.logout()},
            {name: "Reset Password", onClick: () => this.handleResetPassword()}
        ];

        let profileItems = this.getProfileItems();

        console.log(this.state.user);



        return (
            <ProfileSectionContainer title="Profile" buttons={buttons}>

                <ProfileItemBlockContainer progress={this.state.progress} title="Basic Profile Info">

                    {profileItems.map((item) => {
                        return (
                            <ProfileListItemContents item={item}/>
                        );
                    })}

                </ProfileItemBlockContainer>

                <ManageUsersView/>

            </ProfileSectionContainer>
        );
    }
}




