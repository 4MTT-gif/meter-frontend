import { useState, useEffect } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;
console.log('API_URL degeri:', API_URL);

function App() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchDevices();
  }, []);

  async function fetchDevices() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/devices`);
      if (!res.ok) throw new Error("Cihazlar getirilemedi");
      const data = await res.json();
      setDevices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addDevice(e) {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const res = await fetch(`${API_URL}/api/devices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location }),
      });
      if (!res.ok) throw new Error("Cihaz eklenemedi");
      setName("");
      setLocation("");
      fetchDevices();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteDevice(id) {
    try {
      const res = await fetch(`${API_URL}/api/devices/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Cihaz silinemedi");
      fetchDevices();
    } catch (err) {
      setError(err.message);
    }
  }

  async function addReading(id, value) {
    try {
      const res = await fetch(`${API_URL}/api/devices/${id}/readings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: Number(value) }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Okuma eklenemedi");
      }
      fetchDevices();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <h1>Cihaz / Sayac Takibi</h1>

      <form onSubmit={addDevice} className="add-form">
        <input
          placeholder="Cihaz adi"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Konum"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Ekle</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading && <p>Yukleniyor...</p>}

      {!loading && devices.length === 0 && <p>Henuz cihaz yok.</p>}

      <ul className="device-list">
        {devices.map((d) => (
          <DeviceCard key={d.id} device={d} onDelete={deleteDevice} onAddReading={addReading} />
        ))}
      </ul>
    </div>
  );
}

function DeviceCard({ device, onDelete, onAddReading }) {
  const [reading, setReading] = useState("");

  function submitReading(e) {
    e.preventDefault();
    if (reading === "") return;
    onAddReading(device.id, reading);
    setReading("");
  }

  return (
    <li className="device-card">
      <div className="device-header">
        <div>
          <strong>{device.name}</strong>
          {device.location && <span className="location"> — {device.location}</span>}
        </div>
        <button className="delete-btn" onClick={() => onDelete(device.id)}>Sil</button>
      </div>

      <form onSubmit={submitReading} className="reading-form">
        <input
          type="number"
          placeholder="Okuma degeri"
          value={reading}
          onChange={(e) => setReading(e.target.value)}
        />
        <button type="submit">Okuma Ekle</button>
      </form>

      {device.readings && device.readings.length > 0 && (
        <ul className="reading-list">
          {device.readings.map((r) => (
            <li key={r.id}>
              {r.value} <span className="date">({new Date(r.readAt).toLocaleString()})</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default App;

