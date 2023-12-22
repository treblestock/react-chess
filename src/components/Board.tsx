import React, {FC, useEffect, useState} from "react"
import { Board as BoardModel } from "../model/Board"
import { Cell as BoardCellModel } from "../model/BoardCell"
import BoardCell from "./BoardCell"
import { Player } from "../model/Player"
import { Colors } from "../model/Collors"

interface IBoardProps {
  board: BoardModel,
  setBoard: (board: BoardModel) => void
  currentPlayer: Player ,
  togglePlayer: () => void,
}

const Board: FC<IBoardProps> = ({board, setBoard, currentPlayer, togglePlayer}) => {
  const [updationKey, setUpdationKey] = useState(Date.now() )
  function forceUpdate() {
    setUpdationKey(Date.now() )
  }


  const [selectedCell, setSelectedCell] = useState<BoardCellModel | null>(null) 
  
  function click(cell: BoardCellModel) {
    // if (!selectedCell) {
    //   if (cell.color !== currentPlayer.color) return
    //   if (!cell.piece) return
    //   setSelectedCell(cell)
    //   return
    // } 
    // if (!selectedCell.piece) return

    // if (selectedCell === cell) {
    //   setSelectedCell(null)
    //   return
    // }
    // if (selectedCell.piece.canMove(cell) ) {
    //   selectedCell.piece.move(cell)
    //   setSelectedCell(null)
    //   togglePlayer()
    //   return
    // }

    if (selectedCell && selectedCell.piece?.canMove(cell) ) {
      selectedCell.piece.move(cell)
      setSelectedCell(null)
      togglePlayer()
    } else {
      if (cell.piece?.color !== currentPlayer.color) return
      if (selectedCell) setSelectedCell(null)
      else setSelectedCell(cell)
    }
    
  }

  useEffect(() => {
    highlightCells()
  }, [selectedCell])

  function highlightCells() {
    board.highlightCells(selectedCell)
    forceUpdate()
  }

  const orderedCells: BoardCellModel[][] = currentPlayer.color === Colors.WHITE 
    ? board.cells.slice(0).reverse() 
    : board.cells
  

  return (
    <div className="board"> 
      {orderedCells.map((cellsRow, ind) => 
        <React.Fragment key={ind}>
          {cellsRow.map(cell => 
            <BoardCell
              cell={cell}
              key={cell.id}
              selectedCell={selectedCell}
              click={click}
            />
          )}
        </React.Fragment>
      )}

    </div>
  )
}



export default Board