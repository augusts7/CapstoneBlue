import React from "react";
import Button from "@material-ui/core/Button";

export default function ProfileViewSectionButton (props) {

    return (
        <Button onClick={props.onClick} variant="outlined" color="primary">
            {props.children}
        </Button>
    );
}