import { store } from '../types/store'
import { GameType } from '../types'

export const GameSelector = () => {
    const { set_game_type } = store
    return (
        <label>
            Game type:
            <select onChange={e => {
                const selected = Object.values(GameType).find((v) => v === e.target.value)
                if (selected) set_game_type(GameType[selected])
            }}>
                <option value={GameType.COMPUTER_DUMB}>Play against computer</option>
            </select>
        </label>
    )
}
