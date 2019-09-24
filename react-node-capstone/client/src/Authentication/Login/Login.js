
import React from 'react';
import Form from "../../Components/Form/Form";
import MessageBox from "../../Components/Form/MessageBox/MessageBox"


class Login extends React.Component {

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
        let data = {
            "campusEmail": target.campusEmail.value,
            "password": target.password.value
        };

        fetch("/auth/login", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => { return res.json(); })
            .then((res) => {
            if (res.status == 200) {
                this.setState({
                    "message": res.message
                });
                this.props.onLoggedIn();
            } else {
                this.setState({
                    "message": res.message
                });
            }
        });
    }

    render() {
        let fields = [          
            { "name": "campusEmail", "type": "email", "label": "Campus Email", "required": true },
            { "name": "password", "type": "password", "label": "Password", "required": true },
        ];
        
        let actionLinks = [
            { "link": "register", "title": "Register", "icon": "person_add" },
            { "link": "forgotPassword", "title": "Forgot Password", "icon": "help_outline" },
        ];
        let title = "Login";
        let icon = "account_box";

        return (
            <div>
                <MessageBox message={this.state.message} hideMessage={this.hideMessage} />
                <Form icon={icon} onSubmit={this.onSubmit} title={title} actionLinks={actionLinks} fields={fields} />
            </div>  
        );
    }
}

export default Login;








