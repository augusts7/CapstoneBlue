import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from "../../../components/Container/Progress/Progress";
import Slide from "@material-ui/core/Slide";
import {get, post} from "../../../ApiHelper/ApiHelper";
import SingleItemInUserList from "./SingleItemInUserList";
import UserListDialogTitle from "./UserListDialogTitle";
import LengthValidator from "../../../utils/length-utils/LengthValidator";
import ArrayToggleUtills from "../../../utils/array-utils/ArrayToggleHelper";
import ArraySearchHelper from "../../../utils/array-utils/ArraySearchHelper";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default class DialogForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            progress: false,
            allUsers: [],
            displayedUsers: [],
            selectedUsers: []
        };
    }

    componentDidMount() {
        this.loadAllUsers();
    }

    loadAllUsers = () => {
        let url = "user_info/userList";
        this.setState({progress: true});
        get(url, (res) => {
            this.setState({"allUsers": res.results, "displayedUsers": res.results, "progress": false});
            console.log(res.results);
        });
    };


    handleSubmit = () => {
        const data = {};
        post("/groups/createMultiple", data, res => {

        });
    };

    toggleUserChecked = (userId) => {
        let newSelectedUsers = ArrayToggleUtills.toggleStringValue(this.state.selectedUsers, userId);
        this.setState({selectedUsers: newSelectedUsers});
    };

    getAllUsers() {

        if (LengthValidator.isEmpty(this.state.displayedUsers)) {
            return (<div/>);
        }

        let displayedUsers = [];

        this.state.displayedUsers.forEach((user) => {
            displayedUsers.push(<SingleItemInUserList user={user} toggleChecked={this.toggleUserChecked}/>);
        });

        return displayedUsers;
    }

    handleSearch = (text) => {
        let results = ArraySearchHelper.search(this.state.allUsers, text, (user) => {
            return user.first_name.toUpperCase() + " " + user.last_name.toUpperCase();
        });

        this.setState({displayedUsers: results});
    };

    handleClearSearch = () => {
        this.setState({displayedUsers: this.state.allUsers});
    };

    render() {

        const allUsers = this.getAllUsers();

        return (
            <Dialog TransitionComponent={Transition} fullWidth={true} open={this.props.open}
                    onClose={this.props.onClose} aria-labelledby="form-dialog-title">

                <DialogTitle>
                    <UserListDialogTitle onClearSearch={this.handleClearSearch} onSearch={this.handleSearch}/>
                </DialogTitle>

                <Progress show={this.state.progress}/>
                <DialogContent className="styleScroll">

                    <DialogContentText>
                        Select all the user to add to this group.
                    </DialogContentText>

                    {allUsers}

                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.props.onClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}