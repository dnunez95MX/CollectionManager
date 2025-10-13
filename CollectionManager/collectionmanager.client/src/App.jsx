import { Route, Routes } from "react-router-dom";
import ViteIntro from "./ViteIntro";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import "@ant-design/v5-patch-for-react-19";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vite" element={<ViteIntro />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

export default App;
