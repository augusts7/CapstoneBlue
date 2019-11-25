import React from 'react';
import Form from "../../components/Form/Form";
import MessageBox from "../../components/Form/MessageBox/MessageBox";
import AuthFormAlternateButton from "../AuthenticationFormLayout/AuthFormAlternateButton";
import AuthFormContainer from "../AuthenticationFormLayout/AuthFormContainer";
import AuthFormSubmitButton from "../AuthenticationFormLayout/AuthFormSubmitButton";


class ForgotPassword extends React.Component {

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
        this.setState({"isLoading": true});
        let data = {
            "campusEmail": target.email.value,
            "user_id": target.username.value
        };

        fetch("/auth/forgotPassword", {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        })
            .then((res) => {
                this.setState({
                    "isLoading": false,
                    "message": res.message
                });
            });
    }

    render() {

        let fields = [
            {"name": "email", "type": "email", "label": "Campus Email", "required": true},
            {"name": "username", "type": "number", "label": "Campus Wide ID Number", "required": true},
        ];

        return (
            <AuthFormContainer>
                <MessageBox message={this.state.message} hideMessage={this.hideMessage}/>
                <Form customSubmitButton={true} id="forgot_password" onSubmit={this.onSubmit} title="Forgot Password"
                      fields={fields}>
                    <AuthFormSubmitButton icon="email">Send Reset Email</AuthFormSubmitButton>

                </Form>
                <AuthFormAlternateButton link="/login" text="Sign In Instead?">
                    <i className="material-icons">accessibility</i>Sign In
                </AuthFormAlternateButton>
            </AuthFormContainer>
        );

    }
}

export default ForgotPassword;








