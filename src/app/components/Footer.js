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
  marginTop: "60px",
  borderTop: "1px solid #8b5e3c",
  backgroundColor: "#4a0700",
  color: "#e6d3b3",
  padding: "28px 20px",
};

const innerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  textAlign: "center",
};

const titleStyle = {
  margin: 0,
  fontSize: "1.2rem",
  fontWeight: "700",
};

const textStyle = {
  margin: "8px 0 4px",
  fontSize: "1rem",
};