
import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Calendar from "../../Components/Calendar/Calendar"
import DayView from "../../Components/DayView/DayView" 

import Table from "../../Components/Table/Table"
import Profile from "../../Authentication/Profile/Profile"


class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header full root-container">
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/forgotPassword" component={ForgotPassword} />
                    <Route exact path="/" component={App} />
                </div>
            </Router>
            <div>
                <Calendar /> <DayView /> <Table /> <Profile /> 
            </div>
         )
    }
}

export default Main;








