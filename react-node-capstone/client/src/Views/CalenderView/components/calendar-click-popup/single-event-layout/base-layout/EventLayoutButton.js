import React from "react";
import MaterialButton from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon";
import createSvgIcon from "@material-ui/icons/utils/createSvgIcon";

const buttonContainerStyle = {"display": "inline-block", "marginLeft": "4px"};
const buttonStyle = {"padding": "4px", "backgroundColor": "#455A64", "color": "white"};
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