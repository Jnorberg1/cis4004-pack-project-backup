import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminDashboard() {
  const [shirts, setShirts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [rarities, setRarities] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    brand: "",
    description: "",
    image: "",
    rarity: "",
    categories: [],
    valueScore: 0,
  });

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const [shirtsRes, categoriesRes, raritiesRes] = await Promise.all([
          api.get("/admin/shirts"),
          api.get("/admin/categories"),
          api.get("/admin/rarities"),
        ]);

        setShirts(shirtsRes.data);
        setCategories(categoriesRes.data);
        setRarities(raritiesRes.data);
        setMessage("");
      } catch (error) {
        console.error("Admin fetch error:", error);
        if (error.response?.status === 403) {
          setMessage("Admin access only.");
        } else if (error.response?.status === 401) {
          setMessage("You must be logged in as admin.");
        } else {
          setMessage("Could not load admin data.");
        }
      }
    };

    loadAdminData();
  }, []);

  const refreshAdminData = async () => {
    try {
      const [shirtsRes, categoriesRes, raritiesRes] = await Promise.all([
        api.get("/admin/shirts"),
        api.get("/admin/categories"),
        api.get("/admin/rarities"),
      ]);

      setShirts(shirtsRes.data);
      setCategories(categoriesRes.data);
      setRarities(raritiesRes.data);
      setMessage("");
    } catch (error) {
      console.error("Admin refresh error:", error);
      setMessage("Could not refresh admin data.");
    }
  };

  const handleCategoryChange = (categoryId) => {
    setForm((prev) => {
      const exists = prev.categories.includes(categoryId);

      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((id) => id !== categoryId)
          : [...prev.categories, categoryId],
      };
    });
  };

  const handleCreateShirt = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/shirts", {
        ...form,
        valueScore: Number(form.valueScore),
      });

      setForm({
        name: "",
        brand: "",
        description: "",
        image: "",
        rarity: "",
        categories: [],
        valueScore: 0,
      });

      setMessage("Shirt created successfully.");
      refreshAdminData();
    } catch (error) {
      console.error("Create shirt error:", error);
      setMessage(error.response?.data?.message || "Could not create shirt.");
    }
  };

  const handleDeleteShirt = async (id) => {
    try {
      await api.delete(`/admin/shirts/${id}`);
      setMessage("Shirt deleted.");
      refreshAdminData();
    } catch (error) {
      console.error("Delete shirt error:", error);
      setMessage(error.response?.data?.message || "Could not delete shirt.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {message && <p>{message}</p>}

      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        <h2>Create New Shirt</h2>

        <form onSubmit={handleCreateShirt}>
          <div style={{ marginBottom: "10px" }}>
            <label>Shirt Name</label>
            <br />
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Brand</label>
            <br />
            <input
              type="text"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Description</label>
            <br />
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows="3"
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Image URL</label>
            <br />
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Rarity</label>
            <br />
            <select
              value={form.rarity}
              onChange={(e) => setForm({ ...form, rarity: e.target.value })}
              required
            >
              <option value="">Select rarity</option>
              {rarities.map((rarity) => (
                <option key={rarity._id} value={rarity._id}>
                  {rarity.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Value Score</label>
            <br />
            <input
              type="number"
              value={form.valueScore}
              onChange={(e) => setForm({ ...form, valueScore: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Categories</label>
            {categories.map((category) => (
              <div key={category._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={form.categories.includes(category._id)}
                    onChange={() => handleCategoryChange(category._id)}
                  />
                  {" "}{category.name}
                </label>
              </div>
            ))}
          </div>

          <button type="submit">Create Shirt</button>
        </form>
      </div>

      <div>
        <h2>All Shirts</h2>

        {shirts.length === 0 && <p>No shirts found.</p>}

        {shirts.map((shirt) => (
          <div
            key={shirt._id}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              marginBottom: "12px",
            }}
          >
            <h3>{shirt.name}</h3>
            <p><strong>Brand:</strong> {shirt.brand}</p>
            <p><strong>Rarity:</strong> {shirt.rarity?.name || "Unknown"}</p>
            <p>
              <strong>Categories:</strong>{" "}
              {shirt.categories?.length
                ? shirt.categories.map((c) => c.name).join(", ")
                : "None"}
            </p>
            <p><strong>Value Score:</strong> {shirt.valueScore}</p>
            <p><strong>Description:</strong> {shirt.description}</p>

            <button onClick={() => handleDeleteShirt(shirt._id)}>
              Delete Shirt
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}