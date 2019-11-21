import React from "react";
import ProfileSideBar from "./components/side-view/ProfileSideBar";
import ProfileSectionContainer from "./generic/profile-view-section/ProfileSectionContainer";
import CalendarsSharedWithMe from "./components/calendars/shared-with-me/CalendarsSharedWithMe";
import CalendarsSharedByMe from "./components/calendars/shared-by-me/CalendarsSharedByMe";
import ClassesTaken from "./components/classes-taken/ClassesTaken";
import "./ProfileView.css";


export default class ProfileView extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        let title = "Profile";

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





