import { Cell } from "../BoardCell";
import { Colors } from "../Collors";
import { Piece, Pieces } from "./Piece";
// import blackLogo from '../../assets/black-queen.png'
// import whiteLogo from '../../assets/white-queen.png'
const blackLogo = import.meta.env.BASE_URL + 'assets/black-queen.png'
const whiteLogo = import.meta.env.BASE_URL + 'assets/white-queen.png'

export class Queen extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.type = Pieces.QUEEN
    this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
    
  }

  public canMove(cell: Cell): boolean {
    if (!super.canMove(cell) ) return false
    if (this.cell.isEmptyHorizontal(cell) ) return true
    if (this.cell.isEmptyVertical(cell) ) return true
    if (this.cell.isEmptyDiagonal(cell) ) return true
    return false
  }
}