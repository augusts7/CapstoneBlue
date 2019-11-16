import React from "react";
import ProfileItemBlockContainer
    from "../../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";
import {get} from "../../../../../ApiHelper/ApiHelper";
import CalendarsSharedByMeSingleRow from "./CalendarsSharedByMeSingleRow";
import LengthValidator from "../../../../../utils/length-utils/LengthValidator";

export default class CalendarsSharedByMe extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            calendars: []
        };

    }


    componentDidMount() {
        get("/calendar/sharedByMe", (res) => {

        });
    }

    render() {

        let calendars = [];

        if (LengthValidator.isNotEmpty(this.state.calendars)) {
            this.state.calendars.forEach((calendar) => {
                calendars.push(<CalendarsSharedByMeSingleRow data={calendar}/>);
            });
        }

        return (
            <ProfileItemBlockContainer title="Calendars Shared By Me">
                {calendars}
            </ProfileItemBlockContainer>
        );
    }
}
