import React from "react";
import "./EventsList.css";

class EventsList extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div className="selectWrapper">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <select onChange={this.onChange} className="mdl-textfield__input">
            {this.props.options.map(option => {
              return <option value={option.value}>{option.name}</option>;
            })}
          </select>
          <label class="mdl-textfield__label" for="octane">
            {this.props.title}
          </label>
        </div>
      </div>
    );
  }
  // eslint-disable-next-line
}

export default EventsList;
