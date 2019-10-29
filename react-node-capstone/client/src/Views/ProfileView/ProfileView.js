import React from "react";
import Drawer from "./layouts/Drawer";
import {Route} from "react-router-dom";
import ProfileInfo from "./sub-components/ProfileInfo";
import CurrentGroups from "./sub-components/CurrentGroups";
import CalendarsSharedWithMe from "./sub-components/CalendarsSharedWithMe";
import ClassesTaken from "./sub-components/ClassesTaken";
import SharedCalendars from "./sub-components/SharedCalendars";

import "./ProfileView.css"

export default function ProfileView(props) {

    return (
        <div className="profile-view-root-container mdl-color--grey-200" style={{display: "flex", height: 0.76 * window.screen.height}}>
            <Drawer/>
            <div style={{"flex-grow": "5", overflowY: "scroll"}}>
                <div id="profileInfo">
                    <ProfileInfo/>
                </div>
                <div id="currentGroups">
                    <CurrentGroups/>
                </div>
                <div id="calendarsSharedWithMe">
                    <CalendarsSharedWithMe/>
                </div>
                <div id="calendarsSharedTo">
                    <SharedCalendars/>
                </div>
                <div id="classesTaken">
                    <ClassesTaken/>
                </div>
            </div>
        </div>
    );
}

//
// <Route path="/profileView/profileInfo" component={ProfileInfo}/>
// <Route path="/profileView/currentGroups" component={CurrentGroups}/>
// <Route path="/profileView/calendarsSharedWithMe" component={CalendarsSharedWithMe}/>
// <Route path="/profileView/calendarsSharedTo" component={SharedCalendars}/>
// <Route path="/profileView/classesTaken" component={ClassesTaken}/>
// <Route exact path="/profileView" component={ProfileInfo}/>