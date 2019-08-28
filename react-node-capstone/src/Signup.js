import React, { Component } from "react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: [event.target.value]
    });
  }

  handleSubmit(event) {
    alert("A fisrt name was submitted: " + this.state.fname);
    alert("A last name was submitted: " + this.state.lname);
    alert("A email was submitted: " + this.state.email);
    alert("A password was submitted: " + this.state.password);
  }

  render() {
    return (
      <div id="SignupForm" class="p-5">
        <div class="container-fluid">
          <br />
          <h2 class="text-center">Create Your Comm System Account</h2>
          <br />
        </div>

        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label for="fname">First Name: </label>
            <input
              type="text"
              class="form-control"
              id="fname"
              value={this.state.fname}
              onChange={this.handleChange}
              required
            />
          </div>
          <div class="form-group">
            <label for="fname">Last Name: </label>
            <input
              type="text"
              class="form-control"
              id="lname"
              value={this.state.lname}
              onChange={this.handleChange}
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email: </label>
            <input
              type="email"
              class="form-control"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password: </label>
            <input
              type="password"
              class="form-control"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <br />

            <div class="text-center">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
