import { useState } from 'react'
import { store } from '../types/store'
import { GameSelector } from './GameSelector'

export const GameSetup = () => {
    const [boardSize, setBoardSize] = useState(3)
    return (
        <div>
            <label>Board side length:<input value={boardSize} onChange={(e) => setBoardSize(+e.target.value)}></input></label>
            <GameSelector />
            <button onClick={() => {
                store.create_board(boardSize)
                store.start_game()
            }}>Start game</button>
        </div>
    )
}