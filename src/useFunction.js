import React, { useState, useEffect } from 'react'
import data from '../database/Card-Flip.json'
export default function useFunction() {
    const [index, setIndex] = useState(0);
    const [cards, setCards] = useState([]);
    const [firstChoice, setFirstChoice] = useState(null);
    const [secondChoice, setSecondChoice] = useState(null);
    const [gameStart, setGameStart] = useState(true);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(90);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);
    const [count, setCount] = useState(5);
    const [clickCount, setClickCount] = useState(0);
    const [isPaused, setIsPaused] = useState(false); 
    const [isLoading, setIsLoading] = useState(true); 
    



    const handleChoice = (card) => {
        firstChoice ? setSecondChoice(card) : setFirstChoice(card)
    };

    const refreshWindow = () => window.location.reload(true);
    const heading = gameStart ? 'Remember the cards' : 'Match the pairs';

    const pauseTimer = () => setIsPaused(true);
    const resumeTimer = () => setIsPaused(false);

    //after complete first quiz go the second quiz
    useEffect(() => {
        if (clickCount === 6) {
            setGameEnd(true)
            setIndex(index + 1)
        }
    }, [clickCount]);


    //set time for game
    useEffect(() => {
        if (!gameStart && !isPaused) {
            const timerId = setInterval(() => {
                setTimer(prev => prev - 1)
            }, 1000)
            return () => clearInterval(timerId);
        }
    }, [gameStart, isPaused]);



    //restart the game when time over
    useEffect(() => {
        if (timer === 0 ) {
            window.location.reload();
        }
    }, [timer]);


    //quiz start after 8 sec
    useEffect(() => {
        shuffleCards(images)
        setTimeout(() => {
            setGameStart(false)
        }, 10000)
    }, []);


    // iterate and define the ID for images
    const images = data['Card-Flip'][index].imageSet
    const shuffleCards = () => {
        const shuffledCards = [...images, ...images]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))

        setCards(shuffledCards)
    };

    // start the second quiz
    useEffect(() => {
        if (clickCount === 6) {
            shuffleCards()
            setGameStart(true)
        }
    }, [clickCount === 6 && clickCount, gameEnd]);

    //gameStart
    useEffect(() => {
        setTimeout(() => {
            setGameStart(false)
        }, 10000)
    }, [gameEnd])


    //matched image condition based by clicking
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

    //initial matched image phase
    const resetTurn = () => {
        setFirstChoice(null)
        setSecondChoice(null);
    };

    //modal by click pause button
    const openModalHandler = () => {
        setModalIsOpen(true);
    };
    const closeModalHandler = () => {
        setModalIsOpen(false);
    };


    //counting-time game start withing 3 sec
    useEffect(() => {
        const countingTime = setInterval(() => {
            setCount(prev => prev - 1)
        }, 1000)
        return () => clearInterval(countingTime);
    }, [])

    //loading
    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        },2000)
    },[])

    return {
       isLoading, pauseTimer, resumeTimer, shuffleCards, handleChoice, refreshWindow, closeModalHandler, openModalHandler, heading, index, setIndex, cards, setCards, firstChoice, setFirstChoice, secondChoice, setSecondChoice, gameStart, setGameStart, score, setScore, timer, setTimer
        , modalIsOpen, setModalIsOpen, gameEnd, setGameEnd, count, setCount, clickCount, setClickCount
    }
}
