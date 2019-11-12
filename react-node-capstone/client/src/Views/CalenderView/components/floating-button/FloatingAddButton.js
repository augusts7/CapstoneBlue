import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from '@material-ui/core/Tooltip';
import CalendarActionsContext from "../../context/CalendarActionsContext";

const buttonStyle = {
    position: "fixed",
    display: "block",
    right: "0", bottom: "0",
    marginRight: "40px",
    marginBottom: "40px",
    zIndex: "900"
};

const textStyle = {marginLeft: "8px"};

export default class FloatingAddButton extends React.Component {

    render() {

        const handleClick = () => {
            this.context.showAddAppointmentForm();
        };

        return (
            <div style={buttonStyle}>

                <Tooltip enterDelay={600} leaveDelay={100} title="Add Event or Appointment" aria-label="add">
                    <Fab variant="extended" onClick={handleClick} color="primary" size="large">
                        <AddIcon/><span style={textStyle}>Add</span>
                    </Fab>
                </Tooltip>
            </div>
        );
    }
}
FloatingAddButton.contextType = CalendarActionsContext;