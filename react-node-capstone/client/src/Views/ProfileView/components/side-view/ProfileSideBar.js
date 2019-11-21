import React from "react";
import ProfileItemBlockContainer from "../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";
import ProfileListItemContents from "../../generic/profile-view-item/list-items/ProfileListItemContents";
import ProfileSectionContainer from "../../generic/profile-view-section/ProfileSectionContainer";
import ManageUsersView from "./ManageUsersView";
import AuthContext from "../../../../Context/AuthContext";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";

export default class ProfileSideBar extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

    }

    handleResetPassword = () => {

    };

    layoutInfo = () => {

        const user = this.context.user;

        let profileItems = [];

        if (LengthValidator.isNotEmpty(user)) {
            profileItems.push({name: "First name", value: user.first_name});
            profileItems.push({name: "Last name", value: user.last_name});
            profileItems.push({name: "Email", value: user.campusEmail});
            profileItems.push({name: "User Type", value: user.user_type});
        }

        return {
            data: {
                title: "Basic Profile Info", items: profileItems
            },
            buttons: [
                {name: "Log Out", onClick: () => this.context.logout()},
                {name: "Reset Password", onClick: () => this.handleResetPassword()}
            ]
        };
    };

    render() {
        let title = "Profile";

        let layoutInfo = this.layoutInfo();

        return (
            <ProfileSectionContainer title={title} buttons={layoutInfo.buttons}>
                <ProfileItemBlockContainer title={layoutInfo.data.title}>

                    {layoutInfo.data.items.map((item) => {
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



