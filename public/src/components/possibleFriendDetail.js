import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const PossibleFriendDetail = ({ friend, handleFriendClick }) => {
  return (
      <li onClick={() => handleFriendClick(friend)} className="my-list">
        {friend.user_to_name}
      </li>
  )
}

export default PossibleFriendDetail