import React, { useEffect, useState } from 'react';
import './DropDown.css';

const DropDown = (props) => {
    const [open, setOpen] = useState(false);
    const [curMethod, setCurMethod] = useState('Insert At Begin');
    const [methods, setMethods] = useState([]);

    // updates all methods in array except current method
    useEffect(() => {
        const allMethods = [
            'Insert At Tail',
            'Insert At Begin',
            'Insert At Index',
            'Remove From Tail',
            'Remove From Head',
            'Remove From Index',
            'Reverse the List',
            'Update At Index'
        ];

        setMethods(allMethods);
    }, [props.currentMethod]);

    // Click handlers

    const handleMethodClick = (e) => {
        console.log(e.target.value);
        props.setCurrentMethod(e.target.value);
        setOpen(!open);
    };

    return (
        <div className='methods-drop-down'>
            <select className="form-select" onChange={handleMethodClick}>
                {methods.map((method, idx) => {
                    return <option key={idx} value={method}>{method}</option>
                })}
            </select>
        </div>
    );
}

export default DropDown;