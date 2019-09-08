
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Drawer from '../Drawer/Drawer';

import "./App.css";

function App() {
    return (

        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header full">

            <Header />

            <Drawer />

            <main className="mdl-layout__content mdl-color--grey-200">

                <div id="content-div">

                    <Main />

                </div>

                <Footer />

            </main>
        </div>
    );
}

export default App;
