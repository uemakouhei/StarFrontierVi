
import FEL from './imgs/Fel-Hyu.jpg';
import CAM from './imgs/CAM-HYU.jpg';
import SOU from './imgs/SOU-HYU.jpg';
import SUN from './imgs/SUN-HYU.jpg';
import BUR from './imgs/BUR-HYU.jpg';
import NIP from './imgs/NIP-HYU.jpg';
import SOL from './imgs/SOL-HYU.jpg';

// src/pieces.js

const getCardData = (type, player) => {
  const card = CardsData.find(card => card.type === type.toString());
  return { ...card, player };
};

export const CardsData  = [
  { type: "1" ,  ID: 1,Name : "中央情報局長官 フェルナンド"  , Cardimg : "https://lh3.googleusercontent.com/d/1OLFDkggTIgKzow5iNwBm8RuiYneN7P5Z", Chipimg : FEL  , txt : "" , HP : 2 ,CP : 2 ,LS : 2 , Ceffect : "自分のターン終了時まで、味方のソルジャーは収集に失敗した時,もう一度収集できる。",  Meffect : "相手のカードの持つ資源を2枚選択する。そのカード2枚とこのカードの持つ資源2枚と交換する。" , Mcost : 10} ,

  {  type: "2" ,  ID: 2,Name : "Mr. mind CEO　サンチェス -Hari Kings-"  , Cardimg : "https://lh3.googleusercontent.com/d/1z07sYSOW_WgPP3sb_u9xCJG5GaBodUoK", Chipimg : SUN  , txt : "" , HP : 2 ,CP : 2 ,LS : 3 , Ceffect : "味方が所有する資源を1枚選びこのカードの下に置く",  Meffect : "自身のフィールドのリーダー全ては、シールドを+1する。" , Mcost : 7} ,

  {   type: "3" , ID: 3,Name : "真紅の女帝 カミラ-Hari Kings-"  , Cardimg : "https://lh3.googleusercontent.com/d/1zCCKOBjLvzEAYu3GMlk_WOehQ08coLyX", Chipimg : CAM  , txt : "" , HP : 2 ,CP : 2 ,LS : 2 , Ceffect : "味方の　悟　タイプのソルジャーと自分の位置を交換する。魔法エーテルを+1する。",  Meffect : "相手の 情 タイプのソルジャーを1枚選択し破壊する。その駒は相手の持ち駒となる。" , Mcost : 5} ,

  {   type: "4" , ID: 4,Name : "豪商　ニッパ -Hari Kings-"  , Cardimg : "https://lh3.googleusercontent.com/d/1NAcQYwj-gsb-J2MzyR5Nf0ovTWadP94Y", Chipimg : NIP  , txt : "" , HP : 1 ,CP : 2 ,LS : 3 , Ceffect : "1枚カードを収集する。",  Meffect : "自分のフィールドのリーダ全ては、所持資源の数だけシールドを+1する" , Mcost : 10} ,

  {   type: "5" , ID: 5,Name : "総統 -Hari Kings-"  , Cardimg : "https://lh3.googleusercontent.com/d/1R22_1DR6Igs7i8_Md526CnAoBUeYAch1", Chipimg : SOU  , txt : "" , HP : 3 ,CP : 3 ,LS : 4 , Ceffect : "前のターン、味方のソルジャーが破壊されていた場合、1枚カードを収集する。",  Meffect : "相手のリーダーと自分のリーダーを1枚選択する。ターン終了時まで資源を交換する。" , Mcost : 15} ,

  {   type: "6" , ID: 6,Name : "猿の王 ブラウ -Hari Kings-"  , Cardimg : "https://lh3.googleusercontent.com/d/14LBHN_m9jwP9B4HLhVD0b51Xt9KvbBkK", Chipimg : BUR , txt : "" , HP : 3 ,CP : 2 ,LS : 3 , Ceffect : "情 タイプのソルジャーを1体生贄に捧げることで、ターン終了時までこのカードの移動回数を+1する。(生贄と破壊は区分される)",  Meffect : "自分のソルジャーを1体選択する。そのカードの移動回数を+1する。" , Mcost : 7} ,

  {   type: "7" ,ID: 7 ,Name : "一般兵士"  , Cardimg : "https://lh3.googleusercontent.com/d/14LBHN_m9jwP9B4HLhVD0b51Xt9KvbBkK", Chipimg : SOL , txt : "" , HP : 1 ,CP : 1 ,LS : 1 , Ceffect : "情 タイプのソルジャーを1体生贄に捧げることで、ターン終了時までこのカードの移動回数を+1する。(生贄と破壊は区分される)",  Meffect : "自分のソルジャーを1体選択する。そのカードの移動回数を+1する。" , Mcost : 7} ,
]

