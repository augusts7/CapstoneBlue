import React from "react";
import "./Form.css";
import Button from "../Button/Button";
import ActionLink from "../Button/ActionLink";
import Select from "../Select/Select";
import Container from "../Container/Container/Container";
import TextField from "@material-ui/core/TextField"
import FormInputFields from "./FormInputFields";

class Form extends React.Component {

    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.getActionLinks = this.getActionLinks.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        if (!event.target.checkValidity()) {

            return;
        }
        this.props.onSubmit(event.target);
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
            actionLinks = <div/>;
        }
        return actionLinks;
    }

    render() {

        let styles = {
            header: {"background": 'linear-gradient(45deg, #3949AB 30%, #1E88E5 90%)'},
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
            <Container styles={styles} title={this.props.title} icon={this.props.icon} isLoading={this.props.isLoading}>
                <div>
                    <div>
                        <form
                            onSubmit={this.onFormSubmit}
                            method="post"
                            encType={encType}>
                            <FormInputFields fullWidth={true} fields={this.props.fields}/>
                            {submitButton}
                            {this.props.children}

                        </form>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Form;
