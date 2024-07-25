import React from 'react';
import FEL from '../imgs/Fel-Hyu.jpg';
import CAM from '../imgs/CAM-HYU.jpg';
import SOU from '../imgs/SOU-HYU.jpg';
import SUN from '../imgs/SUN-HYU.jpg';
import BUR from '../imgs/BUR-HYU.jpg';
import NIP from '../imgs/NIP-HYU.jpg';
import SOL from '../imgs/SOL-HYU.jpg';
import JEW from '../imgs/Jewel.png';
import ETH from '../imgs/ether.png';
import { CardsData } from '../pieces';

const Piece = ({ piece }) => {
  if (!piece) return null;
  const symbols = {
    1: CardsData[0]?.Chipimg,
    2: CardsData[1]?.Chipimg,
    3: CardsData[2]?.Chipimg,
    4: CardsData[3]?.Chipimg,
    5: CardsData[4]?.Chipimg,
    6: CardsData[5]?.Chipimg,
    7: CardsData[6]?.Chipimg,
    jewel: JEW,
    ether: ETH,
  };

  return <img style={{ width: "90%", height: "90%" ,borderRadius:"4px"}} src={symbols[piece.type]} />;
};

const Square = ({ piece, onClick, isSelected, isMoveable }) => {
  const squareClass = isMoveable ? 'blinking' : '';
  return (
    <div 
      onClick={onClick} 
      className={squareClass}
      style={{
        width: '100%',
        height: '100%',
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: isSelected ? 'yellow' : 'rgba(128, 128, 128, 0.2)',
        transform: piece?.player == "player2" ? "rotate(180deg)" : "",
      }}
    >
      {piece && <Piece piece={piece} />}
    </div>
  );
};

export default Square;
