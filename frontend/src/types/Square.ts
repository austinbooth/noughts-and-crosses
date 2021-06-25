import { types, getSnapshot, Instance } from "mobx-state-tree"
import { store, getAllEmptySquares } from './store'
import { check3 } from '../util/check3'
import { Rows } from '../types/'

export enum SquareValues {
    X = 'X',
    O = 'O',
    null = ''
}

export const get_rows = (board: Rows) => {
  const rows: SquareValues[][] = []
  board.forEach(row => {
      const values = row.map(square => square.value)
      rows.push(values)
  })
  return rows
}
export const get_columns = (board: Rows) => {
  const cols = []
  for (let i = 0; i < board.length; i++) {
    const col = []
    for (let j = 0; j < board.length; j++) {
      const value = board[j][i].value
      col.push(value)
    }
    cols.push(col)
  }
  return cols
}
export const get_diagonals = (board: Rows) => {
  const left_diagonal = [], right_diagonal = []
  
  for (let i = 0; i < (board.length * 2) - 1; i++) {
    const diag_left = [], diag_right = []
    let offset = i - (board.length - 1)

    for (let j = 0; j < board.length; j++) {
      const r = j + offset
      const c_left_diagonal = j
      const c_right_diagonal = board.length - 1 - j
      if (r >= 0 && r < board.length) {
      diag_left.push(board[r][c_left_diagonal].value)
      diag_right.push(board[r][c_right_diagonal].value)
      }
    }
    left_diagonal.push(diag_left)
    right_diagonal.push(diag_right)
  }
  const all_diagonals = [...right_diagonal, ...left_diagonal]
  // console.log(all_diagonals)
  return all_diagonals

}

export const check_if_won = (board = store.board) => {
  const rows = get_rows(board)
  const cols = get_columns(board)
  const diagonals = get_diagonals(board).filter(diagonal => diagonal.length >= 3)
  const all_lines: SquareValues[][] = [...rows, ...cols, ...diagonals]
  let winner = ''
  for (let i = 0; i < all_lines.length; i++) {
    const all_null = all_lines[i].every((value: string) => value === SquareValues.null)

    const line_result = !all_null ? check3(all_lines[i]) : false

    if (line_result) {
      winner = line_result
      break
    }
  }
  if (!winner) {
    const emptySquares = getAllEmptySquares()
    if (emptySquares.length === 0) {
      winner = 'tie'
    }
  }
  return winner
}

export const Square = types
  .model({
    row: types.number,
    column: types.number,
    value: types.enumeration<SquareValues>(Object.values(SquareValues))
  })
  .actions(self => ({
    add_value(value: SquareValues, check_if_won = true) {
      if (self.value === SquareValues.null) {
        self.value = value
        if (check_if_won) store.check_if_won_and_toggle_turn()
      } else {
        console.error('Square has already been assigned a non-null value')
      }
    },
    remove_value() {
      self.value = SquareValues.null
    }
  }))
export type Square = Instance<typeof Square>
