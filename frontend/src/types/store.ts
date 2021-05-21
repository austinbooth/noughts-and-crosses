import { types, applySnapshot } from "mobx-state-tree"
import { Row, Rows, Turn, GameType, Winner } from './index'
import { SquareValues } from './Square'
import { Square, check_if_won } from './Square'

const randomInt = (max: number) => Math.floor(Math.random() * max)

const getAllEmptySquares = () => {
  const emptySquares = store.board.flatMap(row => row.filter(s => s.value === SquareValues.null))
  return emptySquares
}

const computer_move = () => {  
  const emptySquares = getAllEmptySquares()
  const idx = randomInt(emptySquares.length)
  const square = emptySquares[idx]
  square.add_value(store.turn === Turn.player1 ? SquareValues.X : SquareValues.O)
}

const RootStore = types
  .model({
    board: Rows,
    turn: types.maybeNull(types.enumeration<Turn>(Object.values(Turn))),
    game_in_play: false,
    winner: types.maybeNull(types.enumeration<Winner>(Object.values(Winner))),
    game_type: GameType.COMPUTER_DUMB,
    player1: types.maybeNull(types.string),
    player2: types.maybeNull(types.string)
  })
  .actions(self => ({
    create_board: (side_length: number, new_board:string[][] = []) => {
      for (let i = 0; i < side_length; i++) {
        const row = Row.create()
        self.board.push(row)
        for (let j = 0; j < side_length; j++) {
          const s = Square.create({value: SquareValues.null})
          self.board[i].push(s)
        }
      }
      
      if (new_board.length > 0) {
        const newBoard = new_board.map((row:string[]) => row.map((value:string) => ({
          value: value.length ===  0  ? SquareValues.null :
                        value === 'X' ? SquareValues.X    : SquareValues.O
        })))
        applySnapshot(store.board, newBoard)
      }
    },
    check_if_won_and_toggle_turn: () => {
      const winner = check_if_won()
      // check if drawn
      if (!winner) {
        const emptySquares = getAllEmptySquares()
        if (emptySquares.length === 0) {
          self.game_in_play = false
          self.winner = Winner.tie
        }
      }
      if (winner) {
        self.game_in_play = false
        self.winner = winner === 'X' ? Winner.player1 : Winner.player2
      } else {
        self.turn === Turn.player1 ? self.turn = Turn.player2 : self.turn = Turn.player1
        if (self.game_in_play && store[self.turn] === 'computer') {
          computer_move()
        }
      }
    },
    start_game: () => {
      self.game_in_play = true
      self.turn = Turn.player1
      self.winner = null

      if (process.env.NODE_ENV !== 'test') {
        if (self.game_type === GameType.COMPUTER_DUMB) {
          const coinFlip = randomInt(2)
          self.player1 = coinFlip ? 'computer' : 'human'
          self.player2 = self.player1 === 'computer' ? 'human' : 'computer'

          if (self.player1 === 'computer') {
            computer_move()
          }
        }
      }
    },
    reset_game: () => {
        self.game_in_play = false
        self.winner = null
        self.board = Rows.create()
    },
    set_game_type: (game_type: GameType) => self.game_type = game_type,
    stop_game: () => self.game_in_play = false,
    set_turn: (turn: Turn) => self.turn = turn
  }))

export const store = RootStore.create()