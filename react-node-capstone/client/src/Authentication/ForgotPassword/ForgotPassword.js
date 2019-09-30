
import React from 'react';
import Form from "../../components/Form/Form";
import MessageBox from "../../components/Form/MessageBox/MessageBox";
import { Link } from "react-router-dom"
import Button from "../../components/Button/Button"



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
        this.setState({ "message": "" });
    }

    onSubmit(target) {
        this.setState({"isLoading": true});
        let data = {
            "campusEmail": target.email.value,
            "user_id": target.username.value
        };

        fetch("/users/forgotPassword", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => { return res.json(); })
            .then((res) => {
                this.setState({
                    "isLoading": false,
                    "message": res.message
                });
            });
    }

    render() {

        let fields = [
            { "name": "email", "type": "email", "label": "Campus Email", "required": true },
            { "name": "username", "type": "number", "label": "Campus Wide ID Number", "required": true },
        ];
        let actionLinks = [
            { "link": "login", "title": "Login", "icon": "person_add" },
            { "link": "register", "title": "Register", "icon": "add" },
        ];
        let title = "Forgot Password";
        let icon = "help_outline";
        let id = "forgotPassword";

        return (
            <div className="mdl-grid" style={{ "width": "100%" }}>
                <div className="mdl-cell--6-col mdl-cell--10-col-phone mdl-cell--10-col-tablet mdl-color--white mdl-shadow--4dp center">
                    <MessageBox message={this.state.message} hideMessage={this.hideMessage} />
                    <Form customSubmitButton={true} id={id} icon={icon} onSubmit={this.onSubmit} title={title} fields={fields}>
                        <div>
                            <Button type="submit" style={{ "margin-top": "16px", "padding-left": "16px", "padding-right": "32px" }}><i className="material-icons">email</i>Send Password reset email</Button>
                        </div>

                    </Form>
                    <div className="mdl-shadow--4dp" style={{ "border": "0.5px solid #1976D2", "background-color": "#1565C0", "color": "white", "padding": "24px 8px 8px 8px", "margin": "24px 0px 0px 0px" }}>
                        <div style={{ "display": "flex", "justify-content": "center", "margin-bottom": "16px" }}>Sign in Instead?</div>
                        <div style={{ "display": "flex", "justify-content": "center" }}>
                            <Link to="/login">
                                <Button role="primary" style={{ "padding-left": "816x", "padding-right": "32px" }}><i className="material-icons">accessibility</i>Sign in</Button>
                            </Link>
                        </div>
                    </div>

                </div>

            </div>  
        );
    }
}

export default ForgotPassword;








