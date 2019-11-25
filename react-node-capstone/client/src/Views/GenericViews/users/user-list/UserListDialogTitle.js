import React from 'react';
import Typography from "@material-ui/core/Typography";
import UserListDialogSearch from "./UserListDialogSearch";

const titleContainerStyle = {marginBottom: "16px"};

export default function UserListDialogTitle(props) {


    return (
        <div>
            <div style={titleContainerStyle}>
                <Typography variant="h5">Select Users to Add</Typography>
            </div>

            <UserListDialogSearch onClearSearch={props.onClearSearch} onSearch={props.onSearch} />

        </div>
    );
}
