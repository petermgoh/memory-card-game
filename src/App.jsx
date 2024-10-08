import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header';
import Card from './components/Card';

let maxScore = 0

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currScore, setCurrScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([])

  const randomizeCards = (cards) => {
    let shuffledCards = [...cards];
    let currentIndex = shuffledCards.length;
    
    // if (currentIndex === 0) {
    //   console.error('Cannot shuffle an empty cards array');
    //   return;
    // }
  
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // console.log('currentIndex:', currentIndex, 'randomIndex:', randomIndex);
  
      [shuffledCards[currentIndex], shuffledCards[randomIndex]] = 
        [shuffledCards[randomIndex], shuffledCards[currentIndex]];
      
    }
    return shuffledCards
    // setCards(shuffledCards);
    // console.log('Shuffled Cards:', shuffledCards);
  };
  
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          'https://marvel-snap-api.p.rapidapi.com/api/get-card-variants/Magik', 
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'marvel-snap-api.p.rapidapi.com',
              'x-rapidapi-key': '37da9cec52msh64440760aa8b1eep1239abjsn286419c7c0ab',
            }
          },
        );
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        while (data.length > 12) {
          data.pop()
        }
        setCards(data)
        setLoading(false)
      } catch (err) {
        setError('Error fetching card data')
        setLoading(false)
      }
    }
    fetchCards()
  }, [])

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  
  const handleClick = (card) => {
    if (clickedCards.includes(card)) {
      maxScore = Math.max(maxScore, currScore)
      setCurrScore(0)
      setClickedCards([])
    } else {
      setClickedCards((clickedCards) => [...clickedCards, card])
      setCurrScore(currScore + 1)
    }
    // randomizeCards()
  }

  const shuffledCards = randomizeCards(cards)
  return (
    <div>
      <Header 
        currScore={currScore}
        maxScore={maxScore}
      />
      <div className='grid'>
        {shuffledCards.map((card) => (
          <Card card={card} handleClick={handleClick} key={card.id}/>
        ))}
      </div>
    </div>
  );
}

export default App
