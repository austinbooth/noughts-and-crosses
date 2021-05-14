import { store } from '../types/store'
import { getSnapshot } from 'mobx-state-tree'
import { get_diagonals } from '../types/Square'

const callGameFunctions = (newBoard: string[][], displaySnapshots: boolean = false) => {
    const boardSideLength = newBoard[0].length
    store.create_board(boardSideLength, newBoard)
    store.start_game()
    store.stop_game()
    store.check_if_won_and_toggle_turn()
    if (displaySnapshots) {
        console.log(getSnapshot(store.board))
        console.log(getSnapshot(store))
    }
}

describe('Test get_diagonals - correctly gets all diagonals from a given game board', () => {
    test('2x2 board:', () => {
        const newBoard = [
            [ 'O', 'X' ],
            [ '', 'O' ],
        ]
        callGameFunctions(newBoard)
        const diagonals = get_diagonals()
        expect(diagonals.length).toEqual(6)
        expect(diagonals).toEqual([
            ['O'],
            ['X',''],
            ['O'],
            ['X'],
            ['O', 'O'],
            ['']
        ])
    })
    
    test('3x3 board:', () => {
        const newBoard = [
            [ 'O', '', 'O'],
            [ 'X', 'O', 'X' ],
            [ 'O', '', 'X' ],
        ]
        callGameFunctions(newBoard)
        const diagonals = get_diagonals()
        expect(diagonals.length).toEqual(10)
        expect(diagonals).toEqual([
            ['O'],
            ['','X'],
            ['O','O','O'],
            ['X', ''],
            ['X'],
            ['O'],
            ['','X'],
            ['O','O','X'],
            ['X',''],
            ['O'],
        ])
    })

    test('4x4 board:', () => {
        const newBoard = [
            [ 'O', '', 'O', ''],
            [ 'X', 'O', 'X', 'X' ],
            [ 'O', '', 'X', 'O' ],
            [ '' , 'X', 'O', '']
        ]
        callGameFunctions(newBoard)
        const diagonals = get_diagonals()
        expect(diagonals.length).toEqual(14)
        expect(diagonals).toEqual([
            ['O'],
            ['','X'],
            ['O','O','O'],
            ['' ,'X','', ''],
            ['X', 'X', 'X'],
            ['O', 'O'],
            [''],

            [''],
            ['O','X'],
            ['','X','O'],
            ['O', 'O', 'X', ''],
            ['X', '', 'O'],
            ['O', 'X'],
            [''],
        ])
    })
    
})

describe('Test whether the game has been won', () => {
    test('Not won', () => {
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
    test('Won by player 2', () => {
        const newBoard = [
            [ 'O', '', '', '' ],
            [ 'O', '', '', '' ],
            [ 'O', '', '', '' ],
            [ '', '', '', '' ]
        ]
        callGameFunctions(newBoard)
        expect(store.winner).toEqual('player2')
    })
    test('Won by player 1 - unusual diagonal', () => {
        const newBoard = [
            [ 'X', 'X', '', '' ],
            [ 'O', '', 'X', '' ],
            [ 'X', '', '', 'X' ],
            [ '', '', '', '' ]
        ]
        callGameFunctions(newBoard, true)
        expect(store.winner).toEqual('player1')
    })
})