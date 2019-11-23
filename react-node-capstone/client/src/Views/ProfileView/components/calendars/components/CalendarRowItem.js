import React from "react";
import {Typography} from "@material-ui/core";

export default function CalendarRowItem(props) {

    return (
        <Typography variant="subtitle2">
            {props.children}
        </Typography>
    );
}