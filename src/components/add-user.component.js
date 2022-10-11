import React, { Component } from "react";
import { connect } from "react-redux";
import { createUser } from "../actions/users";
import Select from 'react-select'
import SimpleReactValidator from 'simple-react-validator';

const options = [
  { label: 'Sri Lanka', value: 'lk' },
  { label: 'Dubai', value: 'in' },
  { label: 'India', value: 'c' },
  { label: 'Japan', value: 'jp' },

]

const genderoptions = [
  { label: 'Male', value: 'm' },
  { label: 'Female', value: 'f' },
  { label: 'Prefer Not to Mention', value: 'x' }

]

const cityoptions = [
  { label: 'Paris', value: 'pr' },
  { label: 'Colombo', value: 'col' },
  { label: 'Tokyo', value: 'tk' }

]

class AddUser extends Component {
  constructor(props) {
    super(props);


    this.validator = new SimpleReactValidator({
      element: (message, className) => <div className={className}>{message}</div>
    })

    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
    this.onChangeDesignation = this.onChangeDesignation.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.onChangeCompanyEmail = this.onChangeCompanyEmail.bind(this);
    this.onChangeCompanyAddress1 = this.onChangeCompanyAddress1.bind(this);
    this.onChangeCompanyAddress2 = this.onChangeCompanyAddress2.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeZip = this.onChangeZip.bind(this);   
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      country:"",
      firstname: "",
      lastname: "",
      email: "",
      contactnumber: "",
      designation: "",
      gender: "",
      password: "",
      confirmpassword: "",
      companyname: "",
      companyemail: "",
      companyaddress1: "",
      companyaddress2: "",
      city: "",
      state: "",
      zip: "",
      submitted: false,
    };
  }


  onChangeCountry(e) {
    this.setState({
      // country: e.target.value,
      country: e,
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstname: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastname: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeContactNumber(e) {
    this.setState({
      contactnumber: e.target.value,
    });
  }

  onChangeDesignation(e) {
    this.setState({
      designation: e.target.value,
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmpassword: e.target.value,
    });
  }

  onChangeCompanyName(e) {
    this.setState({
      companyname: e.target.value,
    });
  }

  onChangeCompanyEmail(e) {
    this.setState({
      companyemail: e.target.value,
    });
  }

  onChangeCompanyAddress1(e) {
    this.setState({
      companyaddress1: e.target.value,
    });
  }  

  onChangeCompanyAddress2(e) {
    this.setState({
      companyaddress2: e.target.value,
    });
  }

  onChangeCity(e) {
    this.setState({
      city: e,
    });
  }
 
  onChangeState(e) {
    this.setState({
      state: e.target.value,
    });
  }

  onChangeZip(e) {    
    this.setState({
      zip: e.target.value,
    });
    
  }

  saveUser() {
    if (this.validator.allValid()) {   
    const {
      country,firstname, lastname, email, contactnumber, designation, gender, password, confirmpassword, companyname,
      companyemail, companyaddress1, companyaddress2, city, state, zip } = this.state

    this.props
      .createUser(country,firstname, lastname, email, contactnumber, designation, gender, password, confirmpassword, companyname,
        companyemail, companyaddress1, companyaddress2, city, state, zip)
      .then((data) => {        
        this.setState({
          id: data.id,
          country:data.country,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          contactnumber: data.contactnumber,
          designation: data.designation,
          gender: data.gender,
          password: data.password,
          confirmpassword: data.confirmpassword,
          companyname: data.companyname,
          companyemail: data.companyemail,
          companyaddress1: data.companyaddress1,
          companyaddress2: data.companyaddress2,
          city: data.city,
          state: data.state,
          zip: data.zip,
          submitted: true,
        });        
      })
      .catch((e) => {
        console.log(e);
      });
    }
    else{
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  }

  newUser() {
    this.setState({
      id: null,
      country:"",
      firstname: "",
      lastname: "",
      email: "",
      contactnumber: "",
      designation: "",
      gender: "",
      password: "",
      confirmpassword: "",
      companyname: "",
      companyemail: "",
      companyaddress1: "",
      companyaddress2: "",
      city: "",
      state: "",
      zip: "",
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Your Registration Is Successfull.Please check your mail box. Thank You.</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Register New User
            </button>
          </div>
        ) : (
          <div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="country">Country</label>
                <Select options={options} onChange={this.onChangeCountry} value={this.state.country} required/>
                {this.validator.message('Country', this.state.country, 'required', { className: 'text-danger' })}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"                  
                  value={this.state.firstname}
                  onChange={this.onChangeFirstName}
                  name="firstname"
                  required/>
                  {this.validator.message('First Name', this.state.firstname, 'required|alpha', { className: 'text-danger' })}
              </div>

              <div className="form-group col-6">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  required
                  value={this.state.lastname}
                  onChange={this.onChangeLastName}
                  name="lastname"
                />
                {this.validator.message('Last Name', this.state.lastname, 'required|alpha', { className: 'text-danger' })}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
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
                {this.validator.message('Email', this.state.email, 'required|email', { className: 'text-danger' })}
              </div>

              <div className="form-group col-6">
                <label htmlFor="contactnumber">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactnumber"
                  required
                  value={this.state.contactnumber}
                  onChange={this.onChangeContactNumber}
                  name="contactnumber"
                />
                {this.validator.message('Phone Number', this.state.contactnumber, 'required|phone', { className: 'text-danger' })}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="designation">Designation</label>
                <input
                  type="text"
                  className="form-control"
                  id="designation"
                  required
                  value={this.state.designation}
                  onChange={this.onChangeDesignation}
                  name="designation"
                />
                {this.validator.message('Designation', this.state.designation, 'required|alpha', { className: 'text-danger' })}
              </div>

              <div className="form-group col-6">
                <label htmlFor="gender">Gender</label>
                <Select options={genderoptions} onChange={this.onChangeGender} value={this.state.gender} required/>
                {this.validator.message('Gender', this.state.gender, 'required', { className: 'text-danger' })}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
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
                {this.validator.message('Password', this.state.password, 'required', { className: 'text-danger' })}
              </div>

              <div className="form-group col-6">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmpassword"
                  required
                  value={this.state.confirmpassword}
                  onChange={this.onChangeConfirmPassword}
                  name="confirmpassword"
                />
                {this.validator.message('Confirm Password', this.state.confirmpassword, 'required', { className: 'text-danger' })}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="companyname">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="companyname"
                  required
                  value={this.state.companyname}
                  onChange={this.onChangeCompanyName}
                  name="companyname"
                />
                {this.validator.message('Company Name', this.state.companyname, 'required', { className: 'text-danger' })}
              </div>
              <div className="form-group col-6">
                <label htmlFor="companyemail">Company Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="companyemail"
                  required
                  value={this.state.companyemail}
                  onChange={this.onChangeCompanyEmail}
                  name="companyemail"
                />
                {this.validator.message('Company Email', this.state.companyemail, 'required|email', { className: 'text-danger' })}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="companyaddress1">Company Address 1</label>
                <input
                  type="text"
                  className="form-control"
                  id="companyaddress1"
                  required
                  value={this.state.companyaddress1}
                  onChange={this.onChangeCompanyAddress1}
                  name="companyaddress1"
                />
                {this.validator.message('Company Address', this.state.companyaddress1, 'required', { className: 'text-danger' })}
              </div>
              <div className="form-group col-6">
                <label htmlFor="companyaddress2">Company Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="companyaddress2"
                  required
                  value={this.state.companyaddress2}
                  onChange={this.onChangeCompanyAddress2}
                  name="companyaddress2"
                />
                {this.validator.message('Company Address', this.state.companyaddress2, 'required', { className: 'text-danger' })}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="city">City</label>
                <Select options={cityoptions} onChange={this.onChangeCity} value={this.state.city} required/>
                {this.validator.message('City', this.state.city, 'required', { className: 'text-danger' })}
              </div>
              <div className="form-group col-6">
                <label htmlFor="state">State/Province</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  required
                  value={this.state.state}
                  onChange={this.onChangeState}
                  name="state"
                />
                {this.validator.message('State/Province', this.state.state, 'required|alpha', { className: 'text-danger' })}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="zip">ZIP Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  required
                  value={this.state.zip}
                  onChange={this.onChangeZip}
                  name="zip"
                />
                {this.validator.message('ZIP', this.state.zip, 'required', { className: 'text-danger' })}
              </div>
            </div>
            <button onClick={this.saveUser} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createUser })(AddUser);