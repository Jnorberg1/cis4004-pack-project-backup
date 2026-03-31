import { useEffect, useState } from "react";
import api from "../api/api";

export default function PacksPage() {
  const [packs, setPacks] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchPacks = async () => {
      const res = await api.get("/packs");
      setPacks(res.data);
    };
    fetchPacks();
  }, []);

  const handleOpenPack = async (packId) => {
    try {
      const res = await api.post(`/packs/open/${packId}`);
      setResults(res.data.results);
    } catch (error) {
      alert(error.response?.data?.message || "Could not open pack");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Packs</h1>
      {packs.length === 0 && <p>No packs yet.</p>}

      {packs.map((pack) => (
        <div key={pack._id} style={{ marginBottom: "20px" }}>
          <h3>{pack.name}</h3>
          <p>{pack.description}</p>
          <button onClick={() => handleOpenPack(pack._id)}>Open Pack</button>
        </div>
      ))}

      <h2>Latest Pull</h2>
      {results.map((shirt) => (
        <div key={shirt._id}>{shirt.name}</div>
      ))}
    </div>
  );
}