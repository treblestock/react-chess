// @ts-nocheck
import {Cell} from './BoardCell'
import { Colors } from './Collors'
import * as Pieces from './pieces'
import { piecesPositions, Piece } from './pieces'

export interface IBoard {
  cells: Cell[][]
  initCells: () => void
}




export class Board implements IBoard{
  cells: Cell[][] = []
  eatenBlackPieces: Piece[] = []
  eatenWhitePieces: Piece[] = []
  piecesOnBoard: Set<Piece> = new Set()


  public getCopyBoard(): Board {
    const newBoard = new Board()
    newBoard.cells = this.cells
    return newBoard
  }

  public initCells(): void {
    for (let i = 0; i < 8; i++) {
      const cellsRow: Cell[] = []
      this.cells.push(cellsRow)

      for (let j = 0; j < 8; j++) {
        const cellColor = (i + j) % 2 ? Colors.BLACK : Colors.WHITE
        const newCell = new Cell(j, i, cellColor, this, null)
        cellsRow.push(newCell)
      } 
    }
  }
  public forEachCell(cb) {
    for (const row of this.cells) {
      for (const cell of row) {
        cb(cell)
      }
    }
  }
  
  public getCell(x: number, y: number): Cell {
    return this.cells[y][x]
  }
  public initPieces(piecesPlacemantRules = piecesPositions): void {

    for (const pieceTypeAndColor in piecesPlacemantRules) {
      const [piece, color] = pieceTypeAndColor.split(' ')
      
      const positions = piecesPlacemantRules[pieceTypeAndColor] 
      
      for (const position of positions) {
        const cell = this.getCell(...position)
        const newPiece = new Pieces[piece](color, cell)
        this.piecesOnBoard.add(newPiece)
      }
     
    }
  }

  public addEatenPiece(piece: Piece) {
    const lostPieces = piece.color === Colors.WHITE ? this.eatenWhitePieces : this.eatenBlackPieces
    lostPieces.push(piece)
  }



  public highlightCells(selectedCell: Cell | null): void {
    if (!selectedCell) {
      this.forEachCell((cell: Cell) => cell.isAvailable = false)
      return
    }

    function highlightAvalable(cell: Cell): void {
      cell.isAvailable = selectedCell?.piece.canMove(cell)
    }
    this.forEachCell((cell) => highlightAvalable(cell) )
  }
}