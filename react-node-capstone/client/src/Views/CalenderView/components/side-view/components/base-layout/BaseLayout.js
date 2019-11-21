import React from 'react';
import IconButton from '../../../../../GenericViews/IconButton';
import Icon from '@material-ui/core/Icon';
import Progress from '../../../../../GenericViews/Progress/Progress';
import Typography from "@material-ui/core/Typography";


const expandIcons = {"show": "keyboard_arrow_up", "hide": "keyboard_arrow_down"};


export default function BaseLayout (props) {

    const [showContents, setShowContents] = React.useState(true);

    let body = null;
    if (showContents) {
        body = props.children;
    }

    let expandIcon = showContents === true ? expandIcons.show : expandIcons.hide;

    const toggleShow = () => {
        setShowContents(!showContents);
    };

    return (
        <div className="filterItemContainer">
            <div className="filterItemTitleContainer">

                <div className="filterItemTitleText"><Typography variant="subtitle1" color="secondary">{props.title}</Typography></div>

                <div className="filterItemTitleActionsContainer">
                    {props.headerIcon}
                    <div><IconButton onClick={toggleShow}><Icon>{expandIcon}</Icon></IconButton></div>
                </div>

            </div>
            <Progress show={props.isLoading}/>
            <div className="mdl-color--white">
                {body}
            </div>
        </div>
    );
}