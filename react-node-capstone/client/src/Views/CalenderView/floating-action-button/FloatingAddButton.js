import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from '@material-ui/core/Tooltip';
import CalendarActionsContext from "../context/CalendarActionsContext";

const buttonStyle = {
    position: "fixed",
    display: "block",
    right: "0", bottom: "0",
    marginRight: "40px",
    marginBottom: "40px",
    zIndex: "900"
};

export default class FloatingAddButton extends React.Component {

    render() {

        const handleClick = () => {
            this.context.showAddAppointmentForm();
        };

        return (
            <div style={buttonStyle}>

                <Tooltip title="Add Event or Appointment" aria-label="add">
                    <Fab onClick={handleClick} color="secondary">
                        <AddIcon/>
                    </Fab>
                </Tooltip>
            </div>
        );
    }
}
FloatingAddButton.contextType = CalendarActionsContext;