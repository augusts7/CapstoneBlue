import React from "react";
import {Typography} from "@material-ui/core";

const styles= {
    containerStyle: {height: "84px", display: "flex", alignItems: "center", justifyContent: "center"},
};

export default function HeaderView(props) {


    return (
        <div className="mdl-color--white mdl-shadow--2dp" style={styles.containerStyle}>
            <Typography variant="h6">Calendar Options</Typography>
        </div>
    );
}