export default function PlaylistPage() {
  return (
    <main style={mainStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Playlist BDP</h1>

        <p style={subtitleStyle}>
          Música que acompaña nuestros encuentros, momentos y caminos compartidos.
        </p>

        <p style={descriptionStyle}>
          Desde acá podés abrir directamente la playlist en Spotify.
        </p>

        <a
          href="https://open.spotify.com/playlist/2BKIZBICTxmHz89OwpSB7c?si=5fdff284136d461a"
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
        >
          Abrir en Spotify
        </a>
      </div>
    </main>
  );
}

const mainStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "48px 20px",
  color: "#e6d3b3",
};

const cardStyle = {
  backgroundColor: "#6f4328",
  borderRadius: "18px",
  padding: "36px 24px",
  textAlign: "center",
  boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
};

const titleStyle = {
  fontSize: "2.8rem",
  marginBottom: "14px",
};

const subtitleStyle = {
  fontSize: "1.15rem",
  marginBottom: "14px",
  lineHeight: 1.6,
};

const descriptionStyle = {
  marginBottom: "28px",
  opacity: 0.95,
  lineHeight: 1.6,
};

const buttonStyle = {
  display: "inline-block",
  padding: "14px 22px",
  borderRadius: "12px",
  backgroundColor: "#8b5e3c",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "700",
  boxShadow: "0 6px 16px rgba(0,0,0,0.22)",
};