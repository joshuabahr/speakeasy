import React, { Component } from 'react'

class Header extends Component {

  renderHeading() {
    let heading;

    if (this.props.brand) {
      heading = <h1 className="brand-heading">{this.props.brand}</h1>
    } else if (this.props.renderPhoto) {
      heading = this.props.renderPhoto()
    }
    return heading;
  }

  renderText() {
    let text;

    if (this.props.text) {
      text = <p id="intro-fix" className="intro-text">{this.props.text}</p>;
    } else {
      text = null;
    }
    return text;
  }

  renderText2() {
    let text;

    if (this.props.text) {
      text = <p id="intro-fix" className="intro-text">{this.props.text2}</p>;
    } else {
      text = null;
    }
    return text;
  }

  renderButton() {
    let button;
    if (this.props.button) {
      button = this.props.button;
    } else {
      button = null;
    }
    return button;
  }


  render() {
    return (
      <header className="intro">
        <div className="intro-body">
          <div className="container row col-md-8 col-md-offset-2">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                {this.renderHeading()}<br />
                {this.renderText()}
                {this.renderText2()}
                {this.renderButton()}
                <label>{this.props.label}</label>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;