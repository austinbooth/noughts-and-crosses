import { types } from "mobx-state-tree"
import { Row, Rows, Turn, GameType } from './index'
import { SquareValues } from './Square'
import { Square } from './Square'

const RootStore = types
  .model({
    board: Rows,
    turn: types.maybeNull(types.enumeration<Turn>(Object.values(Turn))),
    game_in_play: false,
    winner: types.maybeNull(types.enumeration<Turn>(Object.values(Turn))),
    game_type: GameType.COMPUTER_DUMB
  })
  .actions(self => ({
    create_board: (side_length: number) => {
      for (let i = 0; i < side_length; i++) {
        const row = Row.create()
        self.board.push(row)
        for (let j = 0; j < side_length; j++) {
          const s = Square.create({value: SquareValues.null})
          self.board[i].push(s)
        }
      }
    },
    toggle_turn: () => self.turn === Turn.player1 ? self.turn = Turn.player2 : self.turn = Turn.player1,
    end_game: () => {
      self.game_in_play = false
      self.winner = self.turn
    },
    start_game: () => {
      self.game_in_play = true
      self.turn = Turn.player1
    },
    reset_game: () => {
        self.game_in_play = false
        self.winner = null
        self.board = Rows.create()
    },
    set_game_type: (game_type: GameType) => self.game_type = game_type
  }))

export const store = RootStore.create()