
import React from 'react';
import Form from "../../components/Form/Form";
import MessageBox from "../../components/Form/MessageBox/MessageBox";



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
            "email": target.email.value,
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
        ];
        let actionLinks = [
            { "link": "login", "title": "Login", "icon": "person_add" },
            { "link": "register", "title": "Register", "icon": "add" },
        ];
        let title = "Forgot Password";
        let icon = "help_outline";
        let id = "forgotPassword";

        return (
            <div>
                <MessageBox message={this.state.message} hideMessage={this.hideMessage} />
                <Form id={id} icon={icon} onSubmit={this.onSubmit} title={title} actionLinks={actionLinks} fields={fields} />
            </div>
        );
    }
}

export default ForgotPassword;








