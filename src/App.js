import logo from './logo.svg';
import './App.css';
import GardenBedCanvas from './Canvas';
import PlantsKey from './Plants';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Garden Bed Planner</p>
        <div className='canvas-row'>
          <GardenBedCanvas />
          <PlantsKey />
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
