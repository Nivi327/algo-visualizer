import { useEffect, useRef, useState } from "react";
import './SortingVisualizer.css';
import { getMergeSort } from "./SortingMethods/MergeSort";
import { BubbleSortAlgo } from "./SortingMethods/BubbleSort";
import { InsertionSortAlgo } from "./SortingMethods/InsertionSort";
import { selectionSortAlgo } from "./SortingMethods/SelectionSort";
import Complexities from './TimeComplexities.json';
import Code from "./Codes/Code";
import { QucikSortAlgo } from "./SortingMethods/QuickSort";

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
const PIVOT_COLOR = '#2CD3E1';

const SortingVisualizer = ({ showCode }) => {
    const [newArray, setNewArray] = useState([]);
    const [noOfBars, setNoOfBars] = useState(DEFAULT_BARS);
    const [barSpeed, setBarSpeed] = useState(100);
    const [code, setCode] = useState("BubbleSort");
    const [Name, setName] = useState("Bubble Sort");
    const [disable, setDisable] = useState(false);
    const [currrentMethod, setCurrentMethod] = useState("Bubble Sort");
    const [complexity, setComplexity] = useState({ SortAlgo: "Bubble Sort", Best: "N*", Average: "N*N", Worst: "N*N", Space: "1" });

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

    const SortMethods = [
        "Bubble Sort",
        "Selection Sort",
        "Insertion Sort",
        "Merge Sort",
        "Quick Sort"
    ]

    const handleMethodClick = (e) => {
        const Method = e.target.value;
        setCurrentMethod(Method);
    }

    const ExecuteMethod = () => {
        setDisable(true);
        if (disable) {
            if (currrentMethod === SortMethods[0]) {
                BubbleSort();
            } else if (currrentMethod === SortMethods[1]) {
                SelectionSort();
            } else if (currrentMethod === SortMethods[2]) {
                InsertionSort();
            } else if (currrentMethod === SortMethods[3]) {
                mergeSort();
            } else if (currrentMethod === SortMethods[4]) {
                quickSort();
            }
        }
        setDisable(false);
    }

    // const SoundToggle = () => {
    //     console.log(sound.current);
    //     const val = sound.current;
    //     sound.current = !val;
    // }

    // const sleep = (milliseconds) => {
    //     const date = Date.now();
    //     let currentDate = null;
    //     do {
    //         currentDate = Date.now();
    //     } while (currentDate - date < milliseconds);
    // }

    // let audioCtx = null;

    // const playAudio = (freq, duration) => {
    //     if (audioCtx == null) {
    //         audioCtx = new (AudioContext ||
    //             window.webkitAudioContext
    //         )();
    //     }
    //     const oscillator = new OscillatorNode(audioCtx);
    //     const gainNode = new GainNode(audioCtx);
    //     oscillator.type = "square";
    //     oscillator.frequency.value = freq;
    //     gainNode.gain.value = 0.035;
    //     oscillator.connect(gainNode).connect(audioCtx.destination);
    //     oscillator.start()

    //     setTimeout(() => {
    //         oscillator.stop();
    //     }, 10 * duration);
    // };

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

    const quickSort = () => {
        const animations = QucikSortAlgo(newArray);
        setCode("QuickSort");
        setName("Quick Sort");
        const { Best, Average, Worst, Space } = Complexities.QuickSort;
        setComplexity(prevValues => { return { SortAlgo: "Quick Sort", Best, Average, Worst, Space } })
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('div-bar');
            if (animations[i][0] === "pivot1" || animations[i][0] === "pivot2") {
                const [s, barIdx] = animations[i]
                const color = s === "pivot1" ? PIVOT_COLOR : SECONDARY_COLOR;
                const divBar = arrayBars[barIdx];
                setTimeout(() => {
                    divBar.style.backgroundColor = color;
                }, i * barSpeed);
            } else if (animations[i][0] === "compare1" || animations[i][0] === "compare2") {
                const [s, barOneIdx, barTwoIdx] = animations[i];
                const color = s === "compare1" ? PRIMARY_COLOR : SECONDARY_COLOR;
                const divBarOne = arrayBars[barOneIdx];
                const divBarTwo = arrayBars[barTwoIdx];
                setTimeout(() => {
                    divBarOne.style.backgroundColor = color;
                    // divBarTwo.style.backgroundColor = color;
                }, i * barSpeed);
            } else if (animations[i][0] === "swap1" || animations[i][0] === "swap2") {
                const [s, barIdx, newHeight] = animations[i];
                const divBar = arrayBars[barIdx].childNodes;
                setTimeout(() => {
                    divBar[0].style.height = `${newHeight}px`;
                    divBar[1].innerHTML = newHeight;
                }, i * barSpeed);
            }
        }
    }

    const mergeSort = () => {
        const animations = getMergeSort(newArray);
        setCode("MergeSort");
        setName("Merge Sort");
        const { Best, Average, Worst, Space } = Complexities.MergeSort;
        setComplexity(prevValues => { return { SortAlgo: "Merge Sort", Best, Average, Worst, Space } })
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
                }, i * barSpeed);
            } else {
                const [barIdx, newHeight] = animations[i];
                const barStyle = arrayBars[barIdx].childNodes;
                setTimeout(() => {
                    barStyle[0].style.height = `${newHeight}px`
                    barStyle[1].innerHTML = newHeight;
                }, i * barSpeed);
            }
        }
    }

    const BubbleSort = () => {
        const [animations, random] = BubbleSortAlgo(newArray);
        setCode("BubbleSort");
        setName("Bubble Sort");
        const { Best, Average, Worst, Space } = Complexities.BubbleSort;
        setComplexity(prevValues => { return { SortAlgo: "Bubble Sort", Best, Average, Worst, Space } })
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
                }, i * barSpeed);
            }
        }
    }

    const InsertionSort = () => {
        const animations = InsertionSortAlgo(newArray);
        setCode("InsertionSort");
        setName("Insertion Sort");
        const { Best, Average, Worst, Space } = Complexities.InsertionSort;
        setComplexity(prevValues => { return { SortAlgo: "Insertion Sort", Best, Average, Worst, Space } })
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
                }, i * barSpeed);
            } else if (animations[i][0] === "overwrite") {
                const [s, barIdx, newHeight] = animations[i];
                const barStyle = arrayBars[barIdx].childNodes;
                setTimeout(() => {
                    console.log(animations[i], newHeight);
                    barStyle[0].style.height = `${newHeight}px`
                    barStyle[1].innerHTML = newHeight;
                }, i * barSpeed);
            }
        }
    }

    const SelectionSort = () => {
        const animations = selectionSortAlgo(newArray);
        setCode("SelectionSort");
        setName("Selection Sort");
        const { Best, Average, Worst, Space } = Complexities.SelectionSort;
        setComplexity(prevValues => { return { SortAlgo: "Selection Sort", Best, Average, Worst, Space } })
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
                }, i * barSpeed);
            } else {
                if (animations[i][0] === "index_change") {
                    const [s, barOneIdx, barTwoIdx] = animations[i];
                    const barTwoStyle = arrayBars[barTwoIdx];
                    setTimeout(() => {
                    }, i * barSpeed);
                } else {
                    const [s, barIdx, newHeight] = animations[i];
                    const barStyle = arrayBars[barIdx].childNodes;
                    setTimeout(() => {
                        barStyle[0].style.height = `${newHeight}px`
                        barStyle[1].innerHTML = newHeight;
                    }, i * barSpeed);
                }
            }
        }
    }

    return (<>
        <div className="btns">
            <button onClick={resetArray}>Reset Array</button>
            {/* <button onClick={quickSort}>Quick Sort</button>
            <button onClick={mergeSort}>Merge Sort</button>
            <button onClick={BubbleSort}>Bubble Sort</button>
            <button onClick={InsertionSort}>Insertion Sort</button>
            <button onClick={SelectionSort}>Selection Sort</button> */}
            <select className="form-select" onChange={handleMethodClick} disabled={disable}>
                {SortMethods.map((method, idx) => {
                    return <option key={idx} value={method}>{method}</option>
                })}
            </select>
            <button type="submit" onClick={ExecuteMethod}>Visualize</button>
        </div>
        <div className="bars">
            <div className="noofbars">
                <label htmlFor="noofbars">Array Size : {newArray.length}</label>
                <input type="range" name="noofbars" min={MIN_BARS} max={MAX_BARS} defaultValue={DEFAULT_BARS} onChange={changeBars} disabled={disable} />
            </div>
            <div className="barspeed">
                <label htmlFor="noofbars">Play Speed : {MAX_SPEED - MIN_SPEED - barSpeed + 1}</label>
                <input type="range" name="noofbars" min={MIN_SPEED} max={MAX_SPEED} step="10" defaultValue="-50" onChange={changeSpeed} disabled={disable} />
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
            {showCode ? <Code code={code} name={Name} /> : ''}
        </div>
        <div className="div-table">
            <h2>{Name} Algorithm Complexity</h2>
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