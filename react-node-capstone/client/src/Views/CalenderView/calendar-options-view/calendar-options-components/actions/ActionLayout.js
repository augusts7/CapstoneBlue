import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';


const commonData = {
    smallCardStyle: { "overflowY": "scroll", "height": window.innerHeight * 0.35 },
    listItemStyle: { "background": "white" },
    links: [
        { "id": "addAppointment", "name": "Add Appointment", "link": "/appointment/add", "icon": "add" },
        { "id": "modifyAppointment","name": "Modify Appointment", "link": "/appointment/modify", "icon" : "edit" },
        { "id": "shareCalendar", "name": "Share calendar", "link": "/calendar/share", "icon": "share" },
        { "id": "exportCalendar","name": "Export calendar", "link": "/calendar/export", "icon": "check_circle_outline" }
    ]
};


const smallButton = makeStyles(theme => ({
    "root": {
        "padding": "4px"
    }
}));

export default function Actionlayout(props) {

    const [showContents, setShowContents] = React.useState(true);

    let body = null;
    if (showContents) {
        body = <Body handleAction={props.handleAction} />;
    }

    return (
        <div className="filterItemContainer">
            <Header show={showContents} setShow={setShowContents}/>
            {body}
        </div>
    );
}

function Header(props) {

    const classes = smallButton();

    const expandIcon = props.show === true ? "keyboard_arrow_up" : "keyboard_arrow_down";

    const toggleShow = () => {
        props.setShow(!props.show);
    };

    return (

        <div className="filterItemTitleContainer">

            <div className="filterItemTitleText">Actions</div>

            <div className="filterItemTitleActionsContainer">
                <div><IconButton onClick={toggleShow} classes={classes}><i className="material-icons">{expandIcon}</i></IconButton></div>
            </div>

        </div>

    );
}


function Body(props) {

    let links = [];

    if (props.userType === "faculty") {
        links.push({ "id": "addAdvising", "name": "Create Advising Slots", "link": "/advisingSlots/add", icon: "today" });

    } else {
        links.push({ "id": "selectAdvising", "name": "Sign up for Advising", "link": "/advisingSlots/view", "icon": "today" });
    }

    links = links.concat(commonData.links);

    const handleClick = (id) => {
        props.handleAction(id, {});
    };

    return (
        <div style={{ paddingTop: "8px", paddingBottom: "8px" }}>

            {links.map((link) => {
                return (<ListItem onClick={handleClick} key={link.id} icon={link.icon} id={link.id} to={link.link}>{link.name}</ListItem>);
            })}
        </div>
    );
}

function ListItem(props) {

    const handleClick = () => {
        props.onClick(props.id);
    };

    return (
        <div onClick={handleClick}>

        <div className="actionItemOptionContainer">
                <div className="icon"><i className="material-icons">{props.icon}</i></div>
                <div className="mainItem">{props.children}</div>
        </div>

        </div>

    );
}