import React from "react";
import "./Progress.css";

class Progress extends React.Component {

    render() {

        let progress = [];
        if (this.props.isLoading) {
            progress.push(<div class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>);
        } 

        return (
            <div>
                {progress} 
            </div>
        );
    }
}

export default Progress;
