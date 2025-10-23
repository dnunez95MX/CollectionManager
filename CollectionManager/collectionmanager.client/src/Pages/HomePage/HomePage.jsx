import { Link } from "react-router-dom";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="dashboard">
      <h1>Eres un pendejooo</h1>
      <h5>Joto</h5>
      <button>
        <Link to="search">Jalate</Link>
      </button>

      <Link to="logs">Logs</Link>
    </div>
  );
};

export default HomePage;
