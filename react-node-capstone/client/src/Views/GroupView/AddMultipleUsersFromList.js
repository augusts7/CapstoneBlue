import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import UserListDialog from "./user-list/UserListDialog";

export default function AddMultipleUsersFromList (props) {

    const [show, setShow] = React.useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    console.log(props.groupId);

    return (
        <Fragment>
            <UserListDialog groupId={props.groupId} open={show} onClose={handleClose} />
            <Button
                variant="contained"
                size="large"
                className="msgBtn2"
                onClick={handleShow}>
                <i className="material-icons">group_add</i>Select Users to add
            </Button>
        </Fragment>
    );
}