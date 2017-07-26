import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const DMRoomDetail = ({ room, handleRoomClick }) => {
  return (

      <div onClick={() => handleRoomClick(room)}>
        <li className="my-list">
          {room.user_to_name}
        </li>
        <br></br>
      </div>

  )
}

export default DMRoomDetail