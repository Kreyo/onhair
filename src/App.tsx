import { useState, useCallback, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { ResponseData } from './interfaces.ts';
import Menu from './components/Menu.tsx';
import Popup from './components/Popup.tsx';
import GameResults from "./components/GameResults.tsx";
import GameBoard from "./components/GameBoard.tsx";

function App() {
  const [socketUrl, setSocketUrl] = useState('wss://hometask.me?field=25');
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  
  const [ balance, setBalance ] = useState(0)
  const [ fieldSize, setFieldSize ] = useState(25)
  const [ gamePhase, setGamePhase ] = useState(null)
  const [ popupTile, setPopupTile ] = useState(null)
  const [ currentBets, setCurrentBets ] = useState({})
  const [ gameResults, setGameResults ] = useState(null)

  const rowAmount = Math.sqrt(fieldSize)
  
  useEffect(() => {
    if (lastMessage && lastMessage.data) {
      const jsonData: ResponseData = JSON.parse(lastMessage.data)
      if (jsonData.type === 'game') {
        if (jsonData.payload.balance) {
          setBalance(jsonData.payload.balance)
        }
        if (jsonData.payload.phase) {
          setGamePhase(jsonData.payload.phase)
          if (jsonData.payload.phase === 'GameResult') {
            setGameResults(jsonData.payload)
          }
        }
      }
    }
  }, [lastMessage]);

  const changeFieldSize = (size: number) => {
    setFieldSize(size)
    setSocketUrl(`wss://hometask.me/?field=${size}`);
  }

  const onGameStart = useCallback(
    () => {
      sendJsonMessage({ type: 'startGame' })
      setCurrentBets({})
    },
    []
  );

  const onCellClick = (cell: string) => {
    if (gamePhase === 'BetsOpen' && !gameResults) {
      setPopupTile(cell)
    }
  }

  const onBetSubmit = (cell: string, value: number) => {
    if (value < balance && gamePhase === 'BetsOpen') {
      setBalance(balance - value)
      setCurrentBets({ ...currentBets, [cell]: value })
      setPopupTile(null)
      sendJsonMessage({ type: 'placeBet', action: { [cell]: value }})
    }
  }

  const playMore = () => {
    setGameResults(null)
  }

  const onClosePopup = () => {
    setPopupTile(null)
  }

  return (
    <>
      { popupTile && <Popup popupTile={ popupTile } onBetSubmit={ onBetSubmit } onClosePopup={ onClosePopup } /> }
      <h1>Let's spend some money!</h1>
      <h2>Select your game:</h2>
      <Menu changeFieldSize={changeFieldSize} />
      <h2>Current amount: { balance }$</h2>
      { gameResults && <GameResults payout={ gameResults.payout } playMore={ playMore } /> }
      <div className="rows">
        { gamePhase !== 'BetsClosed' ?
          <GameBoard gameResults={gameResults} currentBets={currentBets} onCellClick={onCellClick} rowAmount={rowAmount} /> :
          'Loading...'
        }
      </div>
      { !gameResults &&
        <button className="center" type="button" onClick={onGameStart}>Game on!</button>
      }
    </>
  )
}

export default App
