import React, {Fragment} from "react";
import UserListDialog from "./user-list/UserListDialog";
import Button from "@material-ui/core/Button";

export default function SendGroupMessage (props) {

    const [show, setShow] = React.useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    return (
        <Fragment>
            <SendGroupMessageDialog groupId={props.groupId} open={show} onClose={handleClose} />
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