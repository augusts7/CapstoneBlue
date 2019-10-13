import React from "react";
import "./Form.css";
import Button from "../Button/Button";
import ActionLink from "../Button/ActionLink";
import Select from "../Select/Select";
import Container from "../Container/Container/Container";
import TextField from "@material-ui/core/TextField"

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.getFields = this.getFields.bind(this);
        this.getActionLinks = this.getActionLinks.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        if (!event.target.checkValidity()) {
            
            return;
        }
        this.props.onSubmit(event.target);
    }


    getFields() {
        let fields = [];

        this.props.fields.map(field => {
            if (field.type === "select") {
                return(
                fields.push(<Select
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    onChange={field.onChange}
                    options={field.options}
                    required={field.required}
                />));
            } else {
                return(
                    fields.push(<TextField
                            fullWidth
                            id={field.id}
                            required={field.required}
                            value={field.value}
                            type={field.type}
                            label={field.label}
                            name={field.name}
                            margin="normal" />));
            }
        })
       

        return fields;
    }

    getActionLinks() {

        let actionLinks = [];

        if (this.props.actionLinks) {
            actionLinks = (
                <div className="action-links-container">
                    {this.props.actionLinks.map(link => {
                        return (
                            <ActionLink
                                link={link.link}
                                title={link.title}
                                icon={link.icon}
                            />
                        );
                    })}
                </div>
            );
        } else {
            actionLinks = <div />;
        }
        return actionLinks;
    }

    render() {

        let styles = {
            header: { "background": 'linear-gradient(45deg, #3949AB 30%, #1E88E5 90%)' },
        };
        let encType = "";
        if (this.props.includesFile) {
            encType = "multipart/form-data";
        }
        let submitButton = <Button type="submit"><i className="material-icons">done</i>Submit</Button>;
        if (this.props.customSubmitButton) {
            submitButton = "";
        }
        return (
            <div>
                <Container styles={styles} title={this.props.title} icon={this.props.icon} isLoading={this.props.isLoading}>
                    <div>
                        <div>
                            <form
                                onSubmit={this.onFormSubmit}
                                method="post"
                                encType={encType} >
                                <div>
                                    {this.getFields()}
                                </div>
                                {submitButton}
                                {this.props.children}
                                
                            </form> 
                        </div>
                        <div>
                            {this.getActionLinks()}
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Form;
