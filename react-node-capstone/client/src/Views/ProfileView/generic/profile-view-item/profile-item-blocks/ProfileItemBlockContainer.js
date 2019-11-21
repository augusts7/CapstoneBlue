import React from "react"
import Typography from "@material-ui/core/Typography";
import "./ProfileItemBlockStyles.css";
import Progress from "../../../../GenericViews/Progress/Progress";


export default function ProfileItemBlockContainer(props) {

    let title = props.title;

    return (
        <div className="container mdl-color--white">
            <Typography className="subtitle" color="secondary" gutterBottom>
                {title}
            </Typography>
            <Progress show={props.progress} />
            <Typography variant="subtitle2">
                {props.children}
            </Typography>
        </div>
    );

}


