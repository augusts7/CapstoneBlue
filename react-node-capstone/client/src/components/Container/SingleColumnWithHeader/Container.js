import React from "react";
import "./Container.css";
import Progress from "../../Progress/Progress";

class Form extends React.Component {
    
    render() {

        return (
            <div className="container-wrapper">
                <div className="mdl-grid">
                    <div className="mdl-color--white mdl-cell mdl-cell--6-col mdl-shadow--4dp center">
                        <div className="container-header">
                            <h4 className="container-card-header">
                                <i className="material-icons container-title-icons">
                                    {this.props.icon}
                                </i>
                                {this.props.title}
                            </h4>
                        </div>
                        <Progress isLoading={this.props.isLoading} />
                        <div className="container-body">
                            {this.props.body}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form;
