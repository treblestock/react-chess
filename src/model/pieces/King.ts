import { Cell } from "../BoardCell";
import { Colors } from "../Collors";
import { Piece, Pieces } from "./Piece";
import blackLogo from '../../assets/black-king.png'
import whiteLogo from '../../assets/white-king.png'

export class King extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.type = Pieces.KING
    this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
    
  }

  public isInRangeOneCell(cell: Cell): boolean {
    const absY = Math.abs(this.cell.y - cell.y)
    const absX = Math.abs(this.cell.x - cell.x)
    return absY < 2 && absX < 2
  }

  public canMove(cell: Cell): boolean {
    if (!super.canMove(cell) ) return false
    if (!this.isInRangeOneCell(cell) ) return false
    return !this.isCellAttackedByEnemy(cell)
  }
}