import './App.css';
import SingleCard from './Components/singleCard/SingleCard';
import { FaPause } from 'react-icons/fa';
import Modal from './Components/modal/Modal'
import useFunction from './useFunction';

export default function App() {
  const { handleChoice, refreshWindow, closeModalHandler, openModalHandler, heading, cards, firstChoice, secondChoice,
    gameStart, setGameStart, score, timer, modalIsOpen, count, clickCount } = useFunction();

  return (
    <>
      <div id='container'>
        {/* <div id='app'> */}
        <div id='nav'>
          <span><FaPause onClick={openModalHandler} /></span>

          <h1>{heading}</h1>

          <div>
            <span>Score={score}</span>
            <span>Timer={timer}</span>
          </div>

        </div>
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

      {modalIsOpen && (
        <Modal onClose={closeModalHandler}>
          <h2>Memory Card</h2>
          <p>Remember the cards. Once the cards are flipped over, find the matching cards.</p><br /><br />
          <p>Remember the cards, even if the two cards you've turned are different. This way, you can match the cards more easily on the next move</p>
          <button onClick={closeModalHandler}>play</button>
          <button onClick={refreshWindow}>refresh</button>
        </Modal>
      )}
      {/* </div> */}
    </>
  )
}
