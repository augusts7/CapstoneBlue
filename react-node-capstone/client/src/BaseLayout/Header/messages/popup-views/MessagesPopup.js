import React from "react";
import Popover from '@material-ui/core/Popover';
import Progress from "../../../../Views/GenericViews/Progress/Progress";
import MessagesPopupItem from "./MessagesPopupSingleItem";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";
import {Typography} from "@material-ui/core";


const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
};

const transformOrigin = {
    vertical: 'top',
    horizontal: 'center',
};

const containerStyle = {
    backgroundColor: "white",
    "padding": "8px",
    width: window.innerWidth * 0.4,
    maxHeight: window.innerHeight * 0.7
};

const titleStyle = {
    padding: "16px"
};

export default function MessagesPopup(props) {


    let allMessages = [];
    if (LengthValidator.isNotEmpty(props.allMessages)) {
        props.allMessages.forEach((message) => {
            allMessages.push(<MessagesPopupItem onRemoveItem={props.onDeleteItem} message={message}/>);
        });
    }
    return (
        <div>
            <Popover
                open={Boolean(props.anchor)}
                anchorEl={props.anchor}
                onClose={props.onClose}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}>

                <div>

                    <div className="maroon mdl-color-text--white" style={titleStyle}>
                        <Typography variant="h6">Messages</Typography>
                    </div>

                <div className="mdl-color--grey-50 styleScroll" style={containerStyle}>

                    <Progress show={props.progress}/>
                    {allMessages}
                </div>
                </div>

            </Popover>
        </div>
    );

}