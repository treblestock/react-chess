import { Cell } from "../BoardCell";
import { Colors } from "../Collors";
import { Piece, Pieces } from "./Piece";
import blackLogo from '../../assets/black-pawn.png'
import whiteLogo from '../../assets/white-pawn.png'

export class Pawn extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.type = Pieces.PAWN
    this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
    
  }

  public oneStep(cell: Cell): boolean {
    const dy = this.color === Colors.WHITE ? 1 : -1
    const isTheCell = cell.board.getCell(this.cell.x, this.cell.y + dy) === cell
    return isTheCell && cell.isEmpty
  }
  public doubleStep(cell: Cell): boolean {
    const startY = this.color === Colors.WHITE ? 1 : 6
    if (this.cell.y !== startY) return false
    
    const dy = this.color === Colors.WHITE ? 2 : -2
    const isTheCell = cell.board.getCell(this.cell.x, this.cell.y + dy) === cell
    return isTheCell && cell.isEmpty
  }

  public sideEat(cell: Cell): boolean {
    if (!this.isEnemy(cell) ) return false
    const dy = this.color === Colors.WHITE ? 1 : -1
    const res = this.cell.y + dy === cell.y && Math.abs(this.cell.x - cell.x) === 1

    return res
  }

  public canMove(cell: Cell): boolean {
    if (!super.canMove(cell) ) return false
    if (this.oneStep(cell) ) return true
    if (this.doubleStep(cell) ) return true
    if (this.sideEat(cell) ) return true
    return false
  }
}