import React from "react";
import Form from "../../Components/Form/Form";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.FieldData = this.FieldData.bind(this);
    this.ActionLinkData = this.ActionLinkData.bind(this);
  }

  FieldData(label, type, id, name) {
    return { label: label, type: type, id: id, name: name };
  }

  ActionLinkData(link, title, icon) {
    return { link: link, title: title, icon: icon };
  }

  render() {
    let fields = [
      this.FieldData("First Name", "text", "firstName", "firstName"),
      this.FieldData("Last Name", "text", "lastName", "lastName"),
      this.FieldData("Campus Wide ID (CWID)", "number", "cwid", "cwid"),
      this.FieldData("Campus Email", "email", "campusEmail", "campusEmail"),
      this.FieldData(
        "Personal Email (Not Required)",
        "email",
        "personalEmail",
        "personalEmail"
      ),
      this.FieldData("Password", "password", "password", "password"),
      this.FieldData(
        "Confirm Password",
        "password",
        "confirmPassword",
        "confirmPassword"
      )
    ];
    let actionLinks = [
      this.ActionLinkData("login", "Login", "person_add"),
      this.ActionLinkData("forgotPassword", "Forgot Password", "help_outline")
    ];
    let title = "Register";
    let icon = "account_box";

    return (
      <Form
        icon={icon}
        title={title}
        actionLinks={actionLinks}
        fields={fields}
      />
    );
  }
}

export default Register;
