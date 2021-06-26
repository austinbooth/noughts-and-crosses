import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { store } from './types/store'
import { GameSetup } from './components/GameSetup'
import { Game } from './components/Game'
import { WinningMsg } from './components/WinningMsg'
import socketIOClient, { Socket } from "socket.io-client";

const URL = "http://127.0.0.1:9090"; // TODO store in environment variable

const App = observer(props => {
  const { board, game_in_play, winner } = store

  const [data, setData] = useState('')
  const [socket, setSocket] = useState<Socket>()

  useEffect((): (() => void) => {
    const socket = socketIOClient(URL, { autoConnect: false })
    socket.on("FromServer", data => setData(data))

    socket.onAny((event, ...args) => {
      console.log(event, args);
    })

    setSocket(socket)

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
