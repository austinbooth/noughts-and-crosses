import { types } from 'mobx-state-tree'
import { Game } from '../types'
import { v4 as uuidv4 } from 'uuid'

export const Room = types.model({
    uid: uuidv4(),
    user_1: types.string,
    user_2: types.maybe(types.string),
    connection_code: Math.floor(Date.now() * Math.random()).toString().substr(-6),
    game: Game
}).actions(self => ({
    set_user_2: (user_id: string) => {
        self.user_2 = user_id
    }
}))
export type Room = typeof Room
