import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#25D366", // Verde WhatsApp
        padding: "10px",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100, // Asegura que esté encima de todo
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Subir Sticker
      </Link>
      <Link
        to="/marketplace"
        style={{ color: "white", textDecoration: "none" }}
      >
        Marketplace
      </Link>
      <Link
        to="/leaderboard"
        style={{ color: "white", textDecoration: "none" }}
      >
        Leaderboard
      </Link>
      <Link to="/payment" style={{ color: "white", textDecoration: "none" }}>
        Pagos
      </Link>
    </nav>
  );
}

export default Navbar;
