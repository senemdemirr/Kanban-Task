import React from 'react'
import "./AddCard.css"

function AddCard() {
  const handleClick = () => {
    console.log("tıklandı")
  }
  return (
    <div className='addCard'>
      <button onClick={handleClick} className='add-input'> Add Task</button>
    </div>
  )
}

export default AddCard