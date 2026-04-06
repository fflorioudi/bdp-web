"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../lib/supabase/client";

export default function NuevoTestimonioClient() {
  const router = useRouter();
  const supabase = createClient();

  const [nombre, setNombre] = useState("");
  const [texto, setTexto] = useState("");
  const [rol, setRol] = useState("");
  const [fotoFile, setFotoFile] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    setTipoMensaje("");

    let fotoUrl = "";

    if (fotoFile) {
      const fileExt = fotoFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("testimonials")
        .upload(fileName, fotoFile);

      if (uploadError) {
        console.error("Error al subir foto:", uploadError);
        setMensaje("Error al subir la foto.");
        setTipoMensaje("error");
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("testimonials")
        .getPublicUrl(fileName);

      fotoUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from("testimonials").insert([
      {
        nombre,
        texto,
        rol,
        foto: fotoUrl,
      },
    ]);

    if (error) {
      console.error("Error al crear testimonio:", error);
      setMensaje("Hubo un error al crear el testimonio.");
      setTipoMensaje("error");
      setLoading(false);
      return;
    }

    router.push("/admin/testimonios");
    router.refresh();
  }

  return (
    <main style={mainStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Nuevo testimonio</h1>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Texto del testimonio"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
            style={textareaStyle}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFotoFile(e.target.files?.[0] || null)}
            style={inputStyle}
          />

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Guardando..." : "Guardar testimonio"}
          </button>
        </form>

        {mensaje && (
          <p
            style={{
              ...messageStyle,
              ...(tipoMensaje === "success" ? successMessageStyle : errorMessageStyle),
            }}
          >
            {mensaje}
          </p>
        )}
      </div>
    </main>
  );
}

const mainStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "40px 20px",
  color: "#e6d3b3",
};

const cardStyle = {
  backgroundColor: "#6f4328",
  padding: "28px",
  borderRadius: "16px",
  boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "24px",
  fontSize: "2.2rem",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  fontSize: "1rem",
};

const textareaStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  fontSize: "1rem",
  minHeight: "180px",
  resize: "vertical",
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#8b5e3c",
  color: "#fff",
  fontSize: "1rem",
  cursor: "pointer",
};

const messageStyle = {
  marginTop: "16px",
  textAlign: "center",
  fontWeight: "bold",
  padding: "12px",
  borderRadius: "10px",
};

const successMessageStyle = {
  backgroundColor: "#355b3d",
  color: "#d9ffe0",
};

const errorMessageStyle = {
  backgroundColor: "#6a2d2d",
  color: "#ffd6d6",
};