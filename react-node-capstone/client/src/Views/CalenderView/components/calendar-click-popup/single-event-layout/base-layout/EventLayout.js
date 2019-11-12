import React from "react";
import "./EventLayout.css";
import Typography from '@material-ui/core/Typography';
import CustomMenu from "../../../../components/generic/Menu";
import CustomIconButton from "../../../../components/generic/IconButton";
import Icon from "@material-ui/core/Icon";
import Progress from "../../../../../../components/Container/Progress/Progress";
import DateTimeFormatter from "../../../../utils/date-time-utils/DateTimeFormatter";
import {makeUppercase} from "../../../../utils/string/StringUtils";

const GENERIC_MENU_OPTIONS = [
    {"name": "Delete Appointment", "key": "delete"},
    {"name": "Share Appointment", "key": "share"},
    {"name": "Edit Appointment", "key": "edit"},
];


export default class EventLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchor: null,

        };
    }

    onMenuClick = (key) => {
        if (this.props.onMenuClick) {
            this.props.onMenuClick(key);
        }
    };

    onMenuClose = () => {
        this.setState({anchor: null});
    };

    onMenuButtonClick = (event) => {
        this.setState({anchor: event.currentTarget});
    };

    getEventData = () => {
        if (!this.props.event) {
            return null;
        }
        let data = this.props.event;

        const start = new Date(data.start);
        const end = new Date(data.end);

        data.date = DateTimeFormatter.formatDate(start);
        data.startTime = DateTimeFormatter.formatTime(start);
        data.endTime = DateTimeFormatter.formatTime(end);
        data.eventType = makeUppercase(data.event_type);


        return data;
    };

    render() {

        let data = this.getEventData();

        if (data === null) {
            return (<div />);
        }

        let menuOptions = GENERIC_MENU_OPTIONS;
        if (this.props.menuOptions) {
            menuOptions = this.props.menuOptions;
        }

        return (
            <div className="event-layout-root">
                <Progress show={this.props.progress}/>

                <Typography className="event-layout-header flex" color="white" gutterBottom>
                    <div className="flex flex-main">
                        <div className="flex-main">{data.date}</div>
                        <div className="flex-sub flex">
                            <div className="start-time">{data.startTime}</div>
                            <div className="end-time">{data.endTime}</div>
                        </div>
                    </div>
                    <div className="flex-sub">
                        <CustomIconButton onClick={this.onMenuButtonClick}
                                          onClose={this.onMenuClose}><Icon>more_vert</Icon></CustomIconButton>
                    </div>

                </Typography>
                <CustomMenu fullWidth={true} anchor={this.state.anchor} menuOptions={menuOptions}
                            onClick={this.onMenuClick} onClose={this.onMenuClose}/>
                <div className="event-layout-contents">
                    <div className="flex">
                        <Typography className="flex-main" variant="subtitle2">
                            {data.title}
                        </Typography>
                        <Typography className="flex-sub" color="textSecondary">
                            {data.eventType}
                        </Typography>
                    </div>

                    <Typography variant="body2">
                        {data.description}
                    </Typography>
                </div>
                <div className="event-buttons">
                    {this.props.buttons}
                </div>
            </div>
        );
    }

};

