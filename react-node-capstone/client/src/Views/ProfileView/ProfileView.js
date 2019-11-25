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
import ls from "local-storage";
import CreatedUsersList from "./components/created-users/CreatedUsersList";

const tabContainerStyle = {marginBottom: "8px"};

export default class ProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tabValue: 0,
            user_type: ls.get("user_type", "")
        };
    }

    handleTabChange = (event, newValue) => {
        this.setState({tabValue: newValue});
    };

    render() {

        let title = "Profile";

        let createdUsersTab = [];
        let createdUsersTabPanel = [];

        if (this.state.user_type === "faculty") {
            createdUsersTab.push(<Tab label="Created Users" {...TabHelper.getTabProps(3)} />);
            createdUsersTabPanel.push(<TabPanel value={this.state.tabValue} index={3}>
                <CreatedUsersList/>
            </TabPanel>);
        }

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
                                    {createdUsersTab}
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
                            {createdUsersTabPanel}
                        </ProfileSectionContainer>


                    </div>
                </div>
            </div>

        );
    }
}





