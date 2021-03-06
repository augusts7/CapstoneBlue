import React from 'react';
import Form from "../../components/Form/Form";
import MessageBox from "../../components/Form/MessageBox/MessageBox"
import { Link } from "react-router-dom"
import AuthContext from "../../Context/AuthContext";
import AuthFormContainer from "../AuthenticationFormLayout/AuthFormContainer";
import AuthFormSubmitButton from "../AuthenticationFormLayout/AuthFormSubmitButton";
import AuthFormAlternateButton from "../AuthenticationFormLayout/AuthFormAlternateButton";


const fields = [
    { "name": "campusEmail", "type": "email", "label": "Campus Email", "required": true },
    { "name": "password", "type": "password", "label": "Password", "required": true }
];

const title = "Welcome to the ULM Scheduler Application";
const id = "login";


class Login extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            "message": "",

        };

        this.onSubmit = this.onSubmit.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }


    hideMessage() {
        this.setState({ "message": "" });
    }

    onSubmit(target) {

        this.setState({ "isLoading": true });

        let data = {
            "campusEmail": target.campusEmail.value,
            "password": target.password.value,
        };
        fetch("/auth/Login", {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => { return res.json(); })
            .then((res) => {
                this.setState({
                    "isLoading": false,
                    "message": res.message
                });
                if (res.success) {
                    this.context.login(res.user);

                }
            });
    }


    render() {

        return (
            <AuthFormContainer>
                <MessageBox message={this.state.message} hideMessage={this.hideMessage} />
                <Form customSubmitButton={true} id={id} onSubmit={this.onSubmit} title={title} fields={fields}>
                    <div><Link to="/forgotPassword">Forgot password?</Link></div>
                    <AuthFormSubmitButton icon="accessibility">Sign In</AuthFormSubmitButton>
                </Form>
                <AuthFormAlternateButton link="/forgotPassword" text="Reset your account password?">
                    <i className="material-icons">accessibility</i>Reset your password
                </AuthFormAlternateButton>
            </AuthFormContainer>
        );
    }
}

export default Login;








