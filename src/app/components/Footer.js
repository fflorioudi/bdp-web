export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={innerStyle}>
        <p style={titleStyle}>BDP</p>
        <p style={textStyle}>Beato Deogracias Palacios</p>
      </div>
    </footer>
  );
}

const footerStyle = {
  marginTop: "70px",
  borderTop: "1px solid rgba(139, 94, 60, 0.55)",
  background: "linear-gradient(180deg, #4a0700 0%, #3a0400 100%)",
  color: "#e6d3b3",
  padding: "30px 20px",
};

const innerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  textAlign: "center",
};

const titleStyle = {
  margin: 0,
  fontSize: "1.2rem",
  fontWeight: "800",
  letterSpacing: "0.4px",
};

const textStyle = {
  margin: "8px 0 0",
  fontSize: "1rem",
  opacity: 0.92,
};