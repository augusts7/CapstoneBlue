import React from "react";
import {Typography} from "@material-ui/core";
import ListItemWithCheckbox from "../../../../../../GenericViews/list/list-items/ListItemWithCheckbox";

const containerStyle = {display: "grid", "grid-template-columns": "40% 40%", padding: "8px 0px"};
const nameContainerStyle = {fontWeight: "600"};

export default function UploadedUserDataListRow (props) {

    const onCheckBoxClick = () => {
        props.onToggleUser(props.data.campusEmail);
    };

    return (
        <ListItemWithCheckbox checked={true} onCheckBoxClick={onCheckBoxClick}>
            <UserRow {...props} />
        </ListItemWithCheckbox>
    );
}

function UserRow (props) {

    const name = props.data.first_name + " " + props.data.last_name;
    const email = props.data.campusEmail;

    return (
        <div style={containerStyle}>
            <div>{name}</div>
            <div>{email}</div>
        </div>
    );
}