import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import ProfileSectionTitle from "./ProfileSectionTitle";
import ProfileItemButtons from "./ProfileSectionButtons";


const useStyles = makeStyles({
    card: {
        width: "100%"
    },
    media: {
        height: 140,
    },
});

const containerStyle = {paddingBottom: "8px", marginBottom: "16px"};

export default function ProfileSectionContainer(props) {

    const classes = useStyles();

    let className = classes.card;
    if (props.isContinuingBlock === true) {

    } else {
        className += " mdl-shadow--8dp mdl-color--grey-200";
    }

    return (
        <div style={containerStyle} className={className}>

            <CardContent>

                <ProfileSectionTitle>{props.title}</ProfileSectionTitle>

                <ProfileItemButtons buttons={props.buttons} />
                {props.children}
            </CardContent>

        </div>
    );
}