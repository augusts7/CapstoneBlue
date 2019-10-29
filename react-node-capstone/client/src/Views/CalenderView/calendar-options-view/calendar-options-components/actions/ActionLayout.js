import React, {useContext} from 'react';
import IconButton from '../../../generic-components/IconButton';
import UserContext from "../../../../../Context/UserContext";
import Tooltip from "@material-ui/core/Tooltip";

const commonData = {
    smallCardStyle: {"overflowY": "scroll", "height": window.innerHeight * 0.35},
    listItemStyle: {"background": "white"},
    links: [
        {"id": "addAppointment", "name": "Add Appointment", "link": "/appointment/add", "icon": "add"},
        {"id": "shareCalendar", "name": "Share calendar", "link": "/calendar/share", "icon": "share"},
        {"id": "exportCalendar", "name": "Export calendar", "link": "/calendar/export", "icon": "check_circle_outline"}
    ]
};

export default function ActionLayout(props) {

    const [showContents, setShowContents] = React.useState(true);

    let body = null;
    if (showContents) {
        body = <Body handleAction={props.handleAction}/>;
    }

    return (
        <div className="filterItemContainer">
            <Header show={showContents} setShow={setShowContents}/>
            {body}
        </div>
    );
}

function Header(props) {

    const expandIcon = props.show === true ? "keyboard_arrow_up" : "keyboard_arrow_down";

    const toggleShow = () => {
        props.setShow(!props.show);
    };

    return (

        <div className="filterItemTitleContainer">

            <div className="filterItemTitleText">Actions</div>

            <div className="filterItemTitleActionsContainer">
                <div><IconButton onClick={toggleShow}><i className="material-icons">{expandIcon}</i></IconButton></div>
            </div>

        </div>

    );
}


function Body(props) {

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
        <div style={{paddingTop: "8px", paddingBottom: "8px"}}>

            {links.map((link) => {
                return (<ListItem onClick={handleClick} key={link.id} icon={link.icon} id={link.id}
                                  to={link.link}>{link.name}</ListItem>);
            })}
        </div>
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
                    <div className="mainItem">{props.children}</div>
                </div>
            </div>
        </Tooltip>
    );
}