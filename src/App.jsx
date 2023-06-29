import React, { useState, useEffect } from 'react'
import './App.css';
import data from '../database/Card-Flip.json'
import SingleCard from './Components/singleCard/SingleCard';
import { FaPause } from 'react-icons/fa';
import Modal from './Components/modal/Modal'

export default function App() {
  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [gameStart, setGameStart] = useState(true);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(90);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [count, setCount] = useState(3);





  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (clickCount === 6) {
      setGameEnd(true)
      setIndex(index + 1)
    }
  }, [clickCount]);



  // const images =clickCount===6? data['Card-Flip'][1].imageSet: data['Card-Flip'][0].imageSet
  const images = data['Card-Flip'][index].imageSet

  const shuffleCards = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)

  };

  useEffect(() => {

    if (!gameStart) {
      const time = setInterval(() => {
        setTimer(prev => prev - 1)

      }, 1000)
      return () => clearInterval(time);
    }

  }, [gameStart]);

  useEffect(() => {
    if (timer === 0) {
      window.location.reload();
    }
  }, [timer])

  useEffect(() => {
    shuffleCards(images)
    setTimeout(() => {
      setGameStart(false)
    }, 5000)

  }, []);

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)

  };
  useEffect(() => {
    if (clickCount === 6) {
      shuffleCards()
      setGameStart(true)
    }
  }, [clickCount === 6 && clickCount,gameEnd]);

  useEffect(() => {
    setTimeout(() => {
      setGameStart(false)
    }, 5000)
  }, [gameEnd])


  useEffect(() => {

    if (firstChoice && secondChoice) {

      if (firstChoice.src === secondChoice.src) {
        setClickCount(clickCount + 1)
        setScore(prev => prev + 5)
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => {

          resetTurn()
        }, 700)
      }
    }


  }, [firstChoice, secondChoice]);
  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null);

  };



  const openModalHandler = () => {
    setModalIsOpen(true);
  };
  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  const refreshWindow = () => window.location.reload(true);



  const heading = gameStart ? 'Remember the cards' : 'Match pairs';

  useEffect(()=>{
   const countingTime= setInterval(()=>{
      setCount(prev=>prev-1)
    },1000)
    return () => clearInterval(countingTime);
  },[])
  return (
    <>
<div id='container'>
      <div id='app'>
        <button onClick={openModalHandler}> <FaPause /></button>
        <span>Score={score};</span>
        <span>Timer={timer}</span>
        <h1>{heading}</h1>
     
        {
          count>0?   <h2>{count}</h2>:
       
        <div id='box-grid'>

          {
            cards.map((card) => {
              return (
                <div key={card.id}>
                  <SingleCard card={card} handleChoice={handleChoice}
                    flipped={card === firstChoice || card === secondChoice || card.matched}
                    gameStart={gameStart} setGameStart={setGameStart}
                  />
                </div>
              )
            })
          }
        </div>
 }
      </div>

      {modalIsOpen && (
        <Modal onClose={closeModalHandler}>
          <h2>Memory Card</h2>
          <p>Remember the cards. Once the cards are flipped over, find the matching cards.</p><br /><br />
          <p>Remember the cards, even if the two cards you've turned are different. This way, you can match the cards more easily on the next move</p>
          <button onClick={closeModalHandler}>play</button>
          <button onClick={refreshWindow}>refresh</button>
        </Modal>
      )}
      </div>
    </>
  )
}
