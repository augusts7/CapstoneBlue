import React, { Fragment } from "react";
import { TextField, Menu, MenuItem, InputLabel, makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import UserContext from "../../Context/UserContext";
import { isNullOrUndefined } from "util";

class EditGroup extends React.Component {
    static contextType = UserContext;
    
    

    constructor(props) {
        super(props); 
        this.state = {
            value: 0,
            groupName: "",
            user_id: this.props.creator_id,
            groupID: this.props.groupID,
            groupMembers: this.props.groupMembers,
            open: true
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleGroupName = this.handleGroupName.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editGroup = this.editGroup.bind(this);
    }

    handleToggle = () => {
        this.setState({
          open: !this.state.open
        });
    };


    handleChange(e) {
        this.setState( {value: e.target.value} );
    }

    handleGroupName(e) {
        this.setState( {groupName: e.target.value} );
      }

    editGroup() {
        if ((this.state.groupName !== isNullOrUndefined) && (this.state.groupName !== "")) {
            console.log('test1');
            fetch("/groups/editGroupName", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    groupID: this.state.groupID,
                    groupName: this.state.groupName
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(body) {
            console.log(body);
            });
        }
        if ((this.state.user_id !== this.state.value) && (this.state.value !== 0)) {
            console.log('test2');
            fetch("groups/editGroupOwner", {
                method: "POST",
                headers: {
                    Accept: "applciation/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    groupID: this.state.groupID,
                    newOwnerID: this.state.value
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(body) {
                console.log(body);
            });
        }
        this.handleToggle();
    }
    
    render () {
        const useStyles = makeStyles(theme => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        }));   

       const { open } = this.state;
       let name = "";
        return(
            <Fragment>
                <MenuItem
                    type="submit"
                    size="large"
                    className="msgBtn2"
                    onclick={this.handleToggle}
                >
                    <i className="material-icons">edit</i>Edit Group
                </MenuItem>
                <Dialog
                    open={open}
                    onClose={this.handleToggle}
                    aria-labelledby="form-dialog-title"
                > 
                    <DialogTitle id="form-dialog-title">Edit Group</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter a new group name below, leave blank if wanted unchanged.
                        {/* </DialogContentText> */}
                        <TextField
                        className="groupTitle"
                        title="Group Name"
                        placeholder="New Group Name"
                        fullWidth
                        variant="outlined"
                        type="text"
                        onChange={this.handleGroupName}
                        />
                    
                    {/* <DialogContentText> */}
                          Change the current group owner.
                    </DialogContentText>
                    </DialogContent>
                    <DialogTitle id="form-dialog-title">Select New Owner</DialogTitle>
                        <DialogContent>
                        <FormControl classes={useStyles.formControl}>
                            <InputLabel>Select Group Owner</InputLabel> 
                            <Select
                                id="selectowner"
                                value = {this.state.value}
                                onChange={this.handleChange}
                                autoWidth
                                placeholder="New Group Owner"
                            >

                                {this.props.groupMembers.map(member => (
                                     name = member.first_name + " " + member.last_name,
                                    <MenuItem value={member.user_id}>
                                    {name}
                                    </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleToggle} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.editGroup} color="primary">
                        Edit Group
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

export default EditGroup;