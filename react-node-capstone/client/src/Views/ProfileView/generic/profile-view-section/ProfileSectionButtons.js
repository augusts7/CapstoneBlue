import React from "react";
import CardActions from "@material-ui/core/CardActions";
import ProfileViewSectionButton from "../buttons/ProfileViewSectionButton";


export default function ProfileSectionButtons(props) {

    if (props.buttons === undefined || props.buttons === null || props.buttons.length < 1) {
        return (<div/>);
    }

    return (
        <CardActions>
            {props.buttons.map((btn) => {
                return (
                    <ProfileViewSectionButton onClick={btn.onClick}>
                        {btn.name}
                    </ProfileViewSectionButton>
                );
            })}
        </CardActions>
    );
}