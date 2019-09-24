import React from "react";
import "./Input.css";

class Input extends React.Component {


  render() {
    return (
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input
          class="mdl-textfield__input"
          type={this.props.type}
          id={this.props.id}
          required={this.props.required}
          name={this.props.name}
          value={this.props.value}
        />
        <label class="mdl-textfield__label" for="username">
          {this.props.label}
        </label>
        <span class="mdl-textfield__error">Invalid Input</span>
      </div>
    );
  }
}

export default Input;
