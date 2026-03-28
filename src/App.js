import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({
    voltage: 0,
    current: 0,
    power: 0,
    units: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://energy-backend-new.onrender.com/api/data"
        );
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>⚡ Smart Energy Meter Dashboard</h1>

      <div className="card">Voltage: {data.voltage} V</div>
      <div className="card">Current: {data.current} A</div>
      <div className="card">Power: {data.power} W</div>
      <div className="card">Units: {data.units} kWh</div>
    </div>
  );
}

export default App;