import { useState } from "react";

function Popup({ popupTile, onBetSubmit, onClosePopup }) {
  const [ betAmount, setBetAmount ] = useState(0)
  return(
    <div className="popup-overlay">
      <div className="popup">
        <div className="close-popup" onClick={onClosePopup}>✖</div>
        <h3>Enter your bet for {popupTile}</h3>
        <input type="number" value={betAmount} onChange={e => setBetAmount(e.target.value)} />
        <button type="button" onClick={() => onBetSubmit(popupTile, betAmount)}>Submit bet</button>
      </div>
    </div>
  );
}

export default Popup
