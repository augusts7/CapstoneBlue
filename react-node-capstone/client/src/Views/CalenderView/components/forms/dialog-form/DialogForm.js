import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from "../../../../../components/Container/Progress/Progress";
import "../../../../../Application/styles/dialogs/dialog.css";
import Slide from "@material-ui/core/Slide";
import {Typography} from "@material-ui/core";
import DialogFormContentText from "./DialogFormContentText";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogForm(props) {

    let fullWidth = true;
    if (props.fullWidth === false){
        fullWidth = false;
    }

    return (
        <Dialog TransitionComponent={Transition} fullWidth={fullWidth} className="dialog" open={props.open}
                onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle className="dialog-title">
                {props.title}
            </DialogTitle>

            <Progress show={props.progress}/>
            <DialogContent className="dialog-white-content styleScroll">
                <DialogFormContentText>
                    {props.text}
                </DialogFormContentText>

                {props.children}

            </DialogContent>
            <DialogActions className="dialog-grey-footer">
                {props.buttons.map(btn => (
                    <Button onClick={btn.onClick} color="primary">
                        {btn.name}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    );
}
