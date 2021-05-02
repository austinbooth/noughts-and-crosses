import { store } from '../types/store'
import { Turn } from '../types'
import { getSnapshot } from 'mobx-state-tree'

const callGameFunctions = (newBoard: string[][], turn:Turn = Turn.player1, displaySnapshots = false) => {
    const boardSideLength = newBoard[0].length
    store.create_board(boardSideLength, newBoard)
    store.start_game()
    if (turn) store.set_turn(turn)
    store.stop_game()
    store.check_if_won_and_toggle_turn()
    if (displaySnapshots) {
    console.log(getSnapshot(store.board))
    console.log(getSnapshot(store))
    }
}

describe('Test whether the game has been won',()=>{
    test('Not won', ()=>{
        const newBoard = [
            [ 'X', '', '', '' ],
            [ 'O', '', '', '' ],
            [ 'X', '', '', '' ],
            [ '', '', '', '' ]
        ]
        callGameFunctions(newBoard)
        expect(store.winner).toEqual(null)
    })
    test('Won by player 1', ()=>{
        const newBoard = [
            [ 'X', '', '', '' ],
            [ 'X', '', '', '' ],
            [ 'X', '', '', '' ],
            [ '', '', '', '' ]
        ]
        callGameFunctions(newBoard)
        expect(store.winner).toEqual('player1')
    })
    test('Won by player 2', ()=>{
        const newBoard = [
            [ 'O', '', '', '' ],
            [ 'O', '', '', '' ],
            [ 'O', '', '', '' ],
            [ '', '', '', '' ]
        ]
        callGameFunctions(newBoard, Turn.player2, true)
        expect(store.winner).toEqual('player2')
    })
    test('Won by player 1 - unusual diagonal', () => {
        const newBoard = [
            [ 'X', 'X', '', '' ],
            [ 'O', '', 'X', '' ],
            [ 'X', '', '', 'X' ],
            [ '', '', '', '' ]
        ]
        callGameFunctions(newBoard)
        expect(store.winner).toEqual('player1')
    })
})