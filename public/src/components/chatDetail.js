import React from 'react'
import { Panel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ChatDetail = ({ message, dmClick }) => {
  let nameStyle = { margin: 0, paddingLeft: '5px', fontWeight: 'bold', fontSize: '14px' }
  let msgStyle = { margin: 0, paddingLeft: '5px', fontStyle: 'italic', fontSize: '14px' }

  return (
    <div id="contactform">
        <div className="my-chat-detail" onClick={() => { dmClick(message) }}>
          <p style={nameStyle}>{message.user_name}</p>
          <p style={msgStyle}>{message.text}</p>
          <p>
            <div className="gallery">
              {message.images ? <img src={message.images[0]} /> : null}
            </div>
          </p>
        </div>
    </div >
  )
}

export default ChatDetail;