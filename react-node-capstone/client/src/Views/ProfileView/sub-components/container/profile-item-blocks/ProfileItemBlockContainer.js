import React from "react"
import Typography from "@material-ui/core/Typography";
import "./ProfileItemBlockStyles.css";


export default function ProfileItemBlockContainer(props) {

    let title = props.title;

    return (
        <div className="container mdl-color--white">
            <Typography className="subtitle" color="primary" gutterBottom>
                {title}
            </Typography>
            <Typography variant="subtitle2">
                {props.children}
            </Typography>
        </div>
    );

}


