export default function PlaylistPage() {
  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>Playlist BDP</h1>

      <p style={subtitleStyle}>
        Música que acompaña nuestros encuentros.
      </p>

      <div style={playerWrapperStyle}>
        <iframe
          src="https://open.spotify.com/playlist/2BKIZBICTxmHz89OwpSB7c?si=5fdff284136d461a"
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={iframeStyle}
        ></iframe>
      </div>
    </main>
  );
}

const mainStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "48px 20px",
  color: "#e6d3b3",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "2.8rem",
  marginBottom: "10px",
};

const subtitleStyle = {
  marginBottom: "30px",
  fontSize: "1.1rem",
};

const playerWrapperStyle = {
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 6px 18px rgba(0,0,0,0.28)",
};

const iframeStyle = {
  borderRadius: "16px",
};