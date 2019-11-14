import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import UserListDialog from "./user-list/UserListDialog";
import DialogForm from "../CalenderView/components/forms/dialog-form/DialogForm";

export default function AddMultipleUsersFromList (props) {

    const [show, setShow] = React.useState(false);

    const handleToggle = () => {
        setShow(!show);
    };

    return (
        <Fragment>
            <UserListDialog open={show} onClose={handleToggle} />
            <Button
                variant="contained"
                size="large"
                className="msgBtn2"
                onClick={handleToggle}
            >
                <i className="material-icons">group_add</i>Select Users to add
            </Button>
        </Fragment>
    );
}