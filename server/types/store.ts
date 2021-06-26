import { types } from "mobx-state-tree"
import { Room } from './Room'

const RootStore = types
  .model({
    rooms: types.array(Room)
  })
  .actions(self => ({
    
  }))

export const store = RootStore.create()