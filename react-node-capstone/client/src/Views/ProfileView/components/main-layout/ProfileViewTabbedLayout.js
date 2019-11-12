import React from "react";
import ClassesTaken from "../classes-taken/ClassesTaken";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import ProfileInfo from "../profile-info/ProfileInfo";
import CurrentGroups from "../current-groups/CurrentGroups";
import UploadStudents from "../upload-students/UploadStudents";
import Calendars from "../calendars/Calendars";
import ls from "local-storage";

import "./ProfileViewTabbedLayoutStyles.css"
import AddUsers from "../add-users/AddUsers";


export default function ProfileViewTabbedLayout(props) {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const userType = ls.get("user_type");

    const handleNavigationRequest = (navigateTo) => {
        switch (navigateTo) {
            case "sharedCalendars":
                setValue(2);
                break;
            case "receivedCalendars":
                setValue(1);
                break;
            case "currentGroups":
                setValue(4);
                break;
            case "classesTaken":
                setValue(3);
                break;
        }
    };

    const facultyOptionsTabs = [];
    facultyOptionsTabs.push(<Tab label="Add Users" {...a11yProps(5)} />);
    const facultyOptionsTabPanel = [];
    facultyOptionsTabPanel.push(
        <TabPanel value={value} index={5}>
            <div>
                <AddUsers />
            </div>
        </TabPanel>
    );

    return (
        <div className="ProfileViewTabbedLayout mdl-color--grey-200 flex-full ulm-library-image">

            <div>
                <div className="ProfileViewTabbedLayout-options mdl-shadow--8dp">

                    <Tabs orientation="vertical" value={value}
                          onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Profile" {...a11yProps(0)} />
                        <Tab label="Calendars" {...a11yProps(1)} />
                        <Tab label="Classes taken" {...a11yProps(2)} />
                        <Tab label="Current Groups" {...a11yProps(3)} />
                        <Tab label="Upload Students" {...a11yProps(4)} />
                        {facultyOptionsTabs}
                    </Tabs>
                </div>
            </div>
            <div className="center ProfileViewTabbedLayout-contents">

                <AppBar position="static" color="default">

                </AppBar>
                <TabPanel value={value} index={0}>
                    <div>
                        <ProfileInfo navigationHandler={handleNavigationRequest}/>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div>
                        <Calendars navigationHandler={handleNavigationRequest}/>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div>
                        <ClassesTaken/>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <div>
                        <CurrentGroups/>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <div>
                        <UploadStudents/>
                    </div>
                </TabPanel>
                {facultyOptionsTabPanel}
            </div>
        </div>
    );
}


function a11yProps(index) {

    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </Typography>
    );
}

