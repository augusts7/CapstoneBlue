import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import UserListDialog from "../GenericViews/users/user-list/UserListDialog";
import { post } from "../../ApiHelper/ApiHelper";

export default function AddMultipleUsersFromList(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = allSelectedUsers => {
    const data = { users: allSelectedUsers, group_id: props.groupId };

    post("/my_groups/addMultipleUsers", data, res => {
      handleClose();
    });
  };

  console.log(props.groupId);

  return (
    <Fragment>
      <UserListDialog
        onSubmit={handleSubmit}
        groupId={props.groupId}
        open={show}
        onClose={handleClose}
      />
      <Button
        variant="contained"
        size="large"
        className="msgBtn2"
        onClick={handleShow}
      >
        <i className="material-icons">group_add</i>Select Users to add
      </Button>
    </Fragment>
  );
}
