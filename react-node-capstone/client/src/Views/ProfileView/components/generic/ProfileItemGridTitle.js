import React from "react";
import "./ProfileItemGridRow.css";
import {Typography} from "@material-ui/core";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";

export default function ProfileItemGridTitle (props) {

    let titles = [];

    if (LengthValidator.isEmpty(props.titles)) {
        return (<div />);
    }

    props.titles.forEach((title) => {
        titles.push(<CalendarTitleRowItem>{title}</CalendarTitleRowItem>);
    });

    return (
        <div className="profile-item-title-row">
            {titles}
        </div>
    );
}

function CalendarTitleRowItem (props) {

    return (
        <Typography variant="subtitle1" color="primary">{props.children}</Typography>
    );
}

