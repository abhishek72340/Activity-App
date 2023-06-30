import './App.css';
import SingleCard from './Components/singleCard/SingleCard';
import useFunction from './useFunction';
// import  useTimer  from './useTimer';
import Modal from './Components/modal/Modal'
import { FaPause } from 'react-icons/fa';
import refresh from '../src/screenshot/refresh.png';
import play from '../src/screenshot/play.png';

export default function App() {
  const { pauseTimer, resumeTimer, handleChoice, refreshWindow, timer, closeModalHandler, openModalHandler, heading, cards, firstChoice, secondChoice,
    gameStart, setGameStart, score, modalIsOpen, count, clickCount } = useFunction();


  return (
    <>
      <div id='container'>
        <nav>
          <span id='pause-icon' onClick={pauseTimer}><FaPause onClick={openModalHandler} /></span>

          <div id='score-timer'>
            <span>Score: {score}</span>
            <span>Timer: {timer}</span>
          </div>
        </nav>
      
        <div id='grid-heading-container'>
          <h1 id='heading'>{heading}</h1>
          <div>
          {
            count > 0 ? <h2 id='count-three-second'>{count}</h2> :

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
        </div>

      </div>

      {modalIsOpen && (
        <Modal onClose={closeModalHandler}  >
          <div id='modal-container'>
            <span id='modal-memory-card'>MEMORY CARDS</span>
            <p>Remember the cards. Once the cards are flipped over, find the matching cards.</p>
            <p>Remember the cards, even if the two cards you've turned are different. This way, you can match the cards more easily on the next move</p>

            <div id='modal-button'>
              <button onClick={closeModalHandler} id='play-button'><img src={play} alt="play" width='50px' onClick={resumeTimer} /></button>
              <button onClick={refreshWindow} id='refresh-button'><img src={refresh} alt="refresh" width='50px' /></button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
