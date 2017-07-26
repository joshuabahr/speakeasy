import {fetchActiveEventId} from '../actions/index.js'

export default function(state = {}, action){

  switch(action.type){
    case 'SET_ACTIVE_EVENT_ID':
      return Object.assign({}, {eventId: action.payload})
    
    case 'SET_CURRENT_LOCATION':
      return Object.assign({}, {currentLocation : action.payload})

    default:
      return state;
  }
}

//this.props.eventReducer.event_id