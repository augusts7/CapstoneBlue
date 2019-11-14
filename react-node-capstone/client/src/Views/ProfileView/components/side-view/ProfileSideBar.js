import React from "react";
import ProfileItemBlockContainer from "../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";
import ProfileListItemContents from "../../generic/profile-view-item/list-items/ProfileListItemContents";
import ProfileSectionContainer from "../../generic/profile-view-section/ProfileSectionContainer";
import ManageUsersView from "./ManageUsersView";

export default class ProfileSideBar extends React.Component {


    constructor(props) {
        super(props);

    }

    layoutInfo = () => {

        const data = {
            data: {
                title: "Basic Profile Info", items: [
                    {name: "First name", value: "Sanjeeb"},
                    {name: "Last name", value: "Sangraula"},
                    {name: "Email", value: "sanjeeb@ulm.edu"},
                    {name: "User Type", value: "sanjeeb@ulm.edu"},
                ]
            },
            buttons: [
                {name: "Log Out", onClick: () => this.navigateTo("logOut")},
                {name: "Reset Password", onClick: () => this.navigateTo("resetPassword")}
            ]
        };
        return data;
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



