import { types, Instance } from "mobx-state-tree"
import { Square } from './Square'
  
export enum Turn {
    player1 = 'player1',
    player2 = 'player2'
}

export enum Winner {
    player1 = 'player1',
    player2 = 'player2',
    tie = 'tie'
}
  
export const Row = types.array(Square)
  
export const Rows = types.array(Row)
export type Rows = Instance<typeof Rows>

export enum GameType {
    COMPUTER_DUMB = 'COMPUTER_DUMB',
}