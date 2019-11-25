import React from "react";
import ProfileSideBar from "./components/side-view/ProfileSideBar";
import ProfileSectionContainer from "./generic/profile-view-section/ProfileSectionContainer";
import CalendarsSharedWithMe from "./components/calendars/shared-with-me/CalendarsSharedWithMe";
import CalendarsSharedByMe from "./components/calendars/shared-by-me/CalendarsSharedByMe";
import ClassesTaken from "./components/classes-taken/ClassesTaken";
import "./ProfileView.css";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TabPanel from "../GenericViews/tabs/TabPanel";
import TabHelper from "../GenericViews/tabs/TabHelper";

const tabContainerStyle = {marginBottom: "8px"};

export default class ProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tabValue: 0
        };
    }

    handleTabChange = (event, newValue) => {
        this.setState({tabValue: newValue});
    };

    render() {

        return (
            <div className="flex-full ulm-library-image">

                <div className="ProfileViewTabbedLayout">

                    <div className="ProfileViewTabbedLayout-Sidebar">
                        <ProfileSideBar/>
                    </div>
                    <div className="center ProfileViewTabbedLayout-contents">

                        <ProfileSectionContainer title="Profile Information">

                            <div style={tabContainerStyle}>
                                <Tabs indicatorColor="primary" textColor="primary" variant="scrollable" scrollButtons="auto" name="tabValue"
                                      value={this.state.tabValue}
                                      onChange={this.handleTabChange} aria-label="simple tabs example">
                                    <Tab label="Calendars Shared With Me" {...TabHelper.getTabProps(0)} />
                                    <Tab label="Calendars Shared By Me" {...TabHelper.getTabProps(1)} />
                                    <Tab label="Courses Taken" {...TabHelper.getTabProps(2)} />
                                </Tabs>
                            </div>

                            <TabPanel value={this.state.tabValue} index={0}>
                                <CalendarsSharedWithMe/>
                            </TabPanel>
                            <TabPanel value={this.state.tabValue} index={1}>
                                <CalendarsSharedByMe/>
                            </TabPanel>
                            <TabPanel value={this.state.tabValue} index={2}>
                                <ClassesTaken/>
                            </TabPanel>

                        </ProfileSectionContainer>


                    </div>
                </div>
            </div>

        );
    }
}





