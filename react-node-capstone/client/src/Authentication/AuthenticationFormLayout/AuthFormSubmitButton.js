import React from "react";
import Button from "../../components/Button/Button";

const buttonStyle = { marginTop: "16px", paddingLeft: "16px", paddingRight: "32px" };
const iconStyle = {marginRight: "8px"};


export default function AuthFormSubmitButton (props) {

    let icon = null;

    if (props.icon) {
        icon = <i style={iconStyle} className="material-icons">{props.icon}</i>;
    }

    return (
        <div>
            <Button disabled={props.disabled} role="main" type="submit" style={buttonStyle}>{icon}{props.children}</Button>
        </div>
    );
}