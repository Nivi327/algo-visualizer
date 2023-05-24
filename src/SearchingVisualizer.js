import React, { useEffect, useState } from 'react';
import { BubbleSortAlgo } from './SortingMethods/BubbleSort';
import { linearSearch } from './SearchingAlgorithms/LinearSearch';
import { AiFillPlaySquare } from 'react-icons/ai';
import './SortingVisualizer.css';
import './SearchingVisualizer.css';
import { binarySearch } from './SearchingAlgorithms/BinarySearch';
import Complexities from './SortingMethods/TimeComplexities.json';
import BubbleSortCode from './SortingMethods/Codes/Code';

const FREQ_MAX = 600;
const FREQ_MIN = 200;
const DURATION = 1;
const MIN_BARS = 15;
const DEFAULT_BARS = 25;
const MAX_BARS = 40;
const MIN_SPEED = -100;
const MAX_SPEED = 50;
const MIN_RANGE = 5;
const MAX_RANGE = 400;

const PRIMARY_COLOR = 'red';
const SECONDARY_COLOR = 'rgba(0, 157, 255, 0.8)';
const FIX_COLOR = 'rgba(109, 107, 255, 0.62)';
const FOUND_COLOR = '#2CD3E1';

const SearchingVisualizer = ({ showCode }) => {
    const [newArray, setNewArray] = useState([]);
    const [noOfBars, setNoOfBars] = useState(DEFAULT_BARS);
    const [barSpeed, setBarSpeed] = useState(100);
    const [sortedArr, setSortedArr] = useState([]);
    const [SearchKey, setSearchKey] = useState(40);

    const lsComplexity = Complexities.LinearSearch;
    const bsComplexity = Complexities.BinarySearch;

    const randomInt = (a, b) => {
        return Math.floor(Math.random() * (a - b + 1) + b)
    }

    const changeSpeed = (e) => {
        setBarSpeed(MAX_SPEED - (+e.target.value))
    }

    const changeBars = (e) => {
        setNoOfBars(+e.target.value);
    }

    const updatelsKey = (e) => {
        setSearchKey(e.target.value);
    }

    const updatebsKey = (e) => {
        setSearchKey(e.target.value);
    }

    const resetArray = () => {
        let arr = [];
        for (let i = 0; i < noOfBars; i++) {
            arr.push(randomInt(MIN_RANGE, MAX_RANGE));
        }
        setNewArray(arr);
        const [, array] = BubbleSortAlgo(arr);
        setSortedArr(array);
    }

    const StartLinearSearch = () => {
        const animations = linearSearch(newArray, SearchKey);
        const lsBars = document.getElementsByClassName("ls");
        for (let i = 0; i < animations.length; i++) {
            if (animations[i][0] === "compare1" || animations[i][0] === "compare2") {
                const color = animations[i][0] === "compare1" ? PRIMARY_COLOR : SECONDARY_COLOR;
                const barIdx = animations[i][1];
                const barStyle = lsBars[barIdx].style;
                setTimeout(() => {
                    barStyle.backgroundColor = color;
                }, i * barSpeed);
            } else {
                const barIdx = animations[i][1];
                const barStyle = lsBars[barIdx].style;
                setTimeout(() => {
                    barStyle.backgroundColor = FOUND_COLOR;
                }, i * barSpeed);
            }
        }
    }

    const StartBinarySearch = () => {
        const animations = binarySearch(sortedArr, SearchKey);
        const bsBars = document.getElementsByClassName("bs");
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === "compare1" || animations[i][0] === "compare2";
            if (isColorChange) {
                const color = animations[i][0] === "compare1" ? PRIMARY_COLOR : SECONDARY_COLOR;
                const barIdx = animations[i][1];
                const barStyle = bsBars[barIdx].style;
                setTimeout(() => {
                    barStyle.backgroundColor = color;
                }, i * barSpeed);
            } else {
                if (animations[i][0] === "low1" || animations[i][0] === "low2") {
                    const color = animations[i][0] === "low1" ? FIX_COLOR : SECONDARY_COLOR;
                    const barIdx = animations[i][1];
                    const barStyle = bsBars[barIdx].style;
                    setTimeout(() => {
                        barStyle.backgroundColor = color;
                    }, i * barSpeed);
                } else if (animations[i][0] === "high1" || animations[i][0] === "high2") {
                    const color = animations[i][0] === "high1" ? FIX_COLOR : SECONDARY_COLOR;
                    const barIdx = animations[i][1];
                    const barStyle = bsBars[barIdx].style;
                    setTimeout(() => {
                        barStyle.backgroundColor = color;
                    }, i * barSpeed);
                } else if (animations[i][0] === "Found") {
                    const barIdx = animations[i][1];
                    const barStyle = bsBars[barIdx].style;
                    setTimeout(() => {
                        barStyle.backgroundColor = FOUND_COLOR;
                    }, i * barSpeed);
                }
            }
        }
    }

    useEffect(() => {
        resetArray();
    }, [noOfBars]);

    return (
        <>
            <div className="bars">
                <div className="noofbars">
                    <label htmlFor="noofbars">Array Size : {newArray.length}</label>
                    <input type="range" name="noofbars" min={MIN_BARS} max={MAX_BARS} defaultValue={DEFAULT_BARS} onChange={changeBars} />
                </div>
                <div className="barspeed">
                    <label htmlFor="noofbars">Play Speed : {MAX_SPEED - MIN_SPEED - barSpeed + 1}</label>
                    <input type="range" name="noofbars" min={MIN_SPEED} max={MAX_SPEED} step="10" defaultValue="-50" onChange={changeSpeed} />
                </div>
            </div>
            <div>
                <div className='search'>
                    <div className='linear header-search'>
                        <div className='search-name'>
                            <span>Linear Search</span>
                        </div>
                        <div className='search-key'>
                            <input type='number' className='search-input' name='ls' onChange={updatelsKey} defaultValue="40" value={SearchKey} />
                            <label htmlFor='ls' className='key-label'>Search Key</label>
                        </div>
                        <div className='search-icon'>
                            <AiFillPlaySquare className='search-icon' onClick={StartLinearSearch} />
                        </div>
                    </div>
                    <div className="div-container">
                        {newArray.map((val, idx) => {
                            return <div key={idx} id={idx + 1} className="div-bar ls">
                                <div style={{ height: `${val}px`, color: SECONDARY_COLOR }} className="bar"></div>
                                <span className="value">{val}</span>
                            </div>
                        })}
                    </div>
                </div>
                <div className='search'>
                    <div className='linear header-search'>
                        <div className='search-name'>
                            <span>Binary Search</span>
                        </div>
                        <div className='search-key'>
                            <input type='number' className='search-input' name='bs' onChange={updatebsKey} defaultValue="40" value={SearchKey} />
                            <label htmlFor='bs' className='key-label'>Search Key</label>
                        </div>
                        <div className='search-icon'>
                            <AiFillPlaySquare className='search-icon' onClick={StartBinarySearch} />
                        </div>
                    </div>
                    <div className="div-container">
                        {sortedArr.map((val, idx) => {
                            return <div key={idx} id={idx + 1} className="div-bar bs">
                                <div style={{ height: `${val}px` }} className="bar"></div>
                                <span className="value">{val}</span>
                            </div>
                        })}
                    </div>
                </div>
            </div>
            <div>
                <div className="algo-code">
                    {showCode ? <BubbleSortCode code="LinearSearch" name="Linear Search" /> : ''}
                </div>
                <div className="algo-code">
                    {showCode ? <BubbleSortCode code="BinarySearch" name="Binary Search" /> : ''}
                </div>
            </div>
            <div className='complexities'>
                <div className="div-table">
                    <h2>LinearSearch Algorithm Complexity</h2>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Best Case</th>
                                <td>O({lsComplexity.Best})</td>
                            </tr>
                            <tr>
                                <th>Average Case</th>
                                <td>O({lsComplexity.Average})</td>
                            </tr>
                            <tr>
                                <th>Worst Case</th>
                                <td>O({lsComplexity.Worst})</td>
                            </tr>
                            <tr>
                                <th>Space</th>
                                <td>O({lsComplexity.Space})</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="div-table">
                    <h2>BinarySearch Algorithm Complexity</h2>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Best Case</th>
                                <td>O({bsComplexity.Best})</td>
                            </tr>
                            <tr>
                                <th>Average Case</th>
                                <td>O({bsComplexity.Average})</td>
                            </tr>
                            <tr>
                                <th>Worst Case</th>
                                <td>O({bsComplexity.Worst})</td>
                            </tr>
                            <tr>
                                <th>Space</th>
                                <td>O({bsComplexity.Space})</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default SearchingVisualizer