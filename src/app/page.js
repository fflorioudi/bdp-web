import { createClient } from "../lib/supabase/server";

export default async function HistoriaPage() {
  const supabase = await createClient();

  const { data: historia, error } = await supabase
    .from("history")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    console.error("Error al cargar historia:", error);
  }

  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>{historia?.titulo || "Historia"}</h1>

      {historia?.imagen ? (
        <img
          src={historia.imagen}
          alt={historia.titulo}
          style={imageStyle}
        />
      ) : null}

      <section style={contentBoxStyle}>
        <p style={contentStyle}>
          {historia?.contenido || "Todavía no hay historia cargada."}
        </p>
      </section>
    </main>
  );
}

const mainStyle = {
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "48px 20px",
  color: "#e6d3b3",
};

const titleStyle = {
  fontSize: "2.8rem",
  textAlign: "center",
  marginBottom: "30px",
};

const imageStyle = {
  width: "100%",
  maxHeight: "420px",
  objectFit: "cover",
  borderRadius: "16px",
  marginBottom: "28px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.28)",
};

const contentBoxStyle = {
  backgroundColor: "#6f4328",
  borderRadius: "16px",
  padding: "30px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
};

const contentStyle = {
  fontSize: "1.08rem",
  lineHeight: 1.9,
  whiteSpace: "pre-line",
  margin: 0,
};