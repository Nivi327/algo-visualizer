import React, { useEffect, useState } from 'react';
import './PrimeVisualizer.css';
import { seive } from './PrimeAlgorithms/seive';
import Complexities from './TimeComplexities.json';
import Code from "./Codes/Code";

const SPEED = 100;
const N = 100;
const MIN_BARS = 5;
const MAX_BARS = 250;
const MIN_SPEED = 1;
const MAX_SPEED = 150;

const PrimeVisualizer = ({showCode}) => {
    const [elements, setElements] = useState([]);
    const [speed, setSpeed] = useState(SPEED);
    const [n, setN] = useState(N);

    const changeN = (e) => {
        setN(e.target.value);
    }

    const changeSpeed = (e) => {
        setSpeed(MAX_SPEED - +e.target.value);
    }


    const resetElements = () => {
        let new_Arr = [];
        for (let i = 1; i <= n; i++) {
            new_Arr.push(i);
        }
        setElements(new_Arr);
    };

    const startSeive = () => {
        console.log("Started", n);
        const animations = seive(n);
        console.log(animations);
        const divCard = document.getElementsByClassName('div-card');
        for (let i = 0; i < animations.length; i++) {
            if (animations[i][0] === "None") {
                continue
            } else if (animations[i][0] === "prime") {
                const [s, cardIdx] = animations[i];
                const divCardIdx = divCard[cardIdx - 1];
                const divCardStyle = divCardIdx.style;
                setTimeout(() => {
                    divCardIdx.classList.add('prime-visiting');
                    divCardStyle.backgroundColor = 'green';
                }, i * speed);
            } else {
                const [s, cardIdx] = animations[i];
                const divCardIdx = divCard[cardIdx - 1];
                const divCardStyle = divCardIdx.style;
                setTimeout(() => {
                    divCardIdx.classList.add('card-visiting');
                    divCardStyle.backgroundColor = 'grey';
                }, i * speed);
            }
        }
    };

    useEffect(() => {
        resetElements()
    }, [n]);

    return (<>
        <div className='btns'>
            <button onClick={startSeive}>Visualize</button>
        </div>
        <div className="bars">
            <div className="noofbars">
                <label htmlFor="noofbars">N : {n}</label>
                <input type="range" name="noofbars" min={MIN_BARS} max={MAX_BARS} defaultValue={N} onChange={changeN} />
            </div>
            <div className="barspeed">
                <label htmlFor="noofbars">Play Speed : {MAX_SPEED - speed}</label>
                <input type="range" name="noofbars" min={MIN_SPEED} max={MAX_SPEED} step="10" defaultValue="50" onChange={changeSpeed} />
            </div>
        </div>
        <div>
            <h1 style={{textAlign:'center', fontSize: '1.4rem', marginBottom: '1rem', marginTop: '1rem', color: "#fff"}}>Sieve Of Eratosthenes, Finding all the PrimeNumbers Below {n}</h1>
        </div>
        <div className='prime-div'>
            {elements.map((val, idx) => {
                return <div className='card div-card' key={idx}>
                    <span className='number'>{val}</span>
                </div>
            })}
        </div>
        <div className="algo-code">
            {showCode ? <Code code={"Seive"} name={"SeiveOfEratosthenes"} /> : ''}
        </div>
        <div className="div-table">
            <h2>Seive Algorithm Complexity</h2>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Best Case</th>
                        <td>O({Complexities.Seive.Best})</td>
                    </tr>
                    <tr>
                        <th>Average Case</th>
                        <td>O({Complexities.Seive.Average})</td>
                    </tr>
                    <tr>
                        <th>Worst Case</th>
                        <td>O({Complexities.Seive.Worst})</td>
                    </tr>
                    <tr>
                        <th>Space</th>
                        <td>O({Complexities.Seive.Space})</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
    )
}

export default PrimeVisualizer