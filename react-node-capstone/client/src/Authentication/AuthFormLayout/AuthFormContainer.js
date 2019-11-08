import React from 'react';


const styles = {
    root: {width: "100%"}
};


export default function AuthFormContainer(props) {


    return (
        <div className="mdl-grid" style={styles.root}>
            <div className="mdl-cell--6-col mdl-cell--10-col-phone mdl-cell--10-col-tablet mdl-color--white mdl-shadow--4dp center">

                {props.children}

            </div>
        </div>
    );
}
