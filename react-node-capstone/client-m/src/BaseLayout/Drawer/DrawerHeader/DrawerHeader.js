
import React from 'react';
import "./DrawerHeader.css";



class DrawerHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="mdl-color--indigo-700 drawer-header">

                    <div className="profile-container"><a href=""><button className="mdl-button mdl-js-button mdl-button--accent mdl-color-text--white view-profile-button">View Profile</button></a></div>

                    <div className="sub-heading-container">Hi Sanjeeb</div>


            </header>
        );
    }
}

export default DrawerHeader;








