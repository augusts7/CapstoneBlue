import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../../../styles/dialogs/dialog-with-colored-title.css";

const contentStyle = {padding: "32px 32px"};


export default function AlertDialogSlide(props) {

    const handleClose = () => {
        props.onClose();
    };

    const onDeleteFinishedCallback = () => {
        props.onClose();
    };

    const handleDeleteButtonClick = () => {
        props.onDelete(onDeleteFinishedCallback);
    };

    return (

        <Dialog
            className="dialog"
            open={props.open}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">

            <DialogTitle className="dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent className="dialog-white-content" style={contentStyle}>
                <DialogContentText>
                    {props.children}
                </DialogContentText>
            </DialogContent>
            <DialogActions className="dialog-grey-footer">
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDeleteButtonClick} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
