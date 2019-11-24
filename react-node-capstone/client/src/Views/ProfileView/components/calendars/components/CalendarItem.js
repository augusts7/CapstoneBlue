import React from "react";
import "./CalendarItem.css";
import CalendarRowItem from "./CalendarRowItem";
import CustomMenu from "../../../../GenericViews/menu/Menu";
import CustomIconButton from "../../../../GenericViews/IconButton";
import Icon from "@material-ui/core/Icon";

export default function CalendarItem(props) {

    const [anchor, setAnchor] = React.useState(null);

    const handleMenuClick = (key) => {
        if (key === "delete") {
            props.onDelete(props.data.id);
            handleMenuClose();
        }
    };

    const handleMenuClose = () => {
        setAnchor(null);
    };

    const handleMenuButtonClick = (event) => {
        setAnchor(event.currentTarget);
    };

    const menuOptions = [
        {name: "Delete Calendar", key: "delete"}
    ];


    return (
        <div className="calendar-item-wrapper">
            <div className="calendar-item-container">
                <CalendarRowItem>{props.data.sharedCalendarName}</CalendarRowItem>
                <CalendarRowItem>{props.data.first_name + " " + props.data.last_name}</CalendarRowItem>
                <CalendarRowItem>{props.data.campusEmail}</CalendarRowItem>
                <div>
                    <CustomIconButton onClick={handleMenuButtonClick}><Icon>more_vert</Icon></CustomIconButton>
                    <CustomMenu anchor={anchor} menuOptions={menuOptions} onClick={handleMenuClick} onClose={handleMenuClose} />
                </div>
            </div>
        </div>
    );
}

