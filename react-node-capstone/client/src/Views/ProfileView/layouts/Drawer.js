import React from "react";
import {Icon} from "@material-ui/core";
import {Link} from "react-router-dom";

import "./Drawer.css";
import Typography from "@material-ui/core/Typography";


const items = [
    {icon: "input", name: "Profile Info", link: "profileInfo"},
    {icon: "dashboard", name: "Current Groups", link: "currentGroups"},
    {icon: "today", name: "Calendars Shared With me", link: "calendarsSharedWithMe"},
    {icon: "today", name: "Calendars Shared To", link: "calendarsSharedTo"},
    {icon: "description", name: "Classes Taken", link: "classesTaken"},
];


export default function Drawer(props) {


    return (
        <div className="profile-view-drawer mdl-color--white mdl-layout--large-screen-only mdl-shadow--2dp" style={{width: 0.18 * window.innerWidth, "flex-grow": "0"}}>
            {items.map((item) => {
                return (
                    <DrawerItem link={item.link} icon={item.icon} name={item.name} />
                );
            })}
        </div>
    );
}

function DrawerItem(props) {

    return (
        <a href={"#" + props.link}>
            <div className="flex profile-drawer-item">
                <div className="flex-sub mdl-color-text--indigo-900"><Icon>{props.icon}</Icon></div>
                <div className="flex-main">
                    <Typography variant="subtitle1">
                        {props.name}
                    </Typography>

                </div>
            </div>
        </a>
    );
}