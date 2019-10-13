import React from "react";
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Header from "../../parts/Header";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';


const commonData = {
    smallCardStyle: { "overflowY": "scroll", "height": window.innerHeight * 0.35 },
    listItemStyle: { "background": "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)" },
    links: [
        { "name": "Add Appointment", "link": "/appointment/add" },
        { "name": "Modify Appointment", "link": "/appointment/modify" },
        { "name": "Share Calendar", "link": "/calendar/share" },
        { "name": "Export Calendar", "link": "/calendar/export" }
    ]
};


export default function Actions(props) {


    let links = [];

    if (props.userType === "faculty") {
        links.push({ "name": "Create Advising Slots", "link": "/advisingSlots/add" });

    } else {
        links.push({ "name": "Sign up for Advising", "link": "/advisingSlots/view" });

    }
    links = links.concat(commonData.links);

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
        <div className="calendarView_side_card">


            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">

                    <Typography className={classes.heading}>View all Actions</Typography>

                </ExpansionPanelSummary>

                <ExpansionPanelDetails >

                    <div style={{ width: "100%" }}>


                        <List component="nav">
                            {links.map(link => {
                                return (
                                    <ListItem style={commonData.listItemStyle} button>
                                        <Link to={link.link}><ListItemText primary={link.name} /></Link>
                                    </ListItem>);
                            })}
                        </List>

                    </div>



                </ExpansionPanelDetails>
            </ExpansionPanel>

           

        </div>

    );

}