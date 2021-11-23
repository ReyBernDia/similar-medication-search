import { Routes, Route } from "react-router-dom";
import {Home, Results} from "./screens";
import "./styles/styles.css";

export const App = () => {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search/:search" element={<Results />} />
      </Routes>
    </div>
  );
}
