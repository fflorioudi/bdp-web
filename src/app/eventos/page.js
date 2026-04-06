import { createClient } from "../../lib/supabase/server";

export default async function EventosPage() {
  const supabase = await createClient();

  const { data: eventos, error } = await supabase
    .from("events")
    .select("*")
    .order("fecha", { ascending: true });

  if (error) {
    console.error("Error al cargar eventos:", error);
  }

  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>Eventos</h1>
      <p style={subtitleStyle}>
        Enterate de las actividades y encuentros de BDP.
      </p>

      {!eventos || eventos.length === 0 ? (
        <p style={emptyStyle}>Todavía no hay eventos publicados.</p>
      ) : (
        <section style={gridStyle}>
          {eventos.map((evento) => (
            <article key={evento.id} style={cardStyle}>
              {evento.imagen ? (
                <img
                  src={evento.imagen}
                  alt={evento.titulo}
                  style={imageStyle}
                />
              ) : (
                <div style={placeholderStyle}>Sin imagen</div>
              )}

              <h2 style={cardTitleStyle}>{evento.titulo}</h2>

              <div style={metaStyle}>
                {evento.fecha && (
                  <p style={metaItemStyle}>
                    <strong>Fecha:</strong> {formatearFecha(evento.fecha)}
                  </p>
                )}
                {evento.hora && (
                  <p style={metaItemStyle}>
                    <strong>Hora:</strong> {evento.hora}
                  </p>
                )}
                {evento.lugar && (
                  <p style={metaItemStyle}>
                    <strong>Lugar:</strong> {evento.lugar}
                  </p>
                )}
              </div>

              {evento.descripcion && (
                <p style={descriptionStyle}>{evento.descripcion}</p>
              )}
            </article>
          ))}
        </section>
      )}
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

const mainStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 20px",
  color: "#e6d3b3",
};

const titleStyle = {
  fontSize: "2.6rem",
  textAlign: "center",
  marginBottom: "10px",
};

const subtitleStyle = {
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "1.1rem",
};

const emptyStyle = {
  textAlign: "center",
  fontSize: "1.1rem",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "24px",
};

const cardStyle = {
  backgroundColor: "#6f4328",
  borderRadius: "14px",
  padding: "18px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
};

const imageStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "14px",
};

const placeholderStyle = {
  width: "100%",
  height: "220px",
  borderRadius: "10px",
  marginBottom: "14px",
  backgroundColor: "#8b5e3c",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
};

const cardTitleStyle = {
  fontSize: "1.5rem",
  marginBottom: "12px",
};

const metaStyle = {
  marginBottom: "14px",
};

const metaItemStyle = {
  margin: "6px 0",
};

const descriptionStyle = {
  lineHeight: 1.6,
};