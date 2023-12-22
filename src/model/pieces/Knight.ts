import { Cell } from "../BoardCell";
import { Colors } from "../Collors";
import { Piece, Pieces } from "./Piece";
// import blackLogo from '../../assets/black-knight.png'
// import whiteLogo from '../../assets/white-knight.png'
const blackLogo = import.meta.env.BASE_URL + 'assets/black-knight.png'
const whiteLogo = import.meta.env.BASE_URL + 'assets/white-knight.png'

export class Knight extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.type = Pieces.KNIGHT
    this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
    
  }

  private isReachedL(cell: Cell): boolean {
    const absY = Math.abs(cell.y - this.cell.y)
    const absX = Math.abs(cell.x - this.cell.x)


    return (absX + absY === 3 && absX !== 0 && absX !== 3)
  }

  public canMove(cell: Cell): boolean {
    if (!super.canMove(cell) ) return false
    
    return this.isReachedL(cell)
  }
}