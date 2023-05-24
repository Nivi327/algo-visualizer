import { useEffect, useState } from "react";
import './SortingVisualizer.css';
import { getMergeSort } from "./SortingMethods/MergeSort";
import { BubbleSortAlgo } from "./SortingMethods/BubbleSort";
import { InsertionSortAlgo } from "./SortingMethods/InsertionSort";
import { selectionSortAlgo } from "./SortingMethods/SelectionSort";
import Complexities from './SortingMethods/TimeComplexities.json';
import BubbleSortCode from "./SortingMethods/Codes/Code";

const FREQ_MAX = 600;
const FREQ_MIN = 200;
const DURATION = 1;
const MIN_BARS = 5;
const DEFAULT_BARS = 20;
const MAX_BARS = 40;
const MIN_SPEED = -100;
const MAX_SPEED = 50;
const MIN_RANGE = 5;
const MAX_RANGE = 400;

const PRIMARY_COLOR = 'red';
const SECONDARY_COLOR = 'rgba(0, 157, 255, 0.8)';

const SortingVisualizer = ({showCode}) => {
    const [newArray, setNewArray] = useState([]);
    const [noOfBars, setNoOfBars] = useState(DEFAULT_BARS);
    const [barSpeed, setBarSpeed] = useState(100);
    const [sound, setSound] = useState(true);
    const [code, setCode] = useState("MergeSort");
    const [Name, setName] = useState("Merge Sort");
    const [complexity, setComplexity] = useState({ SortAlgo: "Merge Sort", Best: "N*logN", Average: "N*logN", Worst: "N*logN", Space: "N" });

    const randomInt = (a, b) => {
        return Math.floor(Math.random() * (a - b + 1) + b)
    }

    const calcFrequency = (i) => {
        return i / (100 * barSpeed) * (FREQ_MAX - FREQ_MIN) + FREQ_MIN;
    }

    const changeSpeed = (e) => {
        setBarSpeed(MAX_SPEED - (+e.target.value))
    }

    const changeBars = (e) => {
        setNoOfBars(e.target.value);
    }

    const SoundToggle = () => {
        setSound(snd => !snd);
    }

    const sleep = (milliseconds) => {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    let audioCtx = null;

    const playAudio = (freq, duration) => {
        if (audioCtx == null) {
            audioCtx = new (AudioContext ||
                window.webkitAudioContext
            )();
        }
        const oscillator = new OscillatorNode(audioCtx);
        const gainNode = new GainNode(audioCtx);
        oscillator.type = "square";
        oscillator.frequency.value = freq;
        gainNode.gain.value = 0.008;
        oscillator.connect(gainNode).connect(audioCtx.destination);
        oscillator.start()

        setTimeout(() => {
            oscillator.stop();
        }, 10*duration);
    };

    const resetArray = () => {
        let arr = [];
        const arrayBars = document.getElementsByClassName('div-bar');
        for (let i = 0; i < noOfBars; i++) {
            arr.push(randomInt(MIN_RANGE, MAX_RANGE));
            if (arrayBars.length > i) {
                arrayBars[i].style.backgroundColor = SECONDARY_COLOR;
            }
        }
        setNewArray(arr);
    }

    useEffect(() => {
        resetArray();
    }, [noOfBars]);

    const mergeSort = () => {
        const animations = getMergeSort(newArray);
        setCode("MergeSort");
        setName("Merge Sort");
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 3 !== 2
            const arrayBars = document.getElementsByClassName('div-bar');
            if (isColorChange === true) {
                const color = (i % 3) === 0 ? PRIMARY_COLOR : SECONDARY_COLOR;
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx];
                const barTwoStyle = arrayBars[barTwoIdx];
                setTimeout(() => {
                    barOneStyle.style.background = color;
                    barTwoStyle.style.background = color;
                    if (sound) {
                        playAudio(calcFrequency(i), DURATION);
                    }
                }, i * barSpeed);
            } else {
                const [barIdx, newHeight] = animations[i];
                const barStyle = arrayBars[barIdx].childNodes;
                setTimeout(() => {
                    barStyle[0].style.height = `${newHeight}px`
                    barStyle[1].innerHTML = newHeight;
                    if (sound) {
                        playAudio(calcFrequency(i), DURATION);
                    }
                }, i * barSpeed);
            }
        }
        const { Best, Average, Worst, Space } = Complexities.MergeSort;
        setComplexity(prevValues => { return { SortAlgo: "Merge Sort", Best, Average, Worst, Space } })
    }

    const BubbleSort = () => {
        const [animations, random] = BubbleSortAlgo(newArray);
        setCode("BubbleSort");
        setName("Bubble Sort");
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (i % 4 === 0) || (i % 4 === 1)
            const arrayBars = document.getElementsByClassName('div-bar');
            if (isColorChange === true) {
                const color = (i % 4 === 0) ? PRIMARY_COLOR : SECONDARY_COLOR;
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx];
                const barTwoStyle = arrayBars[barTwoIdx];
                setTimeout(() => {
                    barOneStyle.style.background = color;
                    barTwoStyle.style.background = color;
                    if (sound) {
                        playAudio(calcFrequency(i), DURATION);
                    }
                }, i * barSpeed);
            } else {
                const [barIdx, newHeight] = animations[i];
                if (barIdx === -1) {
                    continue
                }
                const barStyle = arrayBars[barIdx].childNodes;
                setTimeout(() => {
                    barStyle[0].style.height = `${newHeight}px`
                    barStyle[1].innerHTML = newHeight;
                    if (sound) {
                        playAudio(calcFrequency(i), DURATION);
                    }
                }, i * barSpeed);
            }
        }
        const { Best, Average, Worst, Space } = Complexities.BubbleSort;
        setComplexity(prevValues => { return { SortAlgo: "Bubble Sort", Best, Average, Worst, Space } })
    }

    const InsertionSort = () => {
        const animations = InsertionSortAlgo(newArray);
        setCode("InsertionSort");
        setName("Insertion Sort");
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === "comparision1" || animations[i][0] === "comparision2"
            const arrayBars = document.getElementsByClassName('div-bar');
            if (isColorChange === true) {
                const color = animations[i][0] === "comparision1" ? PRIMARY_COLOR : SECONDARY_COLOR;
                const [s, barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx];
                const barTwoStyle = arrayBars[barTwoIdx];
                setTimeout(() => {
                    barOneStyle.style.background = color;
                    barTwoStyle.style.background = color;
                    if (sound) {
                        playAudio(calcFrequency(i), DURATION);
                    }
                }, i * barSpeed);
            } else if(animations[i][0] === "overwrite") {
                const [s, barIdx, newHeight] = animations[i];
                const barStyle = arrayBars[barIdx].childNodes;
                setTimeout(() => {
                    console.log(animations[i], newHeight);
                    barStyle[0].style.height = `${newHeight}px`
                    barStyle[1].innerHTML = newHeight;
                    if (sound) {
                        playAudio(calcFrequency(i), DURATION);
                    }
                }, i * barSpeed);
            }
        }
        const { Best, Average, Worst, Space } = Complexities.InsertionSort;
        setComplexity(prevValues => { return { SortAlgo: "Insertion Sort", Best, Average, Worst, Space } })
    }

    const SelectionSort = () => {
        const animations = selectionSortAlgo(newArray);
        setCode("SelectionSort");
        setName("Selection Sort");
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === "comparision1" || animations[i][0] === "comparision2";
            const arrayBars = document.getElementsByClassName("div-bar");
            if (isColorChange === true) {
                const color = animations[i][0] === "comparision1" ? PRIMARY_COLOR : SECONDARY_COLOR;
                const [s, barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx];
                const barTwoStyle = arrayBars[barTwoIdx];
                setTimeout(() => {
                    barOneStyle.style.background = color;
                    barTwoStyle.style.background = color;
                    if (sound) {
                        playAudio(calcFrequency(i), DURATION);
                    }
                }, i * barSpeed);
            } else {
                if (animations[i][0] === "index_change") {
                    const [s, barOneIdx, barTwoIdx] = animations[i];
                    const barTwoStyle = arrayBars[barTwoIdx];
                    setTimeout(() => {
                        if (sound) {
                            playAudio(calcFrequency(i), DURATION);
                        }
                    }, i * barSpeed);
                } else {
                    const [s, barIdx, newHeight] = animations[i];
                    const barStyle = arrayBars[barIdx].childNodes;
                    setTimeout(() => {
                        barStyle[0].style.height = `${newHeight}px`
                        barStyle[1].innerHTML = newHeight;
                        if (sound) {
                            playAudio(calcFrequency(i), DURATION);
                        }
                    }, i * barSpeed);
                }
            }
        }
        const { Best, Average, Worst, Space } = Complexities.SelectionSort;
        setComplexity(prevValues => { return { SortAlgo: "Selection Sort", Best, Average, Worst, Space } })
    }

    return (<>
        <div className="btns">
            <button onClick={resetArray}>Change Array</button>
            <button onClick={mergeSort}>Merge Sort</button>
            <button onClick={BubbleSort}>Bubble Sort</button>
            <button onClick={InsertionSort}>Insertion Sort</button>
            <button onClick={SelectionSort}>Selection Sort</button>
            <button onClick={SoundToggle}>Sound {sound ? 'Off' : 'On'}</button>
        </div>
        <div className="bars">
            <div className="noofbars">
                <label htmlFor="noofbars">Array Size : {newArray.length}</label>
                <input type="range" name="noofbars" min={MIN_BARS} max={MAX_BARS} defaultValue={DEFAULT_BARS} onChange={changeBars} />
            </div>
            <div className="barspeed">
                <label htmlFor="noofbars">Play Speed : { MAX_SPEED - MIN_SPEED -  barSpeed+ 1}</label>
                <input type="range" name="noofbars" min={MIN_SPEED} max={MAX_SPEED} step="10" defaultValue="-50" onChange={changeSpeed} />
            </div>
        </div>
        <div className="div-container">
            {newArray.map((val, idx) => {
                return <div key={idx} id={idx + 1} className="div-bar">
                    <div style={{ height: `${val}px` }} className="bar"></div>
                    <span className="value">{val}</span>
                </div>
            })}
        </div>
        <div className="algo-code">
            {showCode?<BubbleSortCode code={code} name={Name} />: ''}
        </div>
        <div className="div-table">
            <h2>{complexity.SortAlgo} Algorithm Complexity</h2>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Best Case</th>
                        <td>O({complexity.Best})</td>
                    </tr>
                    <tr>
                        <th>Average Case</th>
                        <td>O({complexity.Average})</td>
                    </tr>
                    <tr>
                        <th>Worst Case</th>
                        <td>O({complexity.Worst})</td>
                    </tr>
                    <tr>
                        <th>Space</th>
                        <td>O({complexity.Space})</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
    )
};

export default SortingVisualizer;