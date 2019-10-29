import React from "react"
import Typography from "@material-ui/core/Typography";

const iconStyle = {marginRight: "8px"};

export default function BaseLayout(props) {


    return (
        <div className="mdl-grid">
            <div
                className="mdl-cell mdl-cell--8-col profile-view-base-layout mdl-shadow--2dp center">
                <div className="item-title flex">
                    <div className="flex-sub"><i style={iconStyle} className="mdl-color-text--indigo-900 material-icons">{props.icon}</i></div>
                    <div className="flex-main">
                        <Typography variant="h5">
                            {props.title}
                        </Typography>
                    </div>
                </div>
                <div className="mdl-color--white">
                    {props.children}
                </div>
            </div>
        </div>

    );
}