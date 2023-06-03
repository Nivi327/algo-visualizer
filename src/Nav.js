import { useState } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

const Nav = ({setShowCode}) => {

    const ShowTheCode = () => {
        setShowCode(prevCode => !prevCode);
    }

    return <nav className="navbar">
        <div className="logo">ALGO<span style={{color:'#2CD3E1'}}>VISUALIZER</span></div>
        <ul className="nav-links" style={{listStyleType: "none"}}>
            <input type="checkbox" id="checkbox_toggle" />
            <label htmlFor="checkbox_toggle" className="hamburger">☰</label>
            <div className="menu">
                <li><Link to='/sorting'>Sorting</Link></li>
                <li><Link to='/searching'>Searching</Link></li>
                <li><Link to='/linked-list'>LinkedList</Link></li>
                <li><Link to='/primes'>Primes</Link></li>
                <li><Link to='/more'>More</Link></li>
                <li>
                    <button onClick={ShowTheCode}>Check Code</button>
                </li>
            </div>
        </ul>
    </nav>

};


export default Nav;