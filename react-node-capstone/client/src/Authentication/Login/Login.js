
import React from 'react';
import Form from "../../components/Form/Form";
import MessageBox from "../../components/Form/MessageBox/MessageBox"
import Button from "../../components/Button/Button"
import { Link } from "react-router-dom"

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "message": "",

        };

        this.onSubmit = this.onSubmit.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    hideMessage() {
        this.setState({"message": ""});
    }
    handleOptionChange = changeEvent => {
        this.setState({
            user_type: changeEvent.target.value
        });
    };
    onSubmit(target) {
        
        this.setState({ "isLoading": true });
       
        let data = {
            "campusEmail": target.campusEmail.value,
            "password": target.password.value,
        };
        fetch("/users/login", {
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
            if (res.success) {
                if (this.props.hasLoggedIn) {
                    this.props.hasLoggedIn(res.user);
                }
            } 
        });
    }

    render() {
        let fields = [          
            { "name": "campusEmail", "type": "email", "label": "Campus Email", "required": true },
            { "name": "password", "type": "password", "label": "Password", "required": true }
        ];
        // eslint-disable-next-line
        let actionLinks = [
            { "link": "register", "title": "Register", "icon": "person_add" },
            { "link": "forgotPassword", "title": "Forgot Password", "icon": "help_outline" },
        ];
        let title = "Welcome to the ULM Scheduler Application";
        let id = "login";

        return (
            <div className="mdl-grid" style={{ "width": "100%" }}>
                <div className="mdl-cell--6-col mdl-cell--10-col-phone mdl-cell--10-col-tablet mdl-color--white mdl-shadow--4dp center">
                <MessageBox message={this.state.message} hideMessage={this.hideMessage} />
                <Form customSubmitButton={true} id={id} onSubmit={this.onSubmit} title={title} fields={fields}>
                    <div><Link to="/forgotPassword">Forgot password?</Link></div>
                    <div>
                            <Button role="main" type="submit" style={{ "margin-top": "16px", "padding-left": "16px", "padding-right": "16px" }}>Submit</Button>
                    </div>

                    </Form>
                    <div className="mdl-shadow--4dp" style={{ "border": "0.5px solid #1976D2", "background-color": "#1565C0", "color": "white", "padding": "24px 8px 8px 8px", "margin": "24px 0px 0px 0px"}}>
                        <div style={{ "display": "flex", "justify-content": "center" }}>
                            <Link to="/register">
                                <Button role="main" style={{ "padding-left": "816x", "padding-right": "32px" }}><i className="material-icons">how_to_reg</i>Register</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}

export default Login;








