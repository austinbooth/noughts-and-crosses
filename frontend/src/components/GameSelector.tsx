import { store } from '../types/store'
import { GameType } from '../types'

export const GameSelector = () => {
    const { game_type, set_game_type } = store
    return (
        <label>
            Game type:
            <select value={game_type} onChange={e => {
                const selected = Object.values(GameType).find((v) => v === e.target.value)
                if (selected) {
                    set_game_type(GameType[selected])
                }
            }}>
                <option value={GameType.COMPUTER_DUMB}>Play against computer</option>
                <option value={GameType.TWO_PLAYER}>Two player game</option>
            </select>
        </label>
    )
}
