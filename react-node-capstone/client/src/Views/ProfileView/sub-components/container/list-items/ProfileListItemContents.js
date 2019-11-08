import ProfileCardListItemButton from "../buttons/ProfileCardListItemButton";
import Typography from "@material-ui/core/Typography";
import React from "react";

export default function ProfileCardListItemContents(props) {

    let body = props.item.value;
    let button = props.item.button || false;

    if (button === true) {
        body = <ProfileCardListItemButton className="list-item-button" onClick={props.item.onClick}>{props.item.value}</ProfileCardListItemButton>;
    }

    return (
        <div className="list-item">
            <Typography variant="subtitle2">{props.item.name}</Typography>
            <div>{body}</div>
        </div>
    );
}