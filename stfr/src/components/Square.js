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

const Piece = ({ piece }) => {
  if (!piece) return null;
  const symbols = {
    knight: SUN,
    silver: FEL,
    gold: CAM,
    king: SOU,
    rook: BUR,
    bishop: NIP,
    pawn: SOL,
    jewel: JEW,
    ether: ETH,
  };

  return <img style={{ width: "100%", height: "100%" }} src={symbols[piece.type]} />;
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
      }}
    >
      {piece && <Piece piece={piece} />}
    </div>
  );
};

export default Square;
