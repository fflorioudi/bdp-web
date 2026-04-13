import { createClient } from "../lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: eventoDestacado } = await supabase
    .from("events")
    .select("*")
    .eq("destacado", true)
    .limit(1)
    .maybeSingle();

  return (
    <main style={heroStyle}>
      <div style={overlayStyle}>
        <div style={contentStyle}>
          <div style={badgeStyle}>Sitio oficial BDP</div>

          <h1 style={titleStyle}>Beato Deogracias Palacios</h1>

          <p style={subtitleStyle}>
            “A veces el amor tiene forma de cruz”
          </p>

          

          {eventoDestacado && (
            <div style={eventoBoxStyle}>
              <h3 style={eventoTitleStyle}>Próximo encuentro</h3>
              <p style={eventoMainTextStyle}>{eventoDestacado.titulo}</p>

              <div style={eventoInfoStyle}>
                {eventoDestacado.fecha ? (
                  <p style={eventoLineStyle}>📅 {formatearFecha(eventoDestacado.fecha)}</p>
                ) : null}

                {eventoDestacado.hora ? (
                  <p style={eventoLineStyle}>⏰ {eventoDestacado.hora}</p>
                ) : null}

                {eventoDestacado.lugar ? (
                  <p style={eventoLineStyle}>📍 {eventoDestacado.lugar}</p>
                ) : null}
              </div>
            </div>
          )}

          <div style={buttonsStyle}>
            <a href="/historia" style={buttonStyle}>Historia</a>
            <a href="/eventos" style={buttonStyle}>Eventos</a>
            <a href="/miembros" style={buttonStyle}>Miembros</a>
            <a href="/galeria" style={buttonStyle}>Galería</a>
            <a href="/playlist" style={buttonStyle}>Playlist</a>
            <a href="/testimonios" style={buttonStyle}>Testimonios</a>
          </div>
        </div>
      </div>
    </main>
  );
}

function formatearFecha(fecha) {
  return new Date(`${fecha}T00:00:00`).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
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



const eventoBoxStyle = {
  backgroundColor: "rgba(111, 67, 40, 0.92)",
  borderRadius: "16px",
  padding: "18px",
  margin: "0 auto 28px",
  maxWidth: "560px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.24)",
};

const eventoTitleStyle = {
  marginTop: 0,
  marginBottom: "10px",
  fontSize: "1.25rem",
};

const eventoMainTextStyle = {
  margin: "0 0 12px",
  fontWeight: "700",
  fontSize: "1.08rem",
};

const eventoInfoStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const eventoLineStyle = {
  margin: 0,
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