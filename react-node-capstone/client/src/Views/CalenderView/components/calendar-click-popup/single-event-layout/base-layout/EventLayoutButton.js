import React from "react";
import MaterialButton from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon";

const buttonContainerStyle = {"display": "inline-block", "marginLeft": "4px"};
const iconStyle = {marginRight : "8px", color: "#0091EA"};

export default function EventLayoutButton(props) {

    let icon = null;
    if (props.icon) {
        icon = <Icon style={iconStyle}>{props.icon}</Icon>;
    }

    return (
        <div style={buttonContainerStyle}>
            <MaterialButton variant="outlined" color="primary" onClick={props.onClick}>
                {icon}
                {props.children}
            </MaterialButton>
        </div>

    );
}