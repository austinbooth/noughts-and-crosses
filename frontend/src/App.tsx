import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { store } from './types/store'
import { GameSetup } from './components/GameSetup'
import { Game } from './components/Game'
import { WinningMsg } from './components/WinningMsg'
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:9090"; // TODO store in environment variable

const App = observer(props => {
  const { board, game_in_play, winner } = store

  const [data, setData] = useState('')

  useEffect((): () => void => {
    const socket = socketIOClient(ENDPOINT)
    socket.on("FromServer", data => setData(data))

    return () => socket.disconnect();
  }, [])

  return (
    <div className="App">
      <h1>Noughts and Crosses</h1>
      {!game_in_play && !winner && <GameSetup />}
      {board && <Game board={board} />}
      {winner && <WinningMsg />}
      <p>Data from server: {data}</p>
    </div>
  );
})

export default App;
