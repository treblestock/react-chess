import {Colors} from './Collors.ts'
import { Board } from './Board.ts'
import { Piece } from './pieces'

export class Cell {
  readonly x: number
  readonly y: number
  readonly color: Colors
  readonly id: number
  isAvailable: boolean
  isAttackedByWhite: boolean
  isAttackedByBlack: boolean
  piece: Piece | null
  board: Board


  constructor(x: number, y: number, color: Colors, board: Board, piece: (Piece | null) = null) {
    this.x = x
    this.y = y
    this.color = color
    this.board = board
    this.piece = piece
    this.id = Math.random()
    this.isAvailable = false
    this.isAttackedByWhite = false
    this.isAttackedByBlack = false
  }

  public isEmptyVertical(cell: Cell): boolean {
    if (this.x !== cell.x) return false
    
    const min = Math.min(this.y, cell.y) 
    const max = Math.max(this.y, cell.y) 

    for (let i = min + 1; i < max; i++) {
      if (!this.board.getCell(this.x, i).isEmpty ) return false
    }
    return true
  }
  public isEmptyHorizontal(cell: Cell): boolean {
    if (this.y !== cell.y) return false
    
    const min = Math.min(this.x, cell.x) 
    const max = Math.max(this.x, cell.x) 

    for (let i = min + 1; i < max; i++) {
      if (!this.board.getCell(i, this.y).isEmpty ) return false
    }
    return true
  }
  public isEmptyDiagonal(cell: Cell): boolean {
    const absY = Math.abs(cell.y - this.y)
    const absX = Math.abs(cell.x - this.x)

    if (absX !== absY) return false

    const dy = this.y < cell.y ? 1 : -1
    const dx = this.x < cell.x ? 1 : -1

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty ) return false
    }
    return true
  }

  public get isEmpty(): boolean {
    return !this.piece
  }
}