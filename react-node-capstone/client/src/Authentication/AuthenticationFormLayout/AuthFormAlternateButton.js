import React from "react";
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button";


const styles = {
    root: {
        border: "0.5px solid #1976D2",
        backgroundColor: "#1565C0",
        color: "white",
        padding: "24px 8px 8px 8px",
        margin: "24px 0px 0px 0px"
    },
    textContainer: {display: "flex", justifyContent: "center", marginBottom: "16px"},
    buttonContainer: {display: "flex", justifyContent: "center"},
    button: {paddingLeft: "816x", paddingRight: "32px"}
};

export default function AuthFormAlternateButton(props) {

    let actionLinkText = props.text;
    let actionLink = props.link;

    return (

        <div className="mdl-shadow--4dp" style={styles.root}>

            <div style={styles.textContainer}>
                {actionLinkText}
            </div>

            <div style={styles.buttonContainer}>
                <Link to={actionLink}>
                    <Button role="main" style={styles.button}>{props.children}</Button>
                </Link>
            </div>
        </div>
    );
}