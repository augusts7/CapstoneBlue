import React from "react"
import {Typography} from "@material-ui/core";
import CustomIconButton from "../../../../CalenderView/components/generic/IconButton";


export default function ProfileCardListItemButton(props) {

    return (
        <div className={props.className} onClick={props.onClick}>
            <Typography variant="subtitle2">
                {props.children}<CustomIconButton><i className="material-icons">launch</i></CustomIconButton>
            </Typography>
        </div>

    );
}