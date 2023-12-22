import { Cell } from "../BoardCell";
import { Colors } from "../Collors";
import { Piece, Pieces } from "./Piece";
import blackLogo from '../../assets/black-bishop.png'
import whiteLogo from '../../assets/white-bishop.png'

export class Bishop extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.type = Pieces.BISHOP
    this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
  }

  public canMove(cell: Cell): boolean {
    if (!super.canMove(cell) ) return false
    if (this.cell.isEmptyDiagonal(cell) ) return true
    return false
  }
}