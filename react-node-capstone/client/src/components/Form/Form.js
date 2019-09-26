import React from "react";
import "./Form.css";
import Button from "../Button/Button";
import ActionLink from "../Button/ActionLink";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Container from "../Container/SingleColumnWithHeader/Container";

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.getForm = this.getForm.bind(this);
        this.getActionLinks = this.getActionLinks.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        if (!event.target.checkValidity()) {
            
            return;
        }
        this.props.onSubmit(event.target);
    }


    getForm() {
        let form = [];
        let encType = "";
        if (this.props.includesFile) {
            encType = "multipart/form-data";
        }
        let fields = [];

        this.props.fields.map(field => {
            if (field.type === "select") {
                return(
                fields.push(<Select
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    options={field.options}
                    required={field.required}
                />));
            } else {
                return(
                fields.push(<Input
                    formId={this.props.id}
                    label={field.label}
                    type={field.type}
                    key={field.id}
                    name={field.name}
                    required={field.required}
                    value={field.value}
                />));
            }
        })
        form.push(
            <form
                onSubmit={this.onFormSubmit}
                method="post"
                encType={encType} >

                <div>
                    {fields}
                </div>

                <Button type="submit" icon="done" name="Submit" />
            </form>
        );

        return form;
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
        let body = [];
        body.push(<div><div>{this.getForm()}</div><div>{this.getActionLinks()}</div></div>);

        return (
            <div>
                <Container title={this.props.title} icon={this.props.icon} isLoading={this.props.isLoading} body={body} />
            </div>
        );
    }
}

export default Form;
