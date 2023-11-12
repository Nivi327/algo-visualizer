import SortingVisualizer from './SortingVisualizer';
import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './Nav.css';
import './App.css';
import SearchingVisualizer from './SearchingVisualizer';
import PrimeVisualizer from './PrimeVisualizer';
import More from './More';
import LinkedListVisualizer from './LinkedListAlgorithms/LinkedListVisualizer';
import Nav from './Nav';
import Footer from './Footer';
import PathVisualizer from './PathFindingVisualizer/PathVisualizer';
import Home from './components/Home/Home';
import NQueens from './NQueens/NQueens';

function App() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="App">
      <Nav setShowCode={setShowCode} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sorting' element={<SortingVisualizer showCode={showCode} />} />
        <Route path='/searching' element={<SearchingVisualizer showCode={showCode} />} />
        <Route path='/path-finding' element={<PathVisualizer showCode={showCode} />} />
        <Route path='/primes' element={<PrimeVisualizer showCode={showCode} />} />
        {/* <Route path='/n-queens' element={<NQueens showCode={showCode} />} /> */}
        <Route path='/linked-list' element={<LinkedListVisualizer showCode={showCode} />} />
        <Route path='/more' element={<More />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
