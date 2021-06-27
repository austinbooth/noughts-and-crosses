import { types } from "mobx-state-tree"
import { SquareBase } from '../common/Square'
import { GameBase } from '../common'

export const Row = types.array(SquareBase)
export type Row = typeof Row
  
export const Rows = types.array(Row)
export type Rows = typeof Rows

export const Game = GameBase
    .named('Game')
    .props({
        board: Rows
    })
export type Game = typeof Game
