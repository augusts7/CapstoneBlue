import React from "react";
import {Typography} from "@material-ui/core";

export default function SingleItemInProfileGrid(props) {

    return (
        <Typography variant="subtitle2">
            {props.children}
        </Typography>
    );
}