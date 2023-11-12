import { useEffect, useState } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

const Nav = ({ setShowCode }) => {

    const ShowTheCode = () => {
        setShowCode(prevCode => !prevCode);
    }

    return <nav className="navbar">
        <Link to='/'>
            <div className="logo">ALGO<span style={{ color: '#537FE7' }}>VISUALIZER</span></div>
        </Link>
        <ul className="nav-links" style={{ listStyleType: "none" }}>
            <input type="checkbox" id="checkbox_toggle" />
            <label htmlFor="checkbox_toggle" className="hamburger">☰</label>
            <div className="menu">
                {/* <li><Link to='/sorting'>Sorting</Link></li>
                <li><Link to='/searching'>Searching</Link></li>
                <li><Link to='/path-finding'>PathFinding</Link></li>
                <li><Link to='/linked-list'>LinkedList</Link></li>
                <li><Link to='/primes'>Primes</Link></li> */}
                <li><Link to='/'>Home</Link></li>
                {/* <li><Link to='/n-queens'>NQueens</Link></li> */}
                <li><Link to='/more'>More</Link></li>
                <li>
                    <button onClick={ShowTheCode}>Check Code</button>
                </li>
            </div>
        </ul>
    </nav>

};


export default Nav;