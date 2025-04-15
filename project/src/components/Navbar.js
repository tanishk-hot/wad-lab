import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">F1 Hub</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Drivers</Link>
        <Link to="/calendar">Race Calendar</Link>
        <Link to="/teams">Teams</Link>
      </div>
    </nav>
  );
}

export default Navbar;