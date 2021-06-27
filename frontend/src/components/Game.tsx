import { FC } from 'react'
import { store } from '../types/store'
import { SquareComponent } from './Square'
import { RowComponent } from './Row'
import { Rows, Row } from '../common'
import { SquareValues } from '../common/Square'
import { Square } from '../types/Square'
import { Turn } from '../common/index'
import { Instance } from 'mobx-state-tree'
import { observer } from 'mobx-react-lite'

interface Props {
    board: Instance<typeof Rows>
}

export const Game: FC<Props> = observer(({ board }) => {
    const { game_in_play, turn } = store
    const onClickHandler = (line_idx: number, square_idx: number) => {
        if (game_in_play) {
            const square = board[line_idx][square_idx]
            square.add_value(turn === Turn.player1 ? SquareValues.X : SquareValues.O)
        }
    }
    return (
        <>
            {board.map((row: Instance<typeof Row>, row_idx: number) => (
                <RowComponent unique={'line_' + row_idx}>
                    {row.map((square: Instance<typeof Square>, square_idx: number) => (
                        <SquareComponent
                            unique={`${row_idx}_${square_idx}`}
                            value={square.value}
                            onClick={() => onClickHandler(row_idx, square_idx)}
                        />
                    ))}
                </RowComponent>
            )
            )}
        </>
    )
})