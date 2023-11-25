import React from "react";
import "./SingleCard.css";
import stone from "../../screenshot/stone.png";
export default function SingleCard({
  card,
  handleChoice,
  flipped,
  gameStart,
  setGameStart,
}) {
  const handleClick = () => {
    handleChoice(card);
  };

  const imageClickHandler = () => {
    setGameStart(false);
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img
          src={card.src}
          alt=""
          className="size front"
          style={{ transform: gameStart ? "rotateY(0deg)" : "" }}
          onClick={imageClickHandler}
        />

        <img
          src={stone}
          onClick={handleClick}
          alt=""
          className="size back"
          style={{ visibility: gameStart ? "hidden" : "" }}
        />
      </div>
    </div>
  );
}

// quiz

///Feature branch
