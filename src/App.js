import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "https://energy-backend-new.onrender.com";

function App() {
  const [data, setData] = useState({
    voltage: 0,
    current: 0,
    power: 0,
    units: 0
  });

  // Fetch data
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`${API}/api/data`)
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // 🔹 BILL CALCULATION
  const bill = (data.units * 6).toFixed(2);

  // 🔹 RESET FUNCTION
  const resetUnits = () => {
    axios.post(`${API}/api/reset`)
      .then(() => alert("Units Reset Successfully"))
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <h1>⚡ Smart Energy Dashboard</h1>

      <div className="grid">

        <div className="card">
          <h2>Voltage</h2>
          <p>{data.voltage} V</p>
        </div>

        <div className="card">
          <h2>Current</h2>
          <p>{data.current} A</p>
        </div>

        <div className="card">
          <h2>Power</h2>
          <p>{data.power} W</p>
        </div>

        <div className="card">
          <h2>Units</h2>
          <p>{data.units} kWh</p>
        </div>

        <div className="card highlight">
          <h2>💰 Bill</h2>
          <p>₹ {bill}</p>
        </div>

      </div>

      <button className="reset-btn" onClick={resetUnits}>
        Reset Units
      </button>

    </div>
  );
}

export default App;