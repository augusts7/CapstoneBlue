import React from "react";
import {Typography} from "@material-ui/core";

const styles = {
    paddingTop: "8px"
};

export default function DialogFormContentText(props) {

    return (
        <Typography variant="subtitle2" style={styles}>
            {props.children}
        </Typography>
    );

}