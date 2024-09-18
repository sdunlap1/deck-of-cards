import React from 'react';
import './Card.css';

const Card = ({ image, angle, xPos, yPos }) => {
  return (
    <img
      src={image}
      alt="Card"
      className="card"
      style={{ transform: `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)` }}
    />
  );
};

export default Card;
