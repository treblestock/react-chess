import React, {FC} from "react"
import { Piece } from "../model/pieces"

interface ILostPiecesProps {
  title: string
  pieces: Piece[]
}

const LostPieces: FC<ILostPiecesProps> = ({title, pieces}) => {


  return (
    <div className="lost-pieces-section">
      <div className="lost-pieces-section__title">{title}</div>
      <div className="lost-pieces-section__pieces">
        {pieces.map(piece => 
          <div className="lost-pieces-section__piece piece"
            key={piece.id}
          >
            {piece?.logo && <img src={piece.logo}></img>}
          </div>
        )}
      </div>
    </div>
  )
}
export default LostPieces