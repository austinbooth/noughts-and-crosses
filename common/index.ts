import { types } from "mobx-state-tree"
  
export enum Turn {
    player1 = 'player1',
    player2 = 'player2'
}

export enum Winner {
    player1 = 'player1',
    player2 = 'player2',
    tie = 'tie'
}

export const GameBase = types.model({
    turn: types.maybeNull(types.enumeration<Turn>(Object.values(Turn))),
    game_in_play: false,
    winner: types.maybeNull(types.enumeration<Winner>(Object.values(Winner))),
    player1: types.maybeNull(types.string),
    player2: types.maybeNull(types.string)
})
export type GameBase = typeof GameBase
