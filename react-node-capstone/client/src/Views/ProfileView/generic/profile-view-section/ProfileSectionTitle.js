import React from "react";
import Typography from "@material-ui/core/Typography";


const titleContainerStyle = {paddingLeft: "16px", paddingTop: "16px", paddingBottom: "8px"};

export default function ProfileSectionTitle (props) {

    if (props.children === undefined || props.children === null || props.children.length < 1) {
        return (<div />)
    }

    return (
        <Typography gutterBottom variant="h5" component="h2">
            <div style={titleContainerStyle}>
                {props.children}
            </div>
        </Typography>
    );
}