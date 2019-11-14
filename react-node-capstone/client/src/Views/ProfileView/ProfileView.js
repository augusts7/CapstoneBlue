import React from "react";
import ProfileSideBar from "./components/side-view/ProfileSideBar";
import ProfileSectionContainer from "./generic/profile-view-section/ProfileSectionContainer";
import CalendarsSharedWithMe from "./components/calendars/shared-with-me/CalendarsSharedWithMe";
import CalendarsSharedByMe from "./components/calendars/shared-by-me/CalendarsSharedByMe";
import ClassesTaken from "./components/classes-taken/ClassesTaken";
import "./ProfileView.css";
import {Typography} from "@material-ui/core";


export default class ProfileView extends React.Component {

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
            <div className="flex-full ulm-library-image">

                <div className="ProfileViewTabbedLayout">

                    <div className="ProfileViewTabbedLayout-Sidebar">
                        <ProfileSideBar/>
                    </div>
                    <div className="center ProfileViewTabbedLayout-contents">

                        <ProfileSectionContainer title="Profile Information">

                            <CalendarsSharedWithMe/>
                            <CalendarsSharedByMe/>

                        </ProfileSectionContainer>

                        <ProfileSectionContainer title="Courses">
                            <ClassesTaken/>
                        </ProfileSectionContainer>

                    </div>
                </div>
            </div>

        );
    }

}




