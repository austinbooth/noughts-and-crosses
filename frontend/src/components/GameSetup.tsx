import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { GameType } from '../types'
import { store } from '../types/store'
import { GameSelector } from './GameSelector'

export const GameSetup = observer(() => {
    const [boardSize, setBoardSize] = useState(3)
    const { game_type } = store
    return (
        <div>
            <label>Board side length:<input value={boardSize} onChange={(e) => setBoardSize(+e.target.value)}></input></label>
            <GameSelector />
            <button onClick={() => {
                if (game_type === GameType.COMPUTER_DUMB) {
                    store.create_board(boardSize)
                    store.start_game()
                }
                if (game_type === GameType.TWO_PLAYER) {
                    console.log('Two player game selected...')
                }
            }}>Start game</button>
        </div>
    )
})
