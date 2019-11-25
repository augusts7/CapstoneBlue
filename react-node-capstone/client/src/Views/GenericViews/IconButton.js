import React from "react";
import {makeStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";


const smallButton = makeStyles(theme => ({
    "root": {
        "padding": "4px"
    }
}));

export default function CustomIconButton (props) {

    let classes = smallButton();

    return (
        <IconButton color={props.color} onClose={props.onClose} onClick={props.onClick} classes={classes}>
            {props.children}
        </IconButton>
    );
}