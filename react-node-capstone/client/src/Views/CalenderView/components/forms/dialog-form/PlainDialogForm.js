import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from "../../../../GenericViews/Progress/Progress";
import Slide from "@material-ui/core/Slide";
import DialogFormContentText from "./DialogFormContentText";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogForm(props) {

    return (
        <Dialog TransitionComponent={Transition} fullWidth={true} open={props.open}
                onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle>
                <h5>{props.title}</h5>
            </DialogTitle>

            <Progress show={props.progress}/>
            <DialogContent className="styleScroll">
                <DialogFormContentText>
                    {props.text}
                </DialogFormContentText>

                {props.children}

            </DialogContent>
            <DialogActions>
                {props.buttons.map(btn => (
                    <Button onClick={btn.onClick} color="primary">
                        {btn.name}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    );
}
