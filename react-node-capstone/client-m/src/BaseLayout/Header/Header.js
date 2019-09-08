
import React from 'react';
import "./Header.css";



class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <header className="mdl-layout__header">

                <div className="mdl-layout__header-row">

                    <span className="mdl-layout-title white">Title</span>

                    <div className="mdl-layout-spacer"></div>

                    <div>
                        <nav className="mdl-navigation mdl-layout--large-screen-only header-nav">
                            <a className="mdl-navigation__link" href="/">Hello, Sanjeeb</a>
                            <li id="a_options" className="mdl-navigation__link"><div className="cursor">Appointments<span><i className="material-icons">keyboard_arrow_down</i></span></div></li>
                            <li id="t_options" className="mdl-navigation__link"><div className="cursor">Timeslots<span><i className="material-icons">keyboard_arrow_down</i></span></div></li>
                            <a className="mdl-navigation__link" href="/">Home</a>
                            <a className="mdl-navigation__link" href="/admin/">Admin</a>
                            <a className="mdl-navigation__link" href="/">Log Out</a>
                            <a className="mdl-navigation__link" href="/">Log In</a>
                        </nav>

                        <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="a_options">
                            <a href="/"><li className="mdl-menu__item"><i className="material-icons">done_all</i>View all appointments</li></a>
                            <a href="/"><li className="mdl-menu__item"><i className="material-icons">add</i>Set a new Appointment</li></a>
                        </ul>

                        <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="t_options">
                            <a href="/"><li className="mdl-menu__item"><i className="material-icons">done_all</i>View all timeslots</li></a>
                            <a href="/"><li className="mdl-menu__item"><i className="material-icons">add</i>Add New Timeslots</li></a>
                        </ul>

                        <button className="mdl-layout--small-screen-only mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon large-icon-button" id="hdrbtn">
                            <i className="material-icons large-icon">more_vert</i>
                        </button>

                        <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
                            <a href="/"><li className="mdl-menu__item"><i className="material-icons">home</i>Home</li></a>
                            <a href="/admin/"><li className="mdl-menu__item"><i className="material-icons">assessment</i>Admin</li></a>
                            <a href="/"><li className="mdl-menu__item"><i className="material-icons">done_all</i>View all appointments</li></a>

                            <a href="/"><li className="mdl-menu__item"><i className="material-icons">add</i>Set a new Appointment</li></a>
                            <a href="/"><li className="mdl-menu__item"><i className="material-icons">done_all</i>View all timeslots</li></a>

                            <a href="/"><li className="mdl-menu__item"><i className="material-icons">add</i>Add New Timeslots</li></a>

                            <a href="/"><li className="mdl-menu__item"><i className="material-icons">view_list</i>View Profile</li></a>
                            <a href="/"><li className="mdl-menu__item"><i className="material-icons">remove_circle</i>Log Out</li></a>

                            <a href="/">Log In</a>


                        </ul>

                    </div>
                </div>

                <div id="p" className="progress-bar mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
            </header>
        );
    }
}

export default Header;