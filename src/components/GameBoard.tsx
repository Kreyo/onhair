import { generateAlphabet } from '../utils.ts';

function GameBoard({ rowAmount, gameResults, onCellClick, currentBets }) {
  const alphabet = generateAlphabet()
  function getDataRows() {
    const content = [];
    for (let i = 0; i < rowAmount; i++) {
      for (let j = 1; j < rowAmount+1; j++) {
        content.push(
          <div
            className={`col col-${rowAmount}`}
            key={`col-${j}-row-${i}`}
          >
            { !gameResults &&
              <div className='col-content' onClick={() => onCellClick(`${alphabet[i]}${j}`)}>
                {
                  currentBets[`${alphabet[i]}${j}`] ?
                    <span>{ currentBets[`${alphabet[i]}${j}`] }$</span> :
                    <b>{`${alphabet[i]}${j}`}</b>
                }
              </div>
            }
            {
              gameResults &&
              <div className='col-content'>
                {
                  gameResults.multipliers[`${alphabet[i]}${j}`] ?
                    <b className='success'>{ gameResults.multipliers[`${alphabet[i]}${j}`] }</b> :
                    <span>{`${alphabet[i]}${j}`}</span>
                }
              </div>
            }
          </div>
        );
      }
    }
    return content;
  }
  
  return(
    <>{getDataRows()}</>
  )
}

export default GameBoard