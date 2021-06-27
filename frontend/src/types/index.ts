import { types, Instance } from 'mobx-state-tree'
import { Square } from './Square'

export const Row = types.array(Square)
export type Row = typeof Row
  
export const Rows = types.array(Row)
export type Rows = Instance<typeof Rows>

export enum GameType {
    COMPUTER_DUMB = 'COMPUTER_DUMB',
    TWO_PLAYER = 'TWO_PLAYER'
}
