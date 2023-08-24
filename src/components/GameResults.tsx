function GameResults({ payout, playMore }) {
  return(
    <div className="game-results">
      <h2>You won { payout }$!</h2>
      <button className="center" type="button" onClick={ playMore }>
        Play more???
      </button>
    </div>
  )
}

export default GameResults
