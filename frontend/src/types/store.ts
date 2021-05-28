import { types, applySnapshot, getSnapshot } from "mobx-state-tree"
import { string } from "mobx-state-tree/dist/internal"
import { Row, Rows, Turn, GameType, Winner } from './index'
import { SquareValues } from './Square'
import { Square, check_if_won } from './Square'

const randomInt = (max: number) => Math.floor(Math.random() * max)

export const getAllEmptySquares = (board = store.board) => {
  const emptySquares = board.flatMap(row => row.filter(s => s.value === SquareValues.null))
  return emptySquares
}

const encodeBoard = (board: Rows, maximisingPlayer: boolean) => {
  let boardRepresentation = ''
  board.forEach(row => {
    row.forEach(square => {
      if (square.value === SquareValues.null) {
        boardRepresentation += '_'
      } else {
        boardRepresentation += square.value
      }
    })
  })
  if (maximisingPlayer) {
    boardRepresentation += '-max'
  } else {
    boardRepresentation += '-min'
  }
  return boardRepresentation
}

const scoreLookup: {[index:string] : number} = {
  X: 10,
  tie: 0,
  O: -10,
}

const minimaxScores: {[index:string]: number} = {}

const minimax = (board: Rows, depth: number, maximisingPlayer: boolean, alpha: number, beta: number):number => {
  const gameResult = check_if_won(board)
  if (gameResult.length > 0) {
    const score = scoreLookup[gameResult]
    return score
  }
  if (depth === 4) return 0 // so recursion doesn't take too long and hang
  const emptySquares: Square[] = getAllEmptySquares(board)
  let bestScore = maximisingPlayer ? -Infinity : Infinity
  if (maximisingPlayer) {
    for(let i=0; i<emptySquares.length; i++) {
      if (alpha >= beta) {
        break
      }
      const square = emptySquares[i]
      square.add_value(SquareValues.X, false)
      const score = minimax(board, depth + 1, false, alpha, beta) - depth
      square.remove_value()
      bestScore = Math.max(bestScore, score)
      alpha = bestScore
    }
    return bestScore
  } else {
    // ie is the minimising player
    for(let i=0; i<emptySquares.length; i++) {
      if (alpha >= beta) {
        break
      }
      const square = emptySquares[i]
      square.add_value(SquareValues.O, false)
      const score = minimax(board, depth + 1, true, alpha, beta) + depth
      square.remove_value()
      bestScore = Math.min(bestScore, score)
      beta = bestScore
    }
    return bestScore
  }
}

const computer_move = () => {
  const emptySquares: Square[] = getAllEmptySquares(store.board)
  // if (emptySquares.length === store.board.length ** 2) {
  //   console.log('NO MOVES YET...')
  //   store.board[0][0].add_value(SquareValues.X)
  //   return
  // }
  // const maximisingPlayer = store.turn === Turn.player1
  const maximisingPlayer = true
  let best_score = maximisingPlayer ? -Infinity : Infinity
  let alpha = -Infinity, beta = Infinity
  let bestMove = Square.create({row: -1, column: -1, value: SquareValues.null})

  emptySquares.forEach(square => {
    square.add_value(store.turn === Turn.player1 ? SquareValues.X : SquareValues.O, false)
    const score = minimax(store.board, 0, false, alpha, beta)
    // const score = maximisingPlayer ? 1 : -1
    square.remove_value()
    // if (maximisingPlayer) {
    //   if (score > best_score) {
    //     best_score = score
    //     bestMove = square
    //   }
    // } else {
    //   if (score < best_score) {
    //     best_score = score
    //     bestMove = square
    //   }
    // }
    if (score > best_score) {
      best_score = score
      bestMove = square
    }
  })
  const best_row = bestMove.row, best_col = bestMove.column
  store.board[best_row][best_col].add_value(store.turn === Turn.player1 ? SquareValues.X : SquareValues.O)

  
  // console.log('RANDOM MOVE...')
  // const emptySquares = getAllEmptySquares()
  // const idx = randomInt(emptySquares.length)
  // const square = emptySquares[idx]
  // square.add_value(store.turn === Turn.player1 ? SquareValues.X : SquareValues.O)
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
          const s = Square.create({
            row: i,
            column: j,
            value: SquareValues.null
          })
          self.board[i].push(s)
        }
      }
      // if new_board has been passed then apply it (used by tests)
      if (new_board.length > 0) {
        const newBoard = new_board.map((row:string[], row_idx:number) => row.map((value:string, col_idx:number) => ({
          row: row_idx,
          column: col_idx,
          value: value.length ===  0  ? SquareValues.null :
                        value === 'X' ? SquareValues.X    : SquareValues.O
        })))
        applySnapshot(store.board, newBoard)
      }
    },
    check_if_won_and_toggle_turn: () => {
      const winner = check_if_won()
      if (winner) {
        self.game_in_play = false
        switch (winner) {
          case 'tie':
            self.winner = Winner.tie
            break
          case 'X':
            self.winner = Winner.player1
            break
          case 'O':
            self.winner = Winner.player2
        }
      } else {
        self.turn = self.turn === Turn.player1 ? Turn.player2 : Turn.player1
        if (self.game_in_play && store[self.turn] === 'computer') {
          console.log('computer move...')
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
          // self.player1 = coinFlip ? 'computer' : 'human'
          // self.player2 = self.player1 === 'computer' ? 'human' : 'computer'
          self.player1 = 'computer'
          self.player2 = 'human'

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