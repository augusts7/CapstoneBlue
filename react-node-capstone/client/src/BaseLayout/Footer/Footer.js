import React from "react";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className="mdl-mini-footer">
        <div className="mdl-mini-footer__left-section">
          <ul className="mdl-mini-footer__link-list">
            <li>
              <a href="mailto:sanjeeb.developer@gmail.com">Send Email</a>
            </li>
            <li>
              <a href="{% url 'legal_information' %}">Privacy & Terms</a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;
