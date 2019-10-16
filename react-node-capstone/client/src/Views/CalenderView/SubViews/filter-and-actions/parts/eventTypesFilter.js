import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import EventTypesData from "../../../Data/EventTypesData";



export default class EventTypesFilter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "advisingSlots": false,
            "attendingEvents": true,
            "createdEvents": false,
            "requestedAppointments": false,
            "approvedAppointments": false,
        };

        this.onDisplayEventTypesChange = this.onDisplayEventTypesChange.bind(this);
        this.handleEventTypesChange = this.handleEventTypesChange.bind(this);
    }


    onDisplayEventTypesChange() {
        this.props.onChangeCalendarData("eventTypes", this.state);
    }
      

    handleEventTypesChange (name, event) {

        var newState = {};

        newState[name] = event.target.checked;

        this.setState(newState, () => this.onDisplayEventTypesChange(this.state));

       
        console.log(newState);
    }


    render() {

        let classes = makeStyles(theme => ({
            root: {
                width: '100%',
            },
            heading: {
                fontSize: theme.typography.pxToRem(15),
                fontWeight: theme.typography.fontWeightRegular,
            }
        }));
        

        return (

            <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">

                    <Typography className={classes.heading}>Select Event Types to Display</Typography>

                </ExpansionPanelSummary>

                <ExpansionPanelDetails >

                    <div style={{ width: "100%" }}>


                        {EventTypesData.eventTypesMenuOptions.map(option => {
                            return (<div key={option.value}><Checkbox
                                onChange={(event) => this.handleEventTypesChange(option.value, event)}
                                color="primary"
                                checked={this.state[option.value]}
                                inputProps={{
                                    'aria-label': 'secondary checkbox',
                                }} />
                                {option.name}
                            </div>);
                        })}

                    </div>



                </ExpansionPanelDetails>
            </ExpansionPanel>

        );
    }

}
