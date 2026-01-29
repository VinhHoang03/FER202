import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>
          <span style={styles.brandIcon}>⚡</span>
          <span style={styles.brandText}>VinhDev</span>
        </Link>
        
        <div style={styles.links}>
          <Link to="/ex1" style={styles.link}>
            <span>Exercise 1</span>
          </Link>
          <Link to="/ex2" style={styles.link}>
            <span>Exercise 2</span>
          </Link>
          <Link to="/ex3" style={styles.link}>
            <span>Exercise 3</span>
          </Link>
          <Link to="/ex4" style={styles.link}>
            <span>Exercise 4</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    padding: "20px 40px",
    background: "linear-gradient(135deg, #26617D 0%, #12212A 100%)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "40px"
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "white",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "700",
    transition: "transform 0.2s ease",
    cursor: "pointer"
  },
  brandIcon: {
    fontSize: "24px",
    animation: "pulse 2s ease-in-out infinite"
  },
  brandText: {
    letterSpacing: "0.5px"
  },
  links: {
    display: "flex",
    gap: "30px",
    alignItems: "center"
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "rgba(255, 255, 255, 0.9)",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "14px",
    padding: "8px 16px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)"
  },
  linkNumber: {
    fontSize: "12px",
    fontWeight: "700",
    opacity: 0.7,
    fontFamily: "monospace"
  }
};

export default NavBar;