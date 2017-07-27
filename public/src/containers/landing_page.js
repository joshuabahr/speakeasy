import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Auth from '../Auth0/Auth0';
import Header from '../components/header';

const auth = new Auth();
const { isAuthenticated } = auth;

class Landing_Page extends Component {
  constructor(props) {
    super(props);
    this.login = this
      .login
      .bind(this);
  }

  login() {
    auth.login();
  }

  render() {
    let text = `The people around you have a lot to say
                Speakeasy will help you start the conversation`

    return (
      
      <div>
        <Header
          brand="SPEAKEASY"
          text={text}
          button={
              <Link to="/" onClick={this.login} className="btnghost0">
              Join in
              </Link>
            }
        />
      </div>
    );
  }
}

export default connect(null, null)(Landing_Page);


