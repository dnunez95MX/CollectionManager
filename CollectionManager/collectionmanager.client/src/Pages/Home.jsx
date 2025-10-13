import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Eres un pendejooo</h1>
      <h5>Joto</h5>
      <button>
        <Link to="search">Jalate</Link>
      </button>
    </>
  );
};

export default Home;
