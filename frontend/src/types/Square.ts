import { types } from "mobx-state-tree"
import { store } from './store'
import { check3 } from '../util/check3'

export enum SquareValues {
    X = 'X',
    O = 'O',
    null = ''
}

const get_rows = () => {
  const rows: SquareValues[][] = []
  store.board.forEach(row => {
      const values = row.map(square => square.value)
      rows.push(values)
  })
  return rows
}
const get_columns = () => {
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
const get_diagonals = () => {
  const left_diagonal = [], right_diagonal = []
  for (let i = 0; i < store.board.length; i++) {
    left_diagonal.push(store.board[i][i].value)
    right_diagonal.push(store.board[i][store.board.length - 1 - i].value)
  }
  return { left_diagonal, right_diagonal }
}

const check_if_won = () => {
  const rows = get_rows()
  const cols = get_columns()
  const { left_diagonal, right_diagonal } = get_diagonals()
  const all_lines: SquareValues[][] = [...rows, ...cols, left_diagonal, right_diagonal]
  let winner = null
  for (let i = 0; i < all_lines.length; i++) {
    const all_null = all_lines[i].every((value: string) => value === SquareValues.null)

    const line_result = !all_null ? check3(all_lines[i]) : false

    if (line_result) {
      winner = store.turn
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
        const winner = check_if_won()
        if (winner) {
          store.end_game()
        } else {
          store.toggle_turn()
        }
      } else {
        console.error('Square has already been assigned a non-null value')
      }
    }
  }))