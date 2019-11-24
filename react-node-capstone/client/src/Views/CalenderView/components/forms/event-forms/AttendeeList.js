import React from "react";
import LengthValidator from "../../../../../utils/length-utils/LengthValidator";
import Chip from "@material-ui/core/Chip";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import {Typography} from "@material-ui/core";

const chipStyle = {marginBottom: "2px", marginRight: "2px"};
const titleStyle = {marginLeft: "4px", marginBottom: "4px"};

export default function AttendeeList (props) {

    let selectedEmails = [];

    const handleDelete = (email) => {
        props.onDelete(email);
    };

    if (LengthValidator.isNotEmpty(props.attendees)) {
        console.log(props.attendees);

        selectedEmails.push(
            <Typography color="primary" style={titleStyle} variant="subtitle1">Invited Users</Typography>
        );

        props.attendees.forEach((attendee) => {
            selectedEmails.push(
                <Chip
                    color="primary"
                    style={chipStyle}
                    clickable
                    label={attendee.first_name + " " + attendee.last_name}
                    onDelete={() => handleDelete(attendee.campusEmail)}
                    deleteIcon={<Icon>close</Icon>}
                />
            );
        });
    }

    return (
        <div>
            {selectedEmails}
        </div>
    );
}