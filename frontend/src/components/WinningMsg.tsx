import { store } from '../types/store'
import { Winner } from '../../common'

export const WinningMsg = () => {
    return (
        <>
            <p>{store.winner === Winner.tie ? 'Game tied' : `Game won by ${store.winner}`}</p>
            <button onClick={store.reset_game}>Play again</button>
        </>
    )
}