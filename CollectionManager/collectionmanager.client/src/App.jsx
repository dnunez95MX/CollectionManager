import { Route, Routes } from "react-router-dom";
import ViteIntro from "./ViteIntro";
import BaseLayout from "./components/Layout";
import Home from "./Pages/HomePage/HomePage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import Logs from "./Pages/Logs";
import "./styles/App.scss";
import "@ant-design/v5-patch-for-react-19";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/vite" element={<ViteIntro />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
