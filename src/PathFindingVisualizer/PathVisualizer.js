import React, { useEffect, useState } from 'react';
import Node from './Node/Node';
import Code from '../Codes/Code';

import classes from './PathVisualizer.module.css';

import { bfsn4 } from './Algorithms/bfs';
import { dfsn4 } from './Algorithms/dfs';
import { dijkstra } from './Algorithms/dijkstra';

import complexities from './../TimeComplexities.json';

const MOBILE_ROW_COUNT = 15;
const MOBILE_COL_COUNT = 15;
const PathMethods = ['BFS', 'DFS', 'Dijkstra'];

const PathVisualizer = ({showCode}) => {
    const [grid, setGrid] = useState([]);
    const [rowsCols, setRowsCols] = useState({ rows: 25, cols: 35 });
    const [startRowsCols, setStartRowsCols] = useState({ row: 3, col: 2 });
    const [endRowsCols, setEndRowsCols] = useState({ row: 5, col: 10 });
    const [isVisualizing, setIsVisualizing] = useState(false);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isStartNode, setIsStartNode] = useState(false);
    const [isFinishNode, setIsFinishNode] = useState(false);
    const [isAdjusted, setIsAdjusted] = useState(true);
    const [isWallNode, setIsWallNode] = useState(false);
    const [curRow, setCurRow] = useState(0);
    const [curCol, setCurCol] = useState(0);
    const [curMethod, setCurrentMethod] = useState('BFS');
    const [Name, setName] = useState('Breadth First Search');
    const [code, setCode] = useState("BFS");

    const createNode = (row, col) => {
        return {
            row,
            col,
            isStart: row === startRowsCols.row && col === startRowsCols.col,
            isFinish: row === endRowsCols.row && col === endRowsCols.col,
            distance: Infinity,
            distanceToFinishNode:
                Math.abs(endRowsCols.row - row) + Math.abs(endRowsCols.col - col),
            isVisited: false,
            isWall: false,
            previousNode: null,
            isNode: true,
        };
    }

    const getInitialGrid = (rows = rowsCols.rows, cols = rowsCols.cols) => {
        const initialGrid = [];
        for (let row = 0; row < rows; row++) {
            const currentRow = [];
            for (let col = 0; col < cols; col++) {
                currentRow.push(createNode(row, col));
            }
            initialGrid.push(currentRow);
        }
        return initialGrid;
    }

    const resetGrid = () => {
        if (!isVisualizing) {
            const newGrid = grid.slice();
            for (let r of newGrid) {
                for (let node of r) {
                    let nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
                    console.log(nodeClassName);
                    if (nodeClassName !== 'path-node node-start' &&
                        nodeClassName !== 'path-node node-finish' &&
                        nodeClassName !== 'path-node node-wall') {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'path-node';
                        node.isVisited = false;
                        node.distance = Infinity;
                        node.distanceToFinishNode = Math.abs(endRowsCols.row - node.row) + Math.abs(endRowsCols.col - node.col);
                    }
                    if (nodeClassName === 'path-node node-finish') {
                        node.isVisited = false;
                        node.distance = Infinity;
                        node.distanceToFinishNode = 0;
                    } if (nodeClassName === 'path-node node-start') {
                        node.isVisited = false;
                        node.distance = Infinity;
                        node.distanceToFinishNode = Math.abs(endRowsCols.row - node.row) + Math.abs(endRowsCols.col - node.col);
                        node.isStart = true;
                        node.isWall = false;
                        node.previousNode = null;
                        node.isNode = true;
                    }
                }
            }
            setGrid(newGrid);
        }
    }

    const isGridClear = () => {
        for (let row of grid) {
            for (let node of row) {
                const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
                if (nodeClassName === 'path-node node-visited' || nodeClassName === 'path-node node-shortest-path') {
                    return false;
                }
            }
        }
        return true;
    }

    // handle mouse events

    const handleMouseDown = (row, col) => {
        if (!isRunning) {
            if (isGridClear()) {
                if (document.getElementById(`node-${row}-${col}`).className === 'path-node node-start') {
                    setMouseIsPressed(true);
                    setIsStartNode(true);
                    setCurRow(row);
                    setCurCol(col);
                } else if (document.getElementById(`node-${row}-${col}`).className === 'path-node node-finish') {
                    setMouseIsPressed(true);
                    setIsFinishNode(true);
                    setCurRow(row);
                    setCurCol(col);
                } else {
                    const newGrid = ToggleGridWall(grid, row, col);
                    setGrid(newGrid);
                    setMouseIsPressed(true);
                    setIsWallNode(true);
                    setCurRow(row);
                    setCurCol(col);
                }
            } else {
                resetGrid();
            }
        }
    }

    const handleMouseEnter = (row, col) => {
        if (!isRunning) {
            if (mouseIsPressed) {
                const nodeClassName = document.getElementById(`node-${row}-${col}`).className;
                if (isStartNode) {
                    if (nodeClassName !== 'path-node node-wall') {
                        const prevStartNode = grid[curRow][curCol];
                        prevStartNode.isStart = false;
                        document.getElementById(`node-${curRow}-${curCol}`).className = 'path-node';
                        setCurRow(row);
                        setCurCol(col);
                        const curStartNode = grid[row][col];
                        curStartNode.isStart = true;
                        document.getElementById(`node-${row}-${col}`).className = 'path-node node-start';
                    }
                    setStartRowsCols({ row, col })
                } else if (isFinishNode) {
                    if (nodeClassName !== 'path-node node-wall') {
                        const prevFinishNode = grid[curRow][curCol];
                        prevFinishNode.isFinish = false;
                        document.getElementById(`node-${curRow}-${curCol}`).className = 'path-node';
                        setCurRow(row);
                        setCurCol(col);
                        const curFinishNode = grid[row][col];
                        curFinishNode.isFinish = true;
                        document.getElementById(`node-${row}-${col}`).className = 'path-node node-finish';
                    }
                    setEndRowsCols({ row, col });
                } else if (isWallNode) {
                    const newGrid = ToggleGridWall(grid, row, col);
                    setGrid(newGrid);
                }
            }
        }
    }

    const handleMouseUp = (row, col) => {
        if (!isRunning) {
            setMouseIsPressed(false);
            if (isStartNode) {
                setIsStartNode(prevValue => !prevValue);
                setStartRowsCols({ row, col });
            } else if (isFinishNode) {
                setIsFinishNode(prevValue => !prevValue);
                setEndRowsCols({ row, col });
            }
            getInitialGrid();
        }
    }

    const handleMouseLeave = () => {
        if (isStartNode) {
            setIsStartNode(prevValue => !prevValue);
            setMouseIsPressed(false);
        } else if (isFinishNode) {
            setIsFinishNode(prevValue => !prevValue);
            setMouseIsPressed(false);
        } else if (isWallNode) {
            setIsWallNode(prevValue => !prevValue);
            setMouseIsPressed(false);
            getInitialGrid();
        }
    }

    const removeWater = () => {
        if (!isRunning) {
            const newGrid = grid.slice();
            for (const row of newGrid) {
                for (const node of row) {
                    let nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
                    if (nodeClassName === 'path-node node-wall') {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'path-node';
                        node.isWall = false;
                    }
                }
            }
            setGrid(newGrid);
        }
    }

    // adjust grid
    const adjustGrid = () => {
        if (!isRunning) {
            resetGrid();
            removeWater();
            setIsAdjusted(prevValue => !prevValue);
            let grid;
            if (!isAdjusted) {
                grid = getInitialGrid();
                setGrid(grid);
            } else {
                if (startRowsCols.row > MOBILE_ROW_COUNT || endRowsCols.row > MOBILE_ROW_COUNT
                    || startRowsCols.col > MOBILE_COL_COUNT || endRowsCols.col > MOBILE_COL_COUNT) {
                    alert(`Starting and Ending points must be within a grid of size ${MOBILE_ROW_COUNT} rows x ${MOBILE_COL_COUNT} cols`)
                } else {
                    grid = getInitialGrid(MOBILE_ROW_COUNT, MOBILE_COL_COUNT);
                    setGrid(grid);
                }
            }
        }
    }

    const visualize = (algo) => {
        if (!isRunning) {
            resetGrid();
            setIsRunning(true);
            let startNode = grid[startRowsCols.row][startRowsCols.col];
            let endNode = grid[endRowsCols.row][endRowsCols.col];

            let visitedNodes;
            switch (algo) {
                case 'BFS':
                    setCode("BFS");
                    setName("Breadth First Search");
                    visitedNodes = bfsn4(grid, startNode, endNode);
                    break;
                case 'DFS':
                    setCode("DFS");
                    setName("Depth First Search");
                    visitedNodes = dfsn4(grid, startNode, endNode);
                    break;
                case "Dijkstra":
                    setCode("Dijkstra");
                    setName("Dijkstra Shortest Path")
                    visitedNodes = dijkstra(grid, startNode, endNode);
            }

            const shorterPath = getShorterPath(endNode);
            console.log(visitedNodes);
            animateGrid(visitedNodes, shorterPath);
        }
    }

    const animateGrid = (visitedNodes, shorterPath) => {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    animateShorterPath(shorterPath);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
                if (nodeClassName !== 'path-node node-start' && nodeClassName !== 'path-node node-finish') {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'path-node node-visited';
                }
            }, 10 * i);
        }
    }

    const animateShorterPath = (shorterPath) => {
        for (let i = 0; i <= shorterPath.length; i++) {
            if (i === shorterPath.length) {
                setTimeout(() => {
                    setIsRunning(false);
                }, 50 * i);
                return;
            }
            setTimeout(() => {
                const node = shorterPath[i];
                const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
                if (nodeClassName !== 'path-node node-start' && nodeClassName !== 'path-node node-finish') {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'path-node node-shortest-path';
                }
            }, 40 * i);
        }
    }

    const handleMethodClick = (e) => {
        const method = e.target.value;
        setCurrentMethod(method);
    }

    useEffect(() => {
        const newGrid = getInitialGrid();
        setGrid(newGrid);
    }, []);

    return (
        <>
            <div className='btns'>
                <button onClick={resetGrid}>Reset Grid</button>
                <button onClick={removeWater}>Remove Water</button>
                {/* <button onClick={() => visualize('BFS')}>Breadth First Search</button>
                <button onClick={() => visualize('DFS')}>Depth First Search</button>
                <button onClick={() => visualize('dijkstra')}>Dijkstra's</button> */}
                <select className="form-select" onChange={handleMethodClick}>
                    {PathMethods.map((method, idx) => {
                        return <option key={idx} value={method}>{method}</option>
                    })}
                </select>
                <button type="submit" onClick={() => visualize(curMethod)}>Visualize</button>
                <button onClick={adjustGrid}>{isAdjusted ? 'Small' : 'Large'} Grid</button>
            </div>
            <table className={classes['grid-container']} onMouseLeave={() => handleMouseLeave()}>
                <tbody className={classes['grid']}>
                    {grid.map((row, rowIdx) => {
                        return <tr className={classes['path-tr']} key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const { row, col, isFinish, isStart, isWall } = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        row={row}
                                        col={col}
                                        isFinish={isFinish}
                                        isStart={isStart}
                                        isWall={isWall}
                                        mouseIsPressed={mouseIsPressed}
                                        onMouseDown={(row, col) => {
                                            handleMouseDown(row, col)
                                        }}
                                        onMouseEnter={(row, col) => {
                                            handleMouseEnter(row, col)
                                        }}
                                        onMouseUp={() => handleMouseUp(row, col)}
                                    />
                                )
                            })}
                        </tr>
                    })}
                </tbody>
            </table>

            <div className="algo-code">
                {showCode ? <Code code={code} name={Name} /> : ''}
            </div>

            <div className="div-table">
                <h2>Shortest-path Finding Algorithm Complexity</h2>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Breadth First Search</th>
                            <td>O({complexities["PathFinding"]['Breadth First Search(BFS)']})</td>
                        </tr>
                        <tr>
                            <th>Depth First Search</th>
                            <td>O({complexities["PathFinding"]["Depth First Search(DFS)"]})</td>
                        </tr>
                        <tr>
                            <th>Dijkstra's Shortest Path</th>
                            <td>O({complexities["PathFinding"]["Dijkstra Shortest Path"]})</td>
                        </tr>
                        <tr>
                            <th>Space</th>
                            <td>O({complexities["PathFinding"].Space})</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

const ToggleGridWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (!node.isStart && !node.isFinish && node.isNode) {
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
    }
    return newGrid;
}

// backtrack from endNode
const getShorterPath = (endNode) => {
    let shorterPath = [];
    let curNode = endNode;
    while (curNode != null) {
        shorterPath.unshift(curNode);
        curNode = curNode.previousNode;
    }
    return shorterPath;
}

export default PathVisualizer