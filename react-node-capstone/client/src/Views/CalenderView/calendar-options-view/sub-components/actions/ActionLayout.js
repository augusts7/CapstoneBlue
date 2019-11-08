import React, {useContext} from 'react';
import UserContext from "../../../../../Context/UserContext";
import Tooltip from "@material-ui/core/Tooltip";
import {Typography} from "@material-ui/core";
import BaseLayout from "../base-layout/BaseLayout";

import "./ActionLayout.css";

const commonData = {
    links: [
        {"id": "addAppointment", "name": "Add Appointment", "link": "/appointment/add", "icon": "add"},
        {"id": "shareCalendar", "name": "Share calendar", "link": "/calendar/share", "icon": "share"},
        {"id": "exportCalendar", "name": "Export calendar", "link": "/calendar/export", "icon": "check_circle_outline"}
    ],
};

const contentStyle = {paddingTop: "8px"};

export default function ActionLayout(props) {

    let links = [];

    const userContext = useContext(UserContext);

    let userType = "";
    if (userContext != null) {
        userType = "" + userContext.user_type;
    }


    if (userType === "faculty") {
        links.push({"id": "addAdvising", "name": "Create Advising Slots", "link": "/advisingSlots/add", icon: "today"});
    } else {
        links.push({
            "id": "selectAdvising",
            "name": "Sign up for Advising",
            "link": "/advisingSlots/view",
            "icon": "today"
        });
    }

    links = links.concat(commonData.links);

    const handleClick = (id) => {
        props.handleAction(id, {});
    };

    return (
        <BaseLayout title="Actions" isLoading={false}>
            <div className="mdl-color--white" style={contentStyle}>
                {links.map((link) => {
                    return (<ListItem onClick={handleClick} key={link.id} icon={link.icon} id={link.id}
                                      to={link.link}>{link.name}</ListItem>);
                })}
            </div>
        </BaseLayout>
    );
}


function ListItem(props) {

    const handleClick = () => {
        props.onClick(props.id);
    };

    return (
        <Tooltip title={props.children} aria-label="add" placement="top-end" enterDelay={500} leaveDelay={200}>
            <div onClick={handleClick}>
                <div className="actionItemOptionContainer">
                    <div className="icon"><i className="material-icons">{props.icon}</i></div>
                    <div className="mainItem"><Typography variant="subtitle2">{props.children}</Typography></div>
                </div>
            </div>
        </Tooltip>
    );
}