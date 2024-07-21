// src/pieces.js
export const initialBoard = [
  [
    null,
    { type: 'silver', player: 'player2' },
    null,
    { type: 'king', player: 'player2' },
    null,
    { type: 'gold', player: 'player2' },
    null,
  ],
  [
    null,
    { type: 'pawn', player: 'player2' },
    null,
    { type: 'pawn', player: 'player2' },
    null,
    { type: 'pawn', player: 'player2' },
    null,
  ],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [
    null,
    { type: 'pawn', player: 'player1' },
    null,
    { type: 'pawn', player: 'player1' },
    null,
    { type: 'pawn', player: 'player1' },
    null,
  ],
  [
    null,
    { type: 'silver', player: 'player1' },
    null,
    { type: 'king', player: 'player1' },
    null,
    { type: 'gold', player: 'player1' },
    null,
  ],
];

const moveVectors = {
  king: [
    [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1],
  ],
  gold: [
    [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1],
  ],
  silver: [
    [-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 1],
  ],
  knight: [
    [-2, -1], [-2, 1],
  ],
  lance: [
    [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], // ランスは一直線に何マスでも進める
  ],
  rook: [
    [-1, 0], [1, 0], [0, -1], [0, 1], // ルークは一直線に何マスでも進める
  ],
  bishop: [
    [-1, -1], [-1, 1], [1, -1], [1, 1], // ビショップは斜めに何マスでも進める
  ],
  pawn: [
    [-1, 0],
  ],
};

export const canMove = (piece, fromRow, fromCol, toRow, toCol, board) => {
  if (!piece) return false;
  const vectors = moveVectors[piece.type];
  const playerDirection = piece.player === 'player1' ? 1 : -1; // プレイヤー1とプレイヤー2で進む方向を反転する
  for (let [dr, dc] of vectors) {
    let r = fromRow + dr * playerDirection;
    let c = fromCol + dc * playerDirection;
    while (r >= 0 && r < 6 && c >= 0 && c < 7) {
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
    while (r >= 0 && r < 6 && c >= 0 && c < 7) {
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