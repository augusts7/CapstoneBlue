import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import UserListDialog from "../../../../GenericViews/users/user-list/UserListDialog";

const buttonStyle = {marginTop: "8px", marginBottom: "8px"};
const buttonContainerStyle = {width: "100%", display: "flex", alignItems: "flex-end"};

export default class AllUsersList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false
        };
    }

    handleClose = () => {
        this.setState({show: false});
    };

    handleShow = () => {
        this.setState({show: true});
    };


    handleSubmit = (allSelectedUsers) => {
        this.setState({show: false});
        this.props.onSubmit(allSelectedUsers);
    };

    render() {


        return (
            <Fragment>
                <UserListDialog onSubmit={this.handleSubmit} open={this.state.show} onClose={this.handleClose}/>
                <div style={buttonContainerStyle}>
                    <Button
                        style={buttonStyle}
                        color="primary"
                        onClick={this.handleShow}>
                        Select users to invite
                    </Button>
                </div>
            </Fragment>
        );
    }

}