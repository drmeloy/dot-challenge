import { useState, type MouseEvent } from 'react';
import './App.css';

type Dot = {
  x: number;
  y: number;
}

function App() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [cache, setCache] = useState<Dot[]>([])

  const drawDot = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    setDots([...dots, { x: clientX, y: clientY }]);
  }

  const undo = () => {
    if (dots.length) {
      const newDots = [...dots];
      const takeAwayDot = newDots.pop() as Dot;
      setDots(newDots);
      setCache([...cache, takeAwayDot])
    }
  }

  const redo = () => {
    if (cache.length) {
      const newCache = [...cache];
      const returnDot = newCache.pop() as Dot;
      setCache(newCache);
      setDots([...dots, returnDot])
    }
  }

  return (
    <div className="App">
      <div className='buttons-container'>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
      <div className='click-zone' onClick={drawDot}>
        {dots.map((dot) => (
        <div key={`${dot.x}-${dot.y}`} className='dot' style={{ left: dot.x, top: dot.y }}/>
        ))}
      </div>
    </div>
  );
}

export default App;
