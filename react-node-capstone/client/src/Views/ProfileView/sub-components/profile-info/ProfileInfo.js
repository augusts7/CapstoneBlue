import React from 'react';
import ImageAvatar from "../../generic-components/CustomAvatar";
import ProfileItemContainer from "../container/ProfileItemContainer";
import ProfileItemGenericBlock from "../container/profile-item-blocks/ProfileItemGenericBlock";


const titleStyle = {display: "flex", alignItems: "center"};


export default class ProfileInfo extends React.Component {

    constructor (props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }


    navigateTo = (navigationName) => {
        this.props.navigationHandler(navigationName);
    };

    layoutInfo = {
        blocks : [
            {
                title: "Basic Profile Info", items: [
                    {name: "First name", value: "Sanjeeb"},
                    {name: "Last name", value: "Sangraula"},
                    {name: "Email", value: "sanjeeb@ulm.edu"},
                    {name: "User Type", value: "sanjeeb@ulm.edu"},
                ]
            },
            {
                title: "Calendars", items: [
                    {
                        name: "Calendars Shared With me",
                        value: "View Received Calendars",
                        button: true,
                        onClick: () => this.navigateTo("receivedCalendars")
                    },
                    {
                        name: "Calendars Shared by me",
                        value: "View Shared Calendars",
                        button: true,
                        onClick: () => this.navigateTo("sharedCalendars")
                    },
                ]
            },
            {
                title: "Classes", items: [
                    {
                        name: "Classes Taken",
                        value: "View Classes",
                        button: true,
                        onClick: () => this.navigateTo("classesTaken")
                    },
                ]
            },
            {
                title: "Groups", items: [
                    {
                        name: "Current Groups",
                        value: "View Groups",
                        button: true,
                        onClick: () => this.navigateTo("currentGroups")
                    },
                ]
            },
        ],
        buttons : [
            {name: "Log Out", onClick: () => this.navigateTo("logOut")},
            {name: "Reset Password", onClick: () => this.navigateTo("resetPassword")}
        ],
        title : <Title />
    };

    render() {

        return (
            <ProfileItemContainer title={this.layoutInfo.title} buttons={this.layoutInfo.buttons}>
                {this.layoutInfo.blocks.map((block) => {
                    return <ProfileItemGenericBlock data={block}/>
                })}
            </ProfileItemContainer>
        );
    }
}

function Title () {

    return (
        <div style={titleStyle}>
            <ImageAvatar size="">S</ImageAvatar>
            <div>
                Sanjeeb Sangraula
            </div>
        </div>
    );
}