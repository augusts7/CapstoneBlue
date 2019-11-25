import React from "react";
import "./ProfileItemGridRow.css";
import SingleItemInProfileGrid from "./SingleItemInProfileGrid";
import ProfileItemGridRow from "./ProfileItemGridRow";

export default function CalendarItemGridRow(props) {


    return (
        <ProfileItemGridRow {...props}>
            <SingleItemInProfileGrid>{props.data.sharedCalendarName}</SingleItemInProfileGrid>
            <SingleItemInProfileGrid>{props.data.first_name + " " + props.data.last_name}</SingleItemInProfileGrid>
            <SingleItemInProfileGrid>{props.data.campusEmail}</SingleItemInProfileGrid>
        </ProfileItemGridRow>
    );
}

