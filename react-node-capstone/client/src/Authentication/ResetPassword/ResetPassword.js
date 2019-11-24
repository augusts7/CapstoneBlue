import React from 'react';
import Form from "../../components/Form/Form";
import MessageBox from "../../components/Form/MessageBox/MessageBox";
import Button from "../../components/Button/Button"
import AuthFormAlternateButton from "../AuthenticationFormLayout/AuthFormAlternateButton";
import AuthFormContainer from "../AuthenticationFormLayout/AuthFormContainer";
import AuthFormSubmitButton from "../AuthenticationFormLayout/AuthFormSubmitButton";
import LengthValidator from "../../utils/length-utils/LengthValidator";
import PasswordUtils from "../../utils/password/PasswordUtils";
import {post} from "../../ApiHelper/ApiHelper";


export default class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "message": ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    hideMessage() {
        this.setState({"message": ""});
    }

    onSubmit(target) {

        const password = target.password.value;
        const confirmPassword = target.confirmPassword.value;
        const token = this.props.match.params.token;

        if (!PasswordUtils.twoPasswordsMatch(password, confirmPassword)) {
            this.setState({message: "Password and Confirm Passwords don't match."});
        }

        this.setState({"isLoading": true});
        let data = {
            "password": password,
            "token": token
        };

        post("/auth/resetPassword", data, (res) => {
            this.setState({"isLoading": false, "message": res.message});
        });
    }

    render() {

        let fields = [
            {"name": "password", "type": "password", "label": "New Password", "required": true},
            {"name": "confirmPassword", "type": "password", "label": "Confirm New Password", "required": true},
        ];

        return (
            <AuthFormContainer>
                <MessageBox message={this.state.message} hideMessage={this.hideMessage}/>
                <Form customSubmitButton={true} id="reset_password" onSubmit={this.onSubmit} title="Reset Password"
                      fields={fields}>
                    <AuthFormSubmitButton icon="done">Confirm New Password</AuthFormSubmitButton>

                </Form>
                <AuthFormAlternateButton link="/login" text="Sign In Instead?">
                    <i className="material-icons">accessibility</i>Sign In
                </AuthFormAlternateButton>
            </AuthFormContainer>
        );

    }
}