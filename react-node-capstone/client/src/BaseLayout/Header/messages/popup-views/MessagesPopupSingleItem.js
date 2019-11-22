import React from 'react';
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CustomMenu from "../../../../Views/GenericViews/menu/Menu";
import CustomIconButton from "../../../../Views/GenericViews/IconButton";
import Icon from "@material-ui/core/Icon";
import DateTimeFormatter from "../../../../Views/CalenderView/utils/date-time-utils/DateTimeFormatter";

const containerStyle = {margin: "8px"};
const boldStyle = {fontWeight: "600"};

export default function MessagesPopupItem(props) {

    const [anchor, setAnchor] = React.useState(null);

    const handleMenuClick = (key) => {
        if (key === "delete") {
            props.onDelete();
            handleMenuClose();
        }
    };

    const handleMenuClose = () => {
        setAnchor(null);
    };

    const handleMenuButtonClick = (event) => {
        setAnchor(event.currentTarget);
    };

    const menuOptions = [
        {name: "Delete Calendar", key: "delete"}
    ];

    let date = DateTimeFormatter.formatDate(new Date());


    return (
        <div style={containerStyle}>
            <div className="flex">
                <div className="flex-main">
                    <div className="flex">
                        <Typography className="flex-main" gutterBottom>
                            Lon Smith
                        </Typography>
                        <Typography className="flex-sub" style={boldStyle} gutterBottom>
                            {date}
                        </Typography>
                    </div>

                    <Typography className="flex-main" gutterBottom>
                        About this group
                    </Typography>
                    <Typography color="textSecondary">
                        This group needs to have a meeting very soon
                    </Typography>
                </div>
                <div className="flex-sub">
                    <div>
                        <CustomIconButton onClick={handleMenuButtonClick}><Icon>more_vert</Icon></CustomIconButton>
                        <CustomMenu anchor={anchor} menuOptions={menuOptions} onClick={handleMenuClick} onClose={handleMenuClose} />
                    </div>
                </div>
            </div>
            <CardActions>
                <Button variant="outlined" color="primary">Delete</Button>
            </CardActions>
        </div>
    );

}
