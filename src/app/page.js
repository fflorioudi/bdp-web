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
  height: "90vh",
  backgroundImage: "url('/hero.jpeg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
};

const overlayStyle = {
  width: "100%",
  background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7))",
  backdropFilter: "blur(2px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const contentStyle = {
  textAlign: "center",
  color: "#e6d3b3",
  padding: "20px",
};

const titleStyle = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const subtitleStyle = {
  fontSize: "1.3rem",
  marginBottom: "30px",
  fontStyle: "italic",
};

const buttonsStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  justifyContent: "center",
};

const buttonStyle = {
  padding: "12px 20px",
  borderRadius: "10px",
  backgroundColor: "#8b5e3c",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "600",
};