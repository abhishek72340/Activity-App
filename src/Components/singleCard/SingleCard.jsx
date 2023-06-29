import React from 'react'
import './SingleCard.css';
export default function SingleCard({ card, handleChoice, flipped,  gameStart, setGameStart }) {
  
  const handleClick = () => {
    handleChoice(card)
  }

  const imageClickHandler=()=>{
    
    setGameStart(false)
  }
  return (

    <div className='card' >

      <div className={flipped ? 'flipped' : ''}>

      <img src={card.src} alt="" className='size front' style={{transform:gameStart?'rotateY(0deg)':''}} onClick={imageClickHandler}/>

        <img src="https://images.unsplash.com/photo-1509514026798-53d40bf1aa09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" onClick={handleClick} alt="" className='size back' style={{visibility:gameStart?'hidden':''}} />

      </div>

    
    </div>

  )
}
