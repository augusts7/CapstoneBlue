import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: [event.target.value]
    });
  }

  handleSubmit(event) {
    alert("A username was submitted: " + this.state.username);
    alert("A password was submitted: " + this.state.password);
    
  
    event.preventDefault();
  }

  render() {
    return (
      <div className="p-5">
        <br />
        <h2 className="text-center">Please Log In</h2>
        <br />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <br />

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
          </div>
        </form>
        <div className="text-center">
          <Link to="/Signup">Dont have an account? Click here to sign up.</Link>
        </div>
      </div>
    );
  }
}

export default Login;
