import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from "../../../components/Container/Progress/Progress";
import Slide from "@material-ui/core/Slide";
import {get} from "../../../ApiHelper/ApiHelper";
import UserListDialogTitle from "./UserListDialogTitle";
import SingleItemInUserList from "./SingleItemInUserList";

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
        };
    }

    componentDidMount() {
        this.loadAllUsers();
    }

    loadAllUsers = () => {
        let url = "user_info/userList";
        this.setState({progress: true});
        get(url, (res) => {
            this.setState({"allUsers": res.results, "displayedUser": res.results, "progress": false});
            alert("Hey  " + res.message);
            console.log(res.results);
        });
    };


    handleSubmit = () => {

    };

    toggleUserChecked = () => {

    };

    getAllUsers() {
        if (this.state.allUsers === undefined || this.state.allUsers === null || this.state.allUsers.length === 0) {
            return (<div/>);
        }

        let allUsers = [];

        this.state.allUsers.forEach((user) => {
            allUsers.push(<SingleItemInUserList user={user} toggleChecked={this.toggleUserChecked}/>);
        });

        return allUsers;
    }

    handleSearch = (text) => {
        let results = [];
        if (this.state.allUsers === undefined || this.state.allUsers === null || this.state.allUsers.length === 0 || text === undefined || text === null || text.length === 0) {
            return false;
        }
        this.state.allUsers.forEach((user) => {
            let value = user.first_name.toUpperCase() + " " + user.last_name.toUpperCase();
            let searchText = text.toUpperCase();
            if (value.contains(searchText)) {
                results.push(user);
            }
        });
        this.setState({displayedUsers: results});
    };

    render() {

        const allUsers = this.getAllUsers();

        return (
            <Dialog TransitionComponent={Transition} fullWidth={true} open={this.props.open}
                    onClose={this.props.onClose} aria-labelledby="form-dialog-title">

                <DialogTitle>
                    <UserListDialogTitle handleSearch={this.handleSearch}/>
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