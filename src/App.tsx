import { useEffect, useState } from 'react'
import './App.css'
import { Board as BoardModel } from './model/Board'
import { Player } from './model/Player'
import { Colors } from './model/Collors'

import Board from './components/Board'
import LostPieces from './components/LostPieces'
import Timer from './components/Timer'


function App() {
  const [board, setBoard] = useState(new BoardModel() )
  const [whitePlayer, ] = useState(new Player(Colors.WHITE) )
  const [blackPlayer, ] = useState(new Player(Colors.BLACK) )
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [eatenWhitePieces, ] = useState()

  useEffect(() => {
    restart()
  }, [])
  
  function restart() {
    const newBoard = new BoardModel()
    
    newBoard.initCells()
    newBoard.initPieces()
    
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer)
  }

  function togglePlayer() {
    currentPlayer === whitePlayer ? setCurrentPlayer(blackPlayer) : setCurrentPlayer(whitePlayer) 
  }


  
  return (
    <div className='app'>
      {board.cells.length && currentPlayer && (
        <Board
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          togglePlayer={togglePlayer}
        ></Board>
      )}
      
      <div className="lost-pieces">
        {currentPlayer && <Timer 
          restart={restart}
          currentPlayer={currentPlayer}
        />}
        <LostPieces
          title='съеденные фигуры белых:'
          pieces={board.eatenWhitePieces}
        />
        <LostPieces
          title='съеденные фигуры черных:'
          pieces={board.eatenBlackPieces}
        />
      </div>
    </div>
  )
}

export default App
