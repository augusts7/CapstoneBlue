import React from "react";
import "./Container.css";
import Progress from "../Progress/Progress";

class Form extends React.Component {

    render() {

        let headerStyle = {};

        if (this.props.styles) {
            headerStyle = this.props.styles.header;
        }
        const title = [];
        if (this.props.title === undefined || this.props.title === null || this.props.title.length === 0) {

        } else {
            title.push(
                <div className="container-header">
                    <h4 className="container-card-header" style={headerStyle}>
                        <i className="material-icons container-title-icons">
                            {this.props.icon}
                        </i>
                        {this.props.title}
                    </h4>
                </div>
            );
        }
        return (
            <div className="container-wrapper mdl-color--white">
                {title}
                <Progress isLoading={this.props.isLoading}/>
                <div className="container-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Form;
