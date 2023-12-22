import React, {FC, useEffect, useMemo, useRef, useState} from "react"
import { Player } from "../model/Player"
import { Colors } from "../model/Collors"


interface ITimerProps {
  currentPlayer: Player,
  restart: () => void
}

const Timer: FC<ITimerProps> = ({currentPlayer, restart}) => {
  const [whiteTime, setWhiteTime] = useState<number>(300)
  const [blackTime, setBlackTime] = useState<number>(300)

  // (1) time for each player saves from turn to turn
  const currentTime = useMemo(
    () => currentPlayer.color === Colors.WHITE ? whiteTime : blackTime,
    [currentPlayer, whiteTime, blackTime]
  )


  const timer = useRef<null | ReturnType <typeof setInterval> >(null)
  
  function startTime(): void {
    if (timer.current) {
      clearInterval(timer.current)
    }

    const cb = currentPlayer.color === Colors.WHITE ? decrementWhiteTime : decrementBlackTime
    timer.current = setInterval(cb, 1000)
  }
  


  useEffect(() => {
    startTime()
  }, [currentPlayer])
  
  function decrementWhiteTime(): void {
    setWhiteTime(prev => prev - 1)
  }
  function decrementBlackTime(): void {
    setBlackTime(prev => prev - 1)
  }


  function restartGame() {
    setWhiteTime(300)
    setBlackTime(300)
    restart()
  }

  return (
    <div className="timer">
      <div>ход {currentPlayer.color === Colors.WHITE ? 'белых' : 'черных'} {currentTime}</div>
      <div>
        <button onClick={restartGame}>restart</button>
      </div>
    </div>
  )
}
export default Timer