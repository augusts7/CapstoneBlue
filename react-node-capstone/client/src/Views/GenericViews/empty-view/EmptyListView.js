import React from "react";
import {Typography} from "@material-ui/core";
import "./empty_list_image.jpg";
import "./EmptyListView.css";

const containerStyle = {height: 0.4 * window.innerHeight};

export default function EmptyListView (props) {

    return (
        <div className="empty-image empty-list-view-container" style={containerStyle}>

            <Typography variant="subtitle2" color="textSecondary">{props.message}</Typography>
        </div>
    );
}