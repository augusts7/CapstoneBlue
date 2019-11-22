import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import CreateGroupFromFile from "../GenericViews/users/user-list-from-file/CreateGroupFromFile";

export default function AddMultipleUsersFromFile (props) {

    const [show, setShow] = React.useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    return (
        <Fragment>
            <CreateGroupFromFile groupId={props.groupId} open={show} onClose={handleClose} />
            <Button
                variant="contained"
                size="large"
                className="msgBtn2"
                onClick={handleShow}>
                <i className="material-icons">group_add</i>Upload Users from file
            </Button>
        </Fragment>
    );
}