import React from 'react';
import {TextField, Typography} from "@material-ui/core";
import CustomIconButton from "../../CalenderView/components/generic/IconButton";
import Icon from "@material-ui/core/Icon";

const textAreaStyles = {
    width: "100%"
};

export default function UserListDialogTitle(props) {

    const [showSearch, setShowSearch] = React.useState(false);

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    if (showSearch === true) {
        return (<SearchEnabledView toggleSearch={toggleSearch}/>);
    } else {
        return (<DefaultView search={props.handleSearch} toggleSearch={toggleSearch}/>);
    }
}

function SearchEnabledView(props) {
    return (
        <div className="flex-row">
            <div className="flex-main">
                <TextField
                    id="standard-basic"
                    style={textAreaStyles}
                    label="Standard"
                    margin="normal"
                />
            </div>
            <div className="flex-sub">
                <CustomIconButton onClick={props.search}><Icon>done</Icon></CustomIconButton>
                <CustomIconButton onClick={props.toggleSearch}><Icon>close</Icon></CustomIconButton>
            </div>
        </div>
    );
}

function DefaultView(props) {
    return (
        <div className="flex-row">
            <div className="flex-main">
                <Typography variant="h5">Select Users to Add</Typography>
            </div>
            <div className="flex-sub">
                <CustomIconButton onClick={props.toggleSearch}><Icon>search</Icon></CustomIconButton>
            </div>
        </div>
    );
}