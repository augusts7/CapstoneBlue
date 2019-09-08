
import React from 'react';
import "./Form.css";
import Button from "../Button/Button";
import ActionLink from "../Button/ActionLink";
import Input from '../Input/Input';



class Form extends React.Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <div className="form">
                <div class="mdl-grid">

                    <div class="mdl-color--white mdl-cell mdl-cell--6-col mdl-shadow--4dp center">

                        <h4><i class="material-icons form-title-icons">{this.props.icon}</i>{this.props.title}</h4>

                        <form onSubmit={this.onFormSubmit} method="post">

                            {this.props.fields.map(field => {
                                return <Input label={field.label} type={field.type} id={field.id} name={field.name} />;
                            })}

                            <Button type="submit" icon="done" name="Submit" />

                        </form>

                        <div className="action-links-container">
                            {this.props.actionLinks.map(link => {
                                return <ActionLink link={link.link} title={link.title} icon={link.icon} />;
                            })}
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default Form;








