import { useState } from 'react';
import './Counter.css';

export default function Counter({ initialCount = 0 }: { initialCount?: number }) {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="counter">
      <p className="counter-value">{count}</p>
      <div className="counter-buttons">
        <button
          onClick={() => setCount(count - 1)}
          className="counter-btn counter-btn--outline"
        >
          -
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="counter-btn counter-btn--primary"
        >
          +
        </button>
      </div>
    </div>
  );
}
