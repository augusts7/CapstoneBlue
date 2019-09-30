
import React from 'react';
import Form from "../../components/Form/Form";
import MessageBox from "../../components/Form/MessageBox/MessageBox"

class AuthView extends React.Component {

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
        
        let actionLinks = [
            { "link": "register", "title": "Register", "icon": "person_add" },
            { "link": "forgotPassword", "title": "Forgot Password", "icon": "help_outline" },
        ];
        let title = "Login";
        let icon = "account_box";
        let id = "login";

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        aria-label="nav tabs example"
                    >
                        <LinkTab label="Page One" href="/drafts" {...a11yProps(0)} />
                        <LinkTab label="Page Two" href="/trash" {...a11yProps(1)} />
                        <LinkTab label="Page Three" href="/spam" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    Page One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Page Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Page Three
                </TabPanel>
            </div>
        );
    }
}

export default AuthView;








