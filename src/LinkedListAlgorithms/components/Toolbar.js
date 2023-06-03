import React, { useEffect, useRef, useState } from 'react';
import DropDown from './DropDown';
import './Toolbar.css';

const Toolbar = ({
    setCurrentMethod,
    currentMethod,
    setCurrentColor,
    currentColor,
    value,
    setValue,
    setIndex,
    indexValue,
    updateNodes,
    length
}) => {

    const [valid, setValid] = useState(true);
    const ref = useRef();
    let inputs;

    useEffect(() => {
        ref.current.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentMethod === 'Remove At Index' || currentMethod === 'Update At Index') {
            if (length > 0 && length > indexValue) {
                setValid(true);
                updateNodes();
            } else {
                setValid(false);
            }
        } else if (currentMethod === 'Insert At Index') {
            if (length >= indexValue) {
                setValid(true);
                updateNodes();
            } else {
                setValid(false);
            }
        } else {
            setValid(true);
            updateNodes();
        }
    };

    const handleValueChange = (e) => {
        setValue(+e.target.value);
    }

    const handleIndexChange = (e) => {
        setIndex(+e.target.value)
    }

    if (currentMethod === 'Insert At Tail' || currentMethod === 'Insert At Begin') {
        inputs = (
            <>
                {' '}
                <div className='color-container'>
                    <div className='value-container'>
                        <label htmlFor='value-input' className='label'>
                            Value
                        </label>
                        <input
                            type='number'
                            ref={ref}
                            value={value}
                            id='value-input'
                            className='value-input'
                            onChange={handleValueChange}
                        />
                    </div>
                </div>
            </>
        )
    } else if (currentMethod === 'Update At Index' || currentMethod === 'Insert At Index') {
        inputs = (
            <>
                <div className='value-container'>
                    <label htmlFor='value-input' className='label'>
                        Value
                    </label>
                    <input
                        type='number'
                        ref={ref}
                        value={value}
                        id='value-input'
                        className='value-input'
                        onChange={handleValueChange}
                    />
                </div>
                <div className='index-container'>
                    <label htmlFor='index-input' className='label'>
                        Index
                        {valid === false ? (
                            <span className='valid'>
                                {currentMethod === 'Update At Index'
                                    ? `(0 - ${length - 1})`
                                    : `(0 - ${length})`}
                            </span>
                        ) : null}
                    </label>
                    <input
                        type='number'
                        className='index-input'
                        value={indexValue}
                        id='index-input'
                        onChange={handleIndexChange}
                    />
                </div>
            </>
        );
    } else if (currentMethod === 'Remove From Index') {
        inputs = (
            <>
                <div className='index-container'>
                    <label htmlFor='index-input' className='label'>
                        Index
                        {valid === false ? (
                            <span className='valid'>{`(0 - ${length - 1})`}</span>
                        ) : null}
                    </label>
                    <input
                        type='number'
                        value={indexValue}
                        id='index-input'
                        className='index-input'
                        onChange={handleIndexChange}
                    />
                </div>
            </>
        );
    }

    return (
        <form className='tool-bar' onSubmit={handleSubmit}>
            <div className='method-container'>
                <div className='label'>Method</div>
                <DropDown
                    setCurrentMethod={setCurrentMethod}
                    currentMethod={currentMethod}
                />
            </div>

            {inputs ? inputs : null}

            <div className='submit-container'>
                <button className='submit'>Visualize</button>
            </div>
        </form>
    )
}

export default Toolbar