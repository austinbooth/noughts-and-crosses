import { store } from '../types/store'

export const WinningMsg = () => {
    return (
        <>
            <p>Game won by {store.turn}</p>
            <button onClick={store.reset_game}>Play again</button>
        </>
    )
}