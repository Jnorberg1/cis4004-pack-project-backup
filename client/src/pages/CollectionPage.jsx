import { useEffect, useState } from "react";
import api from "../api/api";

export default function CollectionPage() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await api.get("/collection");
        setCollection(res.data);
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    };

    fetchCollection();
  }, []);

  const toggleFavorite = async (id) => {
    try {
      await api.put(`/collection/favorite/${id}`);
      const res = await api.get("/collection");
      setCollection(res.data);
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Collection</h1>
      {collection.map((item) => (
        <div key={item._id} style={{ marginBottom: "12px" }}>
          <strong>{item.shirt?.name}</strong> -{" "}
          {item.isFavorite ? "Favorite" : "Not Favorite"}
          <br />
          <button onClick={() => toggleFavorite(item._id)}>
            Toggle Favorite
          </button>
        </div>
      ))}
    </div>
  );
}