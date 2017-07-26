import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Header from '../components/header';
import Portfolio from '../components/portfolio';


import { setActivePreviousEvent, clearActivePreviousEvent } from '../actions/activePreviousEvent'

class User_Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEvents: [],
      photos: []
    }
    this.handlePreviousEventPhotos = this.handlePreviousEventPhotos.bind(this);
    this.renderEvents = this.renderEvents.bind(this);

  }

  componentWillMount() {

    axios.get(`/api/event/fetchuserevents/${this.props.profile.id}`)
      .then((response) => {
        this.setState({
          userEvents: response.data,
        })
      })
      .catch((error) => {
        console.log("not getting user1's event", error);
      })

  }
  componentDidMount() {
    this.props.clearActivePreviousEvent();
  }

  renderEvents() {
    let events = null;
    if (this.state.userEvents.length) {
      events = this.state.userEvents.map((event, idx) => {
        return (
            <div className="col-md-3 col-centered text-center">
              <Link to="/previouseventphotos"
              onClick={() => this.handlePreviousEventPhotos(event)}>
                <img src={event.event.eventPhoto || `http://bit.ly/2uC4diw` || `http://unsplash.it/680/380?random=${idx}`}/>
                  <p className="text-center">{event.event.eventName}</p>
              </Link>
            </div>
        )
      })
    }
    return events;
  }

    renderEventMessage() {
    let msg;

    if (this.state.userEvents.length) {
      msg = 'PREVIOUS EVENTS';
    } else {
      msg = 'YOU HAVE\'NT BEEN TO ANY EVENTS YET!';
    }

    return (
      <section>
        <div className="container content-section text-center">
          <div className="container row col-md-8 col-md-offset-2 text-center">
            <h2>{msg}</h2>
          </div>
        </div>
      </section>
    );
  }

  handlePreviousEventPhotos(event) {
    this.props.setActivePreviousEvent(event)
  }

  render() {

    return (
      <div>

        <Header 
           brand="SPEAKEASY"
        />


        {this.renderEventMessage()}

        <section>
          <div className="container-fluid">
            <Portfolio
              renderEvents={this.renderEvents}
            />

          </div>
        </section>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    photos: state.active_previous_event
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setActivePreviousEvent: setActivePreviousEvent,
    clearActivePreviousEvent: clearActivePreviousEvent
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User_Events)
