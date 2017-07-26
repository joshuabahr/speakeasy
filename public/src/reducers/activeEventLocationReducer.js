import {setCurrentEventLocation} from '../actions/index.js'

export default function(state = {}, action){

  switch(action.type){
    
    case 'SET_CURRENT_EVENT_LOCATION':
      return Object.assign({}, {currentEventLocation : action.payload})

    default:
      return state;
  }
}

//this.props.eventReducer.event_id