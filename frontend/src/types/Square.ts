import { types, getSnapshot } from "mobx-state-tree"
import { store } from './store'
import { check3 } from '../util/check3'

export enum SquareValues {
    X = 'X',
    O = 'O',
    null = ''
}

export const get_rows = () => {
  const rows: SquareValues[][] = []
  store.board.forEach(row => {
      const values = row.map(square => square.value)
      rows.push(values)
  })
  return rows
}
export const get_columns = () => {
  const cols = []
  for (let i = 0; i < store.board.length; i++) {
    const col = []
    for (let j = 0; j < store.board.length; j++) {
      const value = store.board[j][i].value
      col.push(value)
    }
    cols.push(col)
  }
  return cols
}
export const get_diagonals = () => {
  const left_diagonal = [], right_diagonal = []
  
  for (let i = 0; i < (store.board.length * 2) - 1; i++) {
    const diag_left = [], diag_right = []
    let offset = i - (store.board.length - 1)

    for (let j = 0; j < store.board.length; j++) {
      const r = j + offset
      const c_left_diagonal = j
      const c_right_diagonal = store.board.length - 1 - j
      if (r >= 0 && r < store.board.length) {
      diag_left.push(store.board[r][c_left_diagonal].value)
      diag_right.push(store.board[r][c_right_diagonal].value)
      }
    }
    left_diagonal.push(diag_left)
    right_diagonal.push(diag_right)
  }
  const all_diagonals = [...right_diagonal, ...left_diagonal]
  console.log(all_diagonals)
  return all_diagonals

}

export const check_if_won = () => {
  const rows = get_rows()
  const cols = get_columns()
  const diagonals = get_diagonals().filter(diagonal => diagonal.length >= 3)
  const all_lines: SquareValues[][] = [...rows, ...cols, ...diagonals]
  let winner = null
  for (let i = 0; i < all_lines.length; i++) {
    const all_null = all_lines[i].every((value: string) => value === SquareValues.null)

    const line_result = !all_null ? check3(all_lines[i]) : false

    if (line_result) {
      winner = line_result
      break
    }
  }
  return winner
}

export const Square = types
  .model({
    value: types.enumeration<SquareValues>(Object.values(SquareValues))
  })
  .actions(self => ({
    add_value(value: SquareValues) {
      if (self.value === SquareValues.null) {
        self.value = value
        store.check_if_won_and_toggle_turn()
      } else {
        console.error('Square has already been assigned a non-null value')
      }
    }
  }))