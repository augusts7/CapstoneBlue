import React from 'react';
import TextField from '@material-ui/core/TextField';
import {post} from "../../../../../ApiHelper/ApiHelper"
import DialogForm from "../dialog-form/DialogForm";


export default function AddNewCalendarForm(props) {

    const [calName, setCalName] = React.useState('');
    const [progress] = React.useState(false);

    const handleChange = (event) => {
        setCalName(event.target.value);
    };

    const handleClose = () => {
        props.onClose();
    };

    const handleSave = () => {
        if (calName.length > 0) {

            let data = {"calendarName": calName};

            post("/calendar", data, (res) => {
                handleClose();
            });
        }
    };

    const buttons = [
        {name: "Cancel", onClick: handleClose},
        {name: "Submit", onClick: handleSave}
    ];

    return (
        <DialogForm fullWidth={false} open={props.open} buttons={buttons} onClose={handleClose} progress={progress}
                                title="Add New Calendar"
                                text="To add a new calendar, enter the name for the new calendar."
        >

            <TextField
                fullWidth
                autoFocus
                type="text"
                onChange={handleChange}
                value={calName}
                label={"Name"}
                margin="normal"/>
        </DialogForm>
    );
}
