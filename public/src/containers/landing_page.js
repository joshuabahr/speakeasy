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
    console.log('clicked login');
    auth.login();
  }

  render() {
    return (
      <div>
        <Header
          brand="SPEAKEASY"
          text={`DIY semiotics succulents, put a bird on it tattooed hoodie +1 letterpress woke.
              Umami knausgaard hexagon tumblr. Polaroid disrupt sartorial cliche prism retro
              cray bespoke. Authentic salvia kitsch twee literally. Kinfolk locavore YOLO twee
              PBR&B shoreditch echo park. Selfies ugh godard actually, biodiesel cliche pop-up
              jianbing vape mumblecore tacos chia tote bag taiyaki.`}
          button={<Link to="/" onClick={this.login} className="btnghost0">
            <i className="fa"></i>
            Join the Conversation
                </Link>}
        />
      </div>
    );
  }
}

export default connect(null, null)(Landing_Page);


