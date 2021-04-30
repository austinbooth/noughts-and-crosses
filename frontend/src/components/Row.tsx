import styled from 'styled-components'

const LineContainer = styled.div`
    display: flex;
    flex-direction: row;
`

export const RowComponent = ({ children, unique }: any) => {
    return (
        <LineContainer key={unique}>
            {children}
        </LineContainer>
    )
}