import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from "../../generic-components/progress";
import { post } from "../../../../ApiHelper/ApiHelper"


const headerStyle = { "padding": "16px", "backgroundColor": "#01579B", "color": "white" };
const dialogTitleStyle = { "padding": "0px", "margin": "0px" };



export default function AddNewCalendarForm(props) {

    const [calName, setCalName] = React.useState('');
    const [progress, setProgress] = React.useState(false);

    const handleChange = (event) => {
        setCalName(event.target.value);
    };

    const handleClose = () => {
        props.onClose();
    };

    const handleSave = () => {
        if (calName.length > 0) {

            let data = { "calendarName": calName };

            post("/calendar", data, (res) => {

                if (res.success) {

                    handleClose();

                } else {
                    alert("Couldn't add");
                }
            });
        }
    };

    return (
        <Dialog fullWidth={true} open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle style={dialogTitleStyle} id="form-dialog-title">
                <div style={headerStyle}>
                    <div><h4>Add New Calendar</h4></div>
                </div>
            </DialogTitle>

            <Progress show={progress} />
            <DialogContent>
                <DialogContentText>
                    To create a New Calendar, you have to enter the name for your New Calendar.
                    </DialogContentText>
                <TextField
                    fullWidth
                    type="text"
                    onChange={handleChange}
                    value={calName}
                    label={"Enter Calendar Name"}
                    margin="normal" />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                    </Button>
                <Button onClick={handleSave} color="primary">
                    Add Calendar
                    </Button>
            </DialogActions>
        </Dialog>
    );
}
