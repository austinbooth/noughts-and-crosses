import { observer } from 'mobx-react-lite'
import { store } from './types/store'
import { GameSetup } from './components/GameSetup'
import { Game } from './components/Game'
import { WinningMsg } from './components/WinningMsg'

const App = observer(props => {
  const { board, game_in_play, winner } = store
  return (
    <div className="App">
      <h1>Noughts and Crosses</h1>
      {!game_in_play && !winner && <GameSetup />}
      {board && <Game board={board} />}
      {winner && <WinningMsg />}
    </div>
  );
})

export default App;
