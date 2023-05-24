import { useState } from 'react';
import './Nav.css';

const Nav = () => {
    const [showCode, setShowCode] = useState(false);

    const ShowTheCode = () => {
        setShowCode(prevCode => !prevCode);
    }

    return <div className="navbar">
        <div className="logo">
            <span>ALGO</span>
            <span style={{color: '#2CD3E1'}}>VISUALIZER</span>
        </div>
        <div className="links">
            <ul>
                <li>Sorting</li>
                <li>Searching</li>
                <li>
                    <button onClick={ShowTheCode}>Show the Code</button>
                </li>
            </ul>
        </div>
    </div>
};


export default Nav;