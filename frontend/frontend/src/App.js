import './App.css';
import Home from './components/home/home';

function App() {
  return (
    <div className="container">
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item"><a href="https://www.google.com/" className="nav-link text-info" >Home</a></li>
          <li className="nav-item"><a href="https://www.google.com/" className="nav-link text-info">Add Team</a></li>
        </ul>
      </nav>
      <Home></Home>
    </div>
  );
}

export default App;
