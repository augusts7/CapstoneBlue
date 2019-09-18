
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
            <div>
                <Calendar />
            </div>
         );
    }
}

export default Main;








