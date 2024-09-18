import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Deck.css';

const Deck = () => {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [remaining, setRemaining] = useState(52);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    async function createDeck() {
      const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await res.json();
      setDeckId(data.deck_id);
    }
    createDeck();
  }, []);

  const drawCard = async () => {
    if (remaining === 0) {
      alert('Error: no cards remaining!');
      return;
    }

    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await res.json();

    // Generate a random position and angle for the new card
    const newCard = {
      ...data.cards[0],
      angle: Math.random() * 60 - 30,  // Random angle between -30 and 30 degrees
      xPos: Math.random() * 40 - 20,   // Random horizontal offset
      yPos: Math.random() * 40 - 20    // Random vertical offset
    };

    setCards((prevCards) => [...prevCards, newCard]);
    setRemaining(data.remaining);
  };

  const shuffleDeck = async () => {
    setIsShuffling(true);
    await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    setCards([]);
    setRemaining(52);
    setIsShuffling(false);
  };

  return (
    <div className="deck">
      <button onClick={drawCard} disabled={remaining === 0}>
        {remaining === 0 ? 'No Cards Left' : 'Deal a Card'}
      </button>
      <button onClick={shuffleDeck} disabled={isShuffling}>
        {isShuffling ? 'Shuffling...' : 'Shuffle Deck'}
      </button>
      <div className="deck-cards">
        {cards.map((card, idx) => (
          <Card key={idx} image={card.image} angle={card.angle} xPos={card.xPos} yPos={card.yPos} />
        ))}
      </div>
    </div>
  );
};

export default Deck;
