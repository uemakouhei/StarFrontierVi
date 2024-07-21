// src/components/Square.js
import React from 'react';
import FEL  from '../imgs/Fel-Hyu.jpg';
import CAM  from '../imgs/CAM-HYU.jpg';
import SOU  from '../imgs/SOU-HYU.jpg';
import SUN  from '../imgs/SUN-HYU.jpg';
import BUR  from '../imgs/BUR-HYU.jpg';
import NIP  from '../imgs/NIP-HYU.jpg';
import SOL  from '../imgs/SOL-HYU.jpg';

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
  };

  return <span><img style={{ width : "100%" , height : "100%"}} src={symbols[piece.type]}/></span>;
};

const Square = ({ piece, onClick, isSelected, isMoveable }) => {
  return (
    <div 
      onClick={onClick} 
      style={{
        width: '50px',
        height: '50px',
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isSelected ? 'yellow' : (isMoveable ? 'lightyellow' : (piece && piece.player === 'player1' ? 'lightblue' : 'lightcoral'))
      }}>
      {piece && <Piece piece={piece} />}
    </div>
  );
};

export default Square;
