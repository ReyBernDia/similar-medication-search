import React from "react";
import logo from "./assets/smiliar-meds-icon.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="loading-text">{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;