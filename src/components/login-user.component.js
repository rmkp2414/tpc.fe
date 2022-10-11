import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/users";
import SimpleReactValidator from 'simple-react-validator';

class LoginUser extends Component {
  constructor(props) {
    super(props);

    // this.validator = new SimpleReactValidator();

    this.validator = new SimpleReactValidator({
      element: (message, className) => <div className={className}>{message}</div>
    })

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.loginUser = this.loginUser.bind(this);

    this.state = {
      id: null,
      email: null,
      password: null,
      error:"",
      loginsuccess:false
    };
  }

 

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  loginUser() {
    if (this.validator.allValid()) {      
      const { email, password } = this.state;
    this.props
      .loginUser(email, password)
      .then((data) => {
        console.log('ss' + data)
        this.setState({
          loginsuccess:true,
          id: data.id,
          country:data.country,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          contactnumber: data.contactnumber,
          designation: data.designation,
          gender: data.gender,          
          companyname: data.companyname,
          companyemail: data.companyemail,
          companyaddress1: data.companyaddress1,
          companyaddress2: data.companyaddress2,
          city: data.city,
          state: data.state,
          zip: data.zip,
        });
        
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
        this.setState({
          error : e.response.data.message
        })
      });
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }   
    
  }

  newUser() {
    this.setState({
      id: null,
      email: "",
      password: "",
    });
  }

  render() {
    return (
     
        <div className="submit-form">
          {this.state.loginsuccess ? (
            <div>
              <h4>Login Successful!</h4>
              <div>

                  {
                    <div>
                    <h1>{this.state.firstname} {this.state.lastname}</h1>
                    <h2>{this.state.id}</h2>
                    </div>
                  }

              </div>
              {/* <button className="btn btn-success" onClick={this.newTutorial}>
                Add
              </button> */}
            </div>
          ) : (
            <div div className="form-group">              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  name="email"
                />
                 
                 {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}
              </div>
  
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  name="password"
                />
                {this.validator.message('password', this.state.password, 'required', { className: 'text-danger' })}
              </div>

              {this.state.error ? <div>{this.state.error}</div> : null}
  
              <button onClick={this.loginUser} className="btn btn-success">
                Login
              </button>
            </div>
          )}
        </div>
        
      );    
  }
}

export default connect(null, { loginUser })(LoginUser);