export const initialBoard = [
  [
    null,
    getCardData(2, 'player2'),
    null,
    getCardData(4, 'player2'),
    null,
    getCardData(5, 'player2'),
    null,
  ],
  [
    null,
    getCardData(7, 'player2'),
    null,
    getCardData(7, 'player2'),
    null,
    getCardData(7, 'player2'),
    null,
  ],
  [{ type: 'ether' }, { type: 'ether' }, { type: 'ether' }, { type: 'ether' }, { type: 'ether'}, { type: 'ether' }, { type: 'ether' }],
  [{ type: 'jewel' }, { type: 'ether' }, { type: 'jewel' }, { type: 'ether' }, { type: 'jewel' }, { type: 'ether' }, { type: 'jewel' }],
  [{ type: 'ether' }, { type: 'jewel' },  { type: 'ether' }, { type: 'jewel' }, { type: 'ether' }, { type: 'jewel' }, { type: 'ether' }],
  [{ type: 'ether' }, { type: 'ether' }, { type: 'ether' }, { type: 'ether' }, { type: 'ether'}, { type: 'ether' }, { type: 'ether' }],
  [
    null,
    getCardData(7, 'player1'),
    null,
    getCardData(7, 'player1'),
    null,
    getCardData(7, 'player1'),
    null,
  ],
  [
    null,
    getCardData(1, 'player1'),
    null,
    getCardData(5, 'player1'),
    null,
    getCardData(3, 'player1'),
    null,
  ],
];

const moveVectors = {
  1: [
    [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1],
  ],
  2: [
    [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1],
  ],
  3: [
    [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1],
  ],
  4: [
    [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1],
  ],
  5: [
    [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1],
  ],
  6: [
    [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1],
  ],
  7: [
    [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1],
  ],
  8: [
    [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1],
  ],
};

export const canMove = (piece, fromRow, fromCol, toRow, toCol, board) => {
  if (!piece) return false;
  const vectors = moveVectors[piece.type];
  const playerDirection = piece.player === 'player1' ? 1 : -1; // プレイヤー1とプレイヤー2で進む方向を反転する
  for (let [dr, dc] of vectors) {
    let r = fromRow + dr * playerDirection;
    let c = fromCol + dc * playerDirection;
    while (r >= 0 && r < 8 && c >= 0 && c < 7) {
      if (r === toRow && c === toCol) {
        if (!board[toRow][toCol] || board[toRow][toCol].player !== piece.player) {
          return true;
        }
        break;
      }
      if (piece.type === 'lance' || piece.type === 'rook' || piece.type === 'bishop') {
        r += dr * playerDirection;
        c += dc * playerDirection;
      } else {
        break;
      }
    }
  }
  return false;
};

export const getMoveablePositions = (piece, fromRow, fromCol, board) => {
  if (!piece) return [];
  const vectors = moveVectors[piece.type];
  const playerDirection = piece.player === 'player1' ? 1 : -1; // プレイヤー1とプレイヤー2で進む方向を反転する
  const positions = [];
  for (let [dr, dc] of vectors) {
    let r = fromRow + dr * playerDirection;
    let c = fromCol + dc * playerDirection;
    while (r >= 0 && r < 8 && c >= 0 && c < 7) {
      if (!board[r][c] || board[r][c].player !== piece.player) {
        positions.push([r, c]);
        if (board[r][c]) break;
      } else {
        break;
      }
      if (piece.type === 'lance' || piece.type === 'rook' || piece.type === 'bishop') {
        r += dr * playerDirection;
        c += dc * playerDirection;
      } else {
        break;
      }
    }
  }
  return positions;
};
