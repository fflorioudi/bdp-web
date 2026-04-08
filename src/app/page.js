export default function Home() {
  return (
    <main style={heroStyle}>
      <div style={overlayStyle}>
        <div style={contentStyle}>
          <div style={badgeStyle}>Sitio oficial BDP</div>

          <h1 style={titleStyle}>Beato Deogracias Palacios</h1>

          <p style={subtitleStyle}>
            “A veces el amor tiene forma de cruz”
          </p>

          <p style={descriptionStyle}>
            Un espacio para compartir comunidad, encuentros, historia y vida en común.
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
  minHeight: "calc(100vh - 78px)",
  backgroundImage: "url('/hero.jpeg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
};

const overlayStyle = {
  width: "100%",
  background:
    "linear-gradient(180deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.72) 100%)",
  backdropFilter: "blur(2px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 18px",
  boxSizing: "border-box",
};

const contentStyle = {
  textAlign: "center",
  color: "#e6d3b3",
  width: "100%",
  maxWidth: "900px",
};

const badgeStyle = {
  display: "inline-block",
  marginBottom: "16px",
  padding: "8px 14px",
  borderRadius: "999px",
  backgroundColor: "rgba(139, 94, 60, 0.85)",
  color: "#fff",
  fontWeight: "700",
  fontSize: "0.92rem",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
};

const titleStyle = {
  fontSize: "clamp(2.4rem, 7vw, 4.8rem)",
  marginBottom: "14px",
  lineHeight: 1.08,
  textShadow: "0 3px 18px rgba(0,0,0,0.45)",
};

const subtitleStyle = {
  fontSize: "clamp(1rem, 3.5vw, 1.55rem)",
  marginBottom: "16px",
  fontStyle: "italic",
  lineHeight: 1.4,
  textShadow: "0 2px 12px rgba(0,0,0,0.4)",
};

const descriptionStyle = {
  maxWidth: "700px",
  margin: "0 auto 30px",
  fontSize: "1.05rem",
  lineHeight: 1.7,
  opacity: 0.96,
};

const buttonsStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  justifyContent: "center",
};

const buttonStyle = {
  padding: "12px 18px",
  borderRadius: "12px",
  backgroundColor: "#8b5e3c",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "700",
  minWidth: "125px",
  textAlign: "center",
  transition: "transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease",
  boxShadow: "0 6px 16px rgba(0,0,0,0.22)",
};