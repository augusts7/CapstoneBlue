import React, {Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import {get, post} from "../../ApiHelper/ApiHelper"
import DialogForm from "../CalenderView/components/forms/dialog-form/DialogForm";
import LengthValidator from "../../utils/length-utils/LengthValidator";
import Button from "@material-ui/core/Button";

const textFieldStyle = {marginRight: "16px"};

export default class SendGroupMessage extends React.Component {

    state = {
        message: "",
        progress: false,
    };


    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };


    handleSend = () => {

        if (LengthValidator.isEmpty(this.state.message) || LengthValidator.isEmpty(this.props.groupId)) {
            return false;
        }
        let data = {
            "groupId": this.props.groupId,
            "message": this.state.message,
            "date": new Date()
        };

        this.setState({progress: true});
        post("/message/sendGroupMessage", data, (res) => {
            this.setState({progress: false});
            this.handleClose();
        });
    };

    handleClose = () => {
        this.setState({show: false});
    };

    handleShow = () => {
        this.setState({show: true});
    };

    layoutValues = {
        buttons: [
            {name: "Cancel", onClick: this.handleClose},
            {name: "Send", onClick: this.handleSend}
        ]
    };

    render() {

        let helperText = "To send a message to all the members of your curren group, type the message and then click on send message";


        return (
            <Fragment>
                <Button
                    variant="contained"
                    size="large"
                    className="msgBtn2"
                    onClick={this.handleShow}>
                    <i className="material-icons">email</i>Send Group Message
                </Button>
                <DialogForm fullWidth={true} onClose={this.handleClose} open={this.state.show}
                            buttons={this.layoutValues.buttons} progress={this.state.progress}
                            text={helperText}
                            title="Send a Group Message">

                    <TextField
                        fullWidth
                        style={textFieldStyle}
                        autoFocus
                        type="text"
                        name="message"
                        onChange={this.handleChange}
                        value={this.state.message}
                        label={"Message"}
                        margin="normal"/>


                </DialogForm>
            </Fragment>
        );
    }
}