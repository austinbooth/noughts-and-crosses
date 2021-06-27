import { types } from 'mobx-state-tree'
import { Game } from '../types'

export const Room = types.model({
    id: types.string,
    user_1: types.string,
    user_2: types.maybe(types.string),
    connection_code: Date.now().toString().substr(-4),
    game: Game
}).actions(self => ({
    set_user_2: (user_id: string) => {
        self.user_2 = user_id
    }
}))
export type Room = typeof Room
