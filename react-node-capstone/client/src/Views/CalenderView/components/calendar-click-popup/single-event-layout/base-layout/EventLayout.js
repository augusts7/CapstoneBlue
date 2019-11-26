import React from "react";
import "./EventLayout.css";
import Typography from '@material-ui/core/Typography';
import CustomMenu from "../../../../../GenericViews/menu/Menu";
import CustomIconButton from "../../../../../GenericViews/IconButton";
import Icon from "@material-ui/core/Icon";
import Progress from "../../../../../GenericViews/Progress/Progress";
import DateTimeFormatter from "../../../../utils/date-time-utils/DateTimeFormatter";
import {makeUppercase} from "../../../../utils/string/StringUtils";


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
            return (<div/>);
        }

        let menu = [];
        if (this.props.menuOptions) {
            menu.push(
                <div className="flex-sub">
                    <CustomIconButton onClick={this.onMenuButtonClick}
                                      onClose={this.onMenuClose}><Icon>more_vert</Icon></CustomIconButton>
                    <CustomMenu fullWidth={true} anchor={this.state.anchor} menuOptions={this.props.menuOptions}
                                onClick={this.onMenuClick} onClose={this.onMenuClose}/>
                </div>
            );
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

                    {menu}
                </Typography>

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

