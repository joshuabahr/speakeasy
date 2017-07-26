import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const NearbyEventDetail = ({ event, handleEventClick, idx }) => {
  
  return (
          <div className="col-md-3 text-center">
            <Link to="/active_event" onClick={() => handleEventClick(event)}>
              <img src={event.eventPhoto || `http://bit.ly/2uC4diw` || `http://unsplash.it/680/380?random=${idx}`}/>
              <p>{event.eventName}</p>
            </Link>
          </div>
  )
}

export default NearbyEventDetail

