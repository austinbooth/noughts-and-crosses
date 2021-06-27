import { types, Instance } from "mobx-state-tree"
import { SquareBase } from './Square'
  
export enum Turn {
    player1 = 'player1',
    player2 = 'player2'
}

export enum Winner {
    player1 = 'player1',
    player2 = 'player2',
    tie = 'tie'
}
  
export const Row = types.array(SquareBase)
  
export const Rows = types.array(Row)
export type Rows = Instance<typeof Rows>

export enum GameType {
    COMPUTER_DUMB = 'COMPUTER_DUMB',
}

export const Game = types.model({
    board: Rows,
    turn: types.maybeNull(types.enumeration<Turn>(Object.values(Turn))),
    game_in_play: false,
    winner: types.maybeNull(types.enumeration<Winner>(Object.values(Winner))),
    player1: types.maybeNull(types.string),
    player2: types.maybeNull(types.string)
})
export type Game = typeof Game
