import { Cell } from "../BoardCell";
import { Colors } from "../Collors";
import { Piece, Pieces } from "./Piece";
// import blackLogo from '../../assets/black-rook.png'
// import whiteLogo from '../../assets/white-rook.png'
const blackLogo = import.meta.env.BASE_URL + 'assets/black-rook.png'
const whiteLogo = import.meta.env.BASE_URL + 'assets/white-rook.png'

export class Rook extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.type = Pieces.ROOK
    this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
    
  }
  public canMove(cell: Cell): boolean {
    if (!super.canMove(cell) ) return false
    if (this.cell.isEmptyHorizontal(cell) ) return true
    if (this.cell.isEmptyVertical(cell) ) return true
    return false
  }
}