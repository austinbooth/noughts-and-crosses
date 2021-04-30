import { FC } from 'react'
import { SquareValues } from '../types/Square'
import styled from 'styled-components'

const SquareContainer = styled.div`
    border: 1px black solid;
    height: 8rem;
    width: 8rem;
    font-size: 8rem;
    line-height: 8rem;
    display: flex;
    justify-content: center;
    // align-content: center;
`

interface Props {
    value: SquareValues,
    onClick: () => void,
    unique: string
}

export const SquareComponent: FC<Props> = ({ value, onClick, unique }) => {
    return (
        <SquareContainer key={unique} onClick={onClick}>
            {value}
        </SquareContainer>
    )
}
