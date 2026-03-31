import { useEffect, useState } from "react";
import api from "../api/api";

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await api.get("/leaderboard");
      setLeaders(res.data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Leaderboard</h1>
      {leaders.map((entry, index) => (
        <div key={entry._id || index}>
          #{index + 1} Shirt ID: {entry._id} | Pull Count: {entry.pullCount}
        </div>
      ))}
    </div>
  );
}