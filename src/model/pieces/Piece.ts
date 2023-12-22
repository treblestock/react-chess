import { Cell } from "../BoardCell";
import { Colors } from "../Collors";
import someLogo from '../../assets/black-bishop.png'

export enum Pieces {
  PIECE = 'piece',
  PAWN = 'pawn',
  BISHOP = 'bishop',
  KNIGHT = 'knight',
  ROOK = 'rook',
  QUEEN = 'queen',
  KING = 'king',
}


// interface IPiece {
//   id: number
//   cell: Cell
//   color: Colors
//   type: Pieces
// }

export class Piece {
  id: number
  cell: Cell
  color: Colors
  type: Pieces
  logo: typeof someLogo | null


  constructor(color: Colors, cell: Cell) {
    this.id = Math.random()
    this.type = Pieces.PIECE
    this.color = color
    this.logo = null
    this.cell = cell
    this.cell.piece = this
  }

  public canMove(cell: Cell): boolean {
    if (cell === this.cell) return false
    if (cell?.piece?.color === this.color) return false
    if (cell?.piece?.type === Pieces.KING) return false
    return true
  }

  public move(cell: Cell): void {
    if (cell.piece) this.cell.board.addEatenPiece(cell.piece)
    this.cell.piece = null
    this.cell = cell
    this.cell.piece = this


  }

  public isEnemy(cell: Cell): boolean {
    if (!cell.piece) return false
    return (cell.piece.color !== this.color)
  }
  public isCellAttackedByEnemy(cell: Cell): boolean {
    return false // todo

    const enemyColor = this.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE
    const formatedEnemyColor = enemyColor[0].toUpperCase() + enemyColor.slice(1)
    // @ts-ignore
    return cell['isAttackedBy' + formatedEnemyColor]
  }
}