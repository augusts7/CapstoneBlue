import React from 'react';
import TextField from '@material-ui/core/TextField';
import {post} from "../../../../api-helper/ApiHelper"
import CalendarFormBaseLayout from "../base-layout/BaseLayout";


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

            let data = {"calendarName": calName};

            post("/calendar", data, (res) => {

                if (res.success) {

                    handleClose();

                } else {
                    alert("Couldn't add");
                }
            });
        }
    };

    const buttons = [
        {name: "Cancel", onClick: handleClose},
        {name: "Add Calendar", onClick: handleSave}
    ];

    return (
        <CalendarFormBaseLayout open={props.open} buttons={buttons} onClose={handleClose} progress={progress}
                                title="Add New Calendar">
            <TextField
                fullWidth
                type="text"
                onChange={handleChange}
                value={calName}
                label={"Name"}
                margin="normal"/>
        </CalendarFormBaseLayout>
    );
}
