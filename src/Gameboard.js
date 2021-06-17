import RickImage from "./images/Rick.png";
import MortyImage from "./images/Morty.jpg";
import JessicaImage from "./images/Jessica.png";
import SummerImage from "./images/Summer.jpg";
import ImageComponent from "./Card";
import { useEffect, useState } from "react";

let Cards = [
  { image: RickImage, name: "Rick", id: 0 },
  { image: MortyImage, name: "Morty", id: 1 },
  { image: JessicaImage, name: "Jessica", id: 2 },
  { image: SummerImage, name: "Summer", id: 3 },
];

// Shuffle function is Fisher-Yates algorithm modified to give only derangements

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (1 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    if (currentIndex - 1 !== randomIndex) {
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  return array;
}

function Gameboard(props) {
  let [stateCards, setCards] = useState(Cards);
  let [clickHistory, setClickHistory] = useState([]);
  let [score, setScore] = useState(0);

  let checkMemory = (id) => {
    if (clickHistory.includes(id)) {
      console.log('Wrong!')  
      setScore(0);
      setClickHistory([]);
      shuffleCards();  
    }
    else {
        console.log('Nice!')
        let newClickHistory = [...clickHistory, id]
        setClickHistory(newClickHistory)
        let newScore = score + 1
        setScore(newScore);
    }
  };

  let shuffleCards = () => {
    let shuffled = shuffle([...stateCards]);

    setCards(shuffled);
  };

  let Update = (e) => {
    const id = e.currentTarget.id
    checkMemory(id);
    shuffleCards();
    console.log(stateCards)
  };

  return (<div className = "gameboard-container">
      score: {score}
    <div className="nes-container gameboard">
      {stateCards.map((card) => {
        return (
          <ImageComponent
            image={card.image}
            name={card.name}
            id={card.id}
            onClick={Update}
            key = {card.id}
          />
        );
      })}
    </div>
    </div>
  );
}

export default Gameboard;
