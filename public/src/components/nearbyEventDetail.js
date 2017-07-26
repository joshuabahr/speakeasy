import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const NearbyEventDetail = ({ event, handleEventClick, idx }) => {
  
  return (
            <li className="col-md-3">
              <Link to="/active_event" onClick={() => handleEventClick(event)}>
                <img 
                  src={event.eventPhoto || `http://bit.ly/2uC4diw` || `http://unsplash.it/680/380?random=${idx}`}  
                />
                <div className="text-center">
                  <p>
                    {event.eventName}
                  </p>
                </div>
              </Link>
            </li>
  )
}

export default NearbyEventDetail

