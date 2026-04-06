import { createClient } from "../../lib/supabase/server";

export default async function TestimoniosPage() {
  const supabase = await createClient();

  const { data: testimonios, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error al cargar testimonios:", error);
  }

  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>Testimonios</h1>
      <p style={subtitleStyle}>
        Voces y experiencias que forman parte de BDP.
      </p>

      {!testimonios || testimonios.length === 0 ? (
        <p style={emptyStyle}>Todavía no hay testimonios publicados.</p>
      ) : (
        <section style={gridStyle}>
          {testimonios.map((testimonio) => (
            <article key={testimonio.id} style={cardStyle}>
              {testimonio.foto ? (
                <img
                  src={testimonio.foto}
                  alt={testimonio.nombre}
                  style={imageStyle}
                />
              ) : (
                <div style={placeholderStyle}>Sin foto</div>
              )}

              <h2 style={nameStyle}>{testimonio.nombre}</h2>

              {testimonio.rol && (
                <p style={roleStyle}>{testimonio.rol}</p>
              )}

              <p style={textStyle}>“{testimonio.texto}”</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
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
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
};

const cardStyle = {
  backgroundColor: "#6f4328",
  borderRadius: "14px",
  padding: "18px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  textAlign: "center",
};

const imageStyle = {
  width: "120px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "50%",
  marginBottom: "14px",
};

const placeholderStyle = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  margin: "0 auto 14px",
  backgroundColor: "#8b5e3c",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
};

const nameStyle = {
  fontSize: "1.3rem",
  marginBottom: "8px",
};

const roleStyle = {
  marginBottom: "12px",
  fontWeight: "bold",
};

const textStyle = {
  lineHeight: 1.7,
};