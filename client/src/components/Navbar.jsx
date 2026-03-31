import { Link } from "react-router-dom";

export default function Navbar() {
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage:", error);
    localStorage.removeItem("user");
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> | <Link to="/packs">Packs</Link> |{" "}
      <Link to="/collection">My Collection</Link> |{" "}
      <Link to="/leaderboard">Leaderboard</Link> |{" "}
      {!user && <Link to="/login">Login</Link>}{" "}
      {!user && <>| <Link to="/register">Register</Link></>}
      {user?.role === "admin" && (
        <>
          {" "} | <Link to="/admin">Admin</Link>
        </>
      )}
      {user && (
        <>
          {" "} | <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}