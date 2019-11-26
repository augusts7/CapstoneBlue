import React from "react";
import "./ProfileItemGridRow.css";
import SingleItemInProfileGrid from "./SingleItemInProfileGrid";
import CustomMenu from "../../../GenericViews/menu/Menu";
import CustomIconButton from "../../../GenericViews/IconButton";
import Icon from "@material-ui/core/Icon";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";

export default function ProfileItemGridRow (props) {

    const [anchor, setAnchor] = React.useState(null);

    const handleMenuClick = (key) => {
        if (LengthValidator.isNotEmpty(props.onMenuClick)) {
            return props.onMenuClick(key, props.data.id);
        }
        if (key === "delete") {
            props.onDelete(props.data.id);
            handleMenuClose();
        }
    };

    const handleMenuClose = () => {
        setAnchor(null);
    };

    const handleMenuButtonClick = (event) => {
        setAnchor(event.currentTarget);
    };

    let menuOptions = [
        {name: "Delete List Item", key: "delete"}
    ];

    if (LengthValidator.isNotEmpty(props.menuOptions)) {
        menuOptions = props.menuOptions;
    }


    return (
        <div className="profile-item-wrapper">
            <div className="profile-item-container">
                {props.children}
                <div>
                    <CustomIconButton onClick={handleMenuButtonClick}><Icon>more_vert</Icon></CustomIconButton>
                    <CustomMenu anchor={anchor} menuOptions={menuOptions} onClick={handleMenuClick} onClose={handleMenuClose} />
                </div>
            </div>
        </div>
    );
}

