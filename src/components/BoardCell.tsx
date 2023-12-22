import React, {FC} from "react"
import { Cell as BoardCellModel } from "../model/BoardCell"

interface IBoardCellProps {
  cell: BoardCellModel,
  selectedCell: BoardCellModel | null,
  click: (cell: BoardCellModel) => void,
}


const BoardCell: FC<IBoardCellProps> = ({cell, selectedCell, click}) => {
  
  return (
    <div 
      className={[
        'board-cell',
        cell.color,
        selectedCell?.x === cell.x && selectedCell?.y === cell.y ? 'selected' : '',
        cell.isAvailable && cell.piece ? 'available-with-piece' : '',
      ].join(' ')}
      onClick={() => click(cell)}
    >
      {cell.isAvailable && !cell.piece && <div className="available"></div>}
      <div className="piece">
        {cell.piece?.logo && <img src={cell.piece.logo}></img>}
      </div>
    </div>
  )
}



export default BoardCell