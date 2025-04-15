import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Drivers from './pages/Drivers';
import Calendar from './pages/Calendar';
import Teams from './pages/Teams';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Drivers />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/teams" element={<Teams />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
