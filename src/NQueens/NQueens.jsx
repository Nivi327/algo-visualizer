import React, { useEffect, useState } from 'react';
import './NQueens.css';
import Queen from '../assets/queen-chess-removebg-preview.png';

import { nqueensalgo } from './Algorithm/nqueen';

const MIN_ROWS = 2;
const DEFAULT_ROWS = 4;
const MAX_ROWS = 8;
const MIN_SPEED = -100;
const MAX_SPEED = 50;

const CELL_WIDTH = 100;
const BROWN = '#964d37a8';
const WHITE = '#fff';
const SECONDARY_COLOR = 'rgba(0, 157, 255, 0.8)';

const NQueens = () => {

  const [cells, setCells] = useState([]);
  const [rowsLen, setRowsLen] = useState(DEFAULT_ROWS);
  const [barSpeed, setBarSpeed] = useState(100);
  const [isRunning, setIsRunning] = useState(false);

  const changeSpeed = (e) => {
    setBarSpeed(MAX_SPEED - (+e.target.value))
  }

  const changeBars = (e) => {
    setRowsLen(e.target.value);
  }

  const image = <img src={Queen}
    style={{
      width: `${CELL_WIDTH}px`,
      height: `${CELL_WIDTH}px`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
    alt='Queen' />

  const pos_image = <img src={Queen}
  style={{
    width: `${CELL_WIDTH}px`,
    height: `${CELL_WIDTH}px`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: '0.5',
  }}
  alt='Queen' />

  useEffect(() => {

    let cells = [];

    for (let i = 0; i < rowsLen; i++) {
      for (let j = 0; j < rowsLen; j++) {
        let gridIdx = i + j + 2;
        const classname = `tile-${i}-${j} tile ${gridIdx % 2 === 1 ? 'brown-tile' : 'white-tile'}`;
        // const cell_image = j === 0 && i === 0 ?  pos_image: null;
        cells.push(<span className={classname}></span>);
      }
    }

    setCells(cells);

    console.log(cells);
  }, [rowsLen]);

  const executeNqueens = () => {
    if (!isRunning) {
      setIsRunning(true);
      const animations = nqueensalgo(rowsLen);
      for(let k=0; k < animations.length; k++) {
        const [eve, i, j] = animations[k];
        const curTile = document.getElementsByClassName(`tile-${i}-${j}`)[0];
        // finish
        if(eve === 'finish') {
          break;
        }
        // pos1 and pos2
        if(eve === 'pos1' || eve === 'pos2') {
          const isPut = eve === 'pos1' ? true: false;
          setTimeout(() => {
            if(isPut) {
              curTile.appendChild(pos_image);
            } else {
              curTile.removeChild(pos_image);
            }
          }, i*barSpeed);
        }
        // check1 and check2
        if(eve === 'check1' || eve === 'check2') {
          const isCheck = eve === 'check1' ? true: false;
          setTimeout(() => {
            if(isCheck) {
              curTile.style.backgroundColor = SECONDARY_COLOR;
            } else {
              curTile.className.backgroundColor = (i+j+2)%2 === 1 ? BROWN: WHITE;
            }
          }, i*barSpeed);
        }
        // exists1 and exists2
        if(eve === 'exists1' || eve === 'exists2') {
          const isExists = eve === 'exists1' ? true: false;
          setTimeout(() => {
            if(isExists) {
              curTile.style.backgroundColor = 'red';
              curTile.style.opacity = '0.5';
            } else {
              curTile.className.backgroundColor = (i+j+2)%2 === 1 ? BROWN: WHITE;
            }
          }, i*barSpeed);
        }
        // p-queen and r-queen
        if(eve === 'p-queen' || eve === 'r-queen') {
          const isPut = eve === 'p-queen' ? true: false;
          setTimeout(() => {
            if(isPut) {
              curTile.appendChild(image);
            } else {
              curTile.removeChild(pos_image);
            }
          }, i*barSpeed);
        }
      }
      setIsRunning(false);
    }
  }

  return (
    <>
      <div className="bars">
        <div className="noofbars">
          <label htmlFor="noofbars">ROWS : {rowsLen}</label>
          <input type="range" name="noofbars" min={MIN_ROWS} max={MAX_ROWS} defaultValue={DEFAULT_ROWS} onChange={changeBars} />
        </div>
        <div className="barspeed">
          <label htmlFor="noofbars">Play Speed : {MAX_SPEED - MIN_SPEED - barSpeed + 1}</label>
          <input type="range" name="noofbars" min={MIN_SPEED} max={MAX_SPEED} step="10" defaultValue="-50" onChange={changeSpeed} />
        </div>
      </div>
      <div className='btns'>
        <button type="submit" onClick={executeNqueens}>Visualize</button>
      </div>
      <div style={{
        marginTop: '4rem',
        marginBottom: '3rem',
        width: `${rowsLen * CELL_WIDTH}px`,
        height: `${rowsLen * CELL_WIDTH}px`,
        display: 'grid',
        gridTemplateRows: `repeat(${rowsLen}, ${CELL_WIDTH}px)`,
        gridTemplateColumns: `repeat(${rowsLen}, ${CELL_WIDTH}px)`,
        marginLeft: '50%',
        transform: 'translateX(-50%)'
      }}>
        {cells}
      </div>
    </>
  )
}

export default NQueens;