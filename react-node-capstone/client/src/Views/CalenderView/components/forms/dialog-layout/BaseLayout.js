import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from "../../../../../components/Container/Progress/Progress";
import "../../../styles/dialogs/dialog-with-colored-title.css";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CalendarFormBaseLayout (props) {

    return (
        <Dialog TransitionComponent={Transition} fullWidth={true} className="dialog" open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle className="dialog-title">
                <h4>{props.title}</h4>
            </DialogTitle>

            <Progress show={props.progress} />
            <DialogContent className="dialog-white-content styleScroll">
                <DialogContentText>
                    {props.text}
                </DialogContentText>

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
