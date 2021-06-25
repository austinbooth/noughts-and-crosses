import { store } from '../types/store'
import { Winner } from '../types'

export const WinningMsg = () => {
    return (
        <>
            <p>{store.winner === Winner.tie ? 'Game tied' : `Game won by ${store.winner}`}</p>
            <button onClick={store.reset_game}>Play again</button>
        </>
    )
}