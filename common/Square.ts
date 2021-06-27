import { types } from "mobx-state-tree"

export enum SquareValues {
    X = 'X',
    O = 'O',
    null = ''
}

export const SquareBase = types
  .model({
    row: types.number,
    column: types.number,
    value: types.enumeration<SquareValues>(Object.values(SquareValues))
  })
export type SquareBase = typeof SquareBase
