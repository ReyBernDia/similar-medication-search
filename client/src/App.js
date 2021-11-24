import { Routes, Route } from "react-router-dom";
import {Home, Results} from "./screens";
import "./styles/styles.css";

function App(){
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search/:rxcui/:name" element={<Results />} />
      </Routes>
    </div>
  );
}
export default App