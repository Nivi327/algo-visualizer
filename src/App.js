import SortingVisualizer from './SortingVisualizer';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './Nav.css';
import './App.css';
import SearchingVisualizer from './SearchingVisualizer';
import PrimeVisualizer from './PrimeVisualizer';

function App() {
  const [showCode, setShowCode] = useState(false);

  const ShowTheCode = () => {
    setShowCode(prevCode => !prevCode);
  }
  return (
    <div className="App">
      <div className="navbar">
        <div className="logo">
          <span>ALGO</span>
          <span style={{ color: '#2CD3E1' }}>VISUALIZER</span>
        </div>
        <div className="links">
          <ul>
            <li><Link to='/sorting'>Sorting</Link></li>
            <li><Link to='/searching'>Searching</Link></li>
            <li><Link to='/primes'>Primes</Link></li>
            <li>
              <button onClick={ShowTheCode}>Check Code</button>
            </li>
          </ul>
        </div>
      </div>
      <Routes>
        <Route path='/' element={<SortingVisualizer showCode={showCode}/>} />
        <Route path='/sorting' element={<SortingVisualizer showCode={showCode}/>} />
        <Route path='/searching' element={<SearchingVisualizer showCode={showCode}/>} />
        <Route path='/primes' element={<PrimeVisualizer showCode={showCode}/>} />
      </Routes>
    </div>
  );
}

export default App;
