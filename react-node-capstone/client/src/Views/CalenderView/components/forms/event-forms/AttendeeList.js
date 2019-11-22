import React from "react";
import LengthValidator from "../../../../../utils/length-utils/LengthValidator";
import Chip from "@material-ui/core/Chip";
import Icon from "@material-ui/core/Icon";

const chipStyle = {marginBottom: "2px"};

export default function AttendeeList (props) {

    let selectedEmails = [];

    const handleDelete = () => {
        alert("delete");
    };

    if (LengthValidator.isNotEmpty(props.attendees)) {
        console.log(props.attendees);

        props.attendees.forEach((attendee) => {
            selectedEmails.push(
                <Chip
                    style={chipStyle}
                    label={attendee.first_name + " " + attendee.last_name}
                    variant="outlined"
                    onDelete={handleDelete}
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