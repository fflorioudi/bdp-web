export default function Home() {
  return (
    <main style={heroStyle}>
      <div style={overlayStyle}>
        <div style={contentStyle}>
          <h1 style={titleStyle}>Beato Deogracias Palacios</h1>

          <p style={subtitleStyle}>
            “A veces el amor tiene forma de cruz”
          </p>

          <div style={buttonsStyle}>
            <a href="/historia" style={buttonStyle}>Historia</a>
            <a href="/eventos" style={buttonStyle}>Eventos</a>
            <a href="/miembros" style={buttonStyle}>Miembros</a>
            <a href="/galeria" style={buttonStyle}>Galería</a>
            <a href="/testimonios" style={buttonStyle}>Testimonios</a>
          </div>
        </div>
      </div>
    </main>
  );
}

const heroStyle = {
  minHeight: "calc(100vh - 80px)",
  backgroundImage: "url('/hero.jpeg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
};

const overlayStyle = {
  width: "100%",
  background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.72))",
  backdropFilter: "blur(2px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "32px 18px",
  boxSizing: "border-box",
};

const contentStyle = {
  textAlign: "center",
  color: "#e6d3b3",
  width: "100%",
  maxWidth: "900px",
};

const titleStyle = {
  fontSize: "clamp(2.2rem, 7vw, 4.5rem)",
  marginBottom: "12px",
  lineHeight: 1.1,
};

const subtitleStyle = {
  fontSize: "clamp(1rem, 3.5vw, 1.5rem)",
  marginBottom: "28px",
  fontStyle: "italic",
  lineHeight: 1.4,
};

const buttonsStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  justifyContent: "center",
};

const buttonStyle = {
  padding: "12px 18px",
  borderRadius: "10px",
  backgroundColor: "#8b5e3c",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "600",
  minWidth: "120px",
  textAlign: "center",
};