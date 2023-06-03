import React, { useEffect, useState } from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import Toolbar from './components/Toolbar';
import Node from './components/Node';
import Code from './../Codes/Code';
import Complexity from './../TimeComplexities.json';
import codes from './../codes.json';
import SLL from './SLL';
import './../SortingVisualizer.css';

import './LinkedListVisualizer.css';


const initialLL = new SLL();

initialLL.addToTail(10, '#2CD3E1');
initialLL.addToTail(20, '#2CD3E1');
initialLL.addToTail(-2, '#2CD3E1');

const LinkedListVisualizer = ({ showCode }) => {
    const [list, setList] = useState([]);
    const [currentMethod, setCurrentMethod] = useState('Insert At Tail');
    const [value, setValue] = useState(0);
    const [indexValue, setIndexValue] = useState(0);
    const [currentColor, setCurrentColor] = useState('#2CD3E1');
    const [length, setLength] = useState(2);

    const complexity = Complexity.LinkedList;

    useEffect(() => {
        listToArray();
    }, []);

    const listToArray = () => {
        const array = [];
        let node = initialLL.head;

        while (node) {
            array.push(node);
            node = node.next;
        }

        setList(array);
    }

    const updateLL = (e) => {
        switch (currentMethod) {
            case 'Insert At Tail':
                initialLL.addToTail(value, currentColor);
                break;
            case 'Insert At Begin':
                initialLL.InsertAtBegin(value, currentColor);
                break;
            case 'Insert At Index':
                initialLL.InsetAtIdx(value, currentColor, indexValue);
            case 'Remove From Tail':
                initialLL.removeFromTail();
                break;
            case 'Remove From Head':
                initialLL.removeFromHead();
                break;
            case 'Remove From Index':
                initialLL.removeAtIdx(indexValue);
                break;
            case 'Reverse the List':
                initialLL.reverseLL();
                break
            case 'Update At Index':
                console.log("update at");
                initialLL.updateNodeValAtIdx(value, currentColor, indexValue);
                break;
            default:
                break;
        }
        setLength(initialLL.length);
        listToArray();
    }

    return (
        <div className='linked-list'>
            <div className='wrapper'>
                <Toolbar
                    setCurrentMethod={setCurrentMethod}
                    currentMethod={currentMethod}
                    currentColor={currentColor}
                    setCurrentColor={setCurrentColor}
                    setValue={setValue}
                    setIndex={setIndexValue}
                    updateNodes={updateLL}
                    value={value}
                    indexValue={indexValue}
                    length={length}
                />
                <AnimateSharedLayout>
                    <section className='node-container'>
                        {list.map((method, index) => {
                            return <Node
                                key={method.key}
                                value={method.value}
                                next={method.next ? method.next.value : 'null'}
                                index={index}
                                color={method.color}
                            />
                        })}
                    </section>
                </AnimateSharedLayout>

            </div>
            <div className="algo-code">
                {showCode ? <Code code="LinkedList" name="LinkedList Methods" /> : ''}
            </div>
            <div className="div-table">
                <h2>LinkedList Algorithms Complexity</h2>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Insertion <br/> Begin, GivenPosition, End</th>
                            <td>O({complexity.InsertAtBegin}), O({complexity.InsertAtGivenPos}), O({complexity.InsertAtEnd})</td>
                        </tr>
                        <tr>
                            <th>Deletion <br/> Begin, GivenPosition, End</th>
                            <td>O({complexity.RemoveFromBegin}), O({complexity.RemoveFromGivenPos}), O({complexity.RemoveFromEnd})</td>
                        </tr>
                        <tr>
                            <th>Reveersing LinkedList</th>
                            <td>O({complexity.Reversing})</td>
                        </tr>
                        <tr>
                            <th>Space</th>
                            <td>O(N)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LinkedListVisualizer