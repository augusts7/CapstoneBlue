import React from "react";
import {Typography} from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";

const styles = {
    paddingTop: "8px"
};

export default function DialogFormContentText(props) {

    return (
        <DialogContentText style={styles}>
            {props.children}
        </DialogContentText>
    );

}