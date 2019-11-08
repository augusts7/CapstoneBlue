import React from "react";
import ProfileItemContainer from "../container/ProfileItemContainer";
import CalendarsSharedWithMe from "./shared-with-me/CalendarsSharedWithMe";
import CalendarsSharedByMe from "./shared-by-me/CalendarsSharedByMe";


export default function Calendars(props) {



    return (

        <ProfileItemContainer title="Calendars">
            <CalendarsSharedWithMe />
            <CalendarsSharedByMe />
        </ProfileItemContainer>
    );
}
