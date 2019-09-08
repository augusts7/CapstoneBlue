import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from "../BaseLayout/App/App"
import Login from '../Authentication/Login/Login'
import Register from '../Authentication/Register/Register'
import ForgotPassword from '../Authentication/ForgotPassword/ForgotPassword'

import "./Application.css";

class Application extends React.Component { 

    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                    <Route exact path="/" component={App} />
                    <Route path="/users" component={Users} />
                    <Route path="/contact" component={Contact} />
                </div>
            </Router>
        );
    }
}

export default Application;