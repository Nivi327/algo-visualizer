import SortingVisualizer from './SortingVisualizer';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './Nav.css';
import './App.css';
import SearchingVisualizer from './SearchingVisualizer';
import PrimeVisualizer from './PrimeVisualizer';
import More from './More';
import LinkedListVisualizer from './LinkedListAlgorithms/LinkedListVisualizer';
import Nav from './Nav';
import Footer from './Footer';

function App() {
  const [showCode, setShowCode] = useState(false);

  const ShowTheCode = () => {
    setShowCode(prevCode => !prevCode);
  }
  return (
    <div className="App">
      <Nav setShowCode={setShowCode} />
      <Routes>
        <Route path='/' element={<SortingVisualizer showCode={showCode}/>} />
        <Route path='/sorting' element={<SortingVisualizer showCode={showCode}/>} />
        <Route path='/searching' element={<SearchingVisualizer showCode={showCode}/>} />
        <Route path='/primes' element={<PrimeVisualizer showCode={showCode}/>} />
        <Route path='/linked-list' element={<LinkedListVisualizer showCode={showCode}/>} />
        <Route path='/more' element={<More />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
