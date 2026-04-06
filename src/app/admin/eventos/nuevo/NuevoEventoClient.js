"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../lib/supabase/client";

export default function NuevoEventoClient() {
  const router = useRouter();
  const supabase = createClient();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [lugar, setLugar] = useState("");
  const [imagenFile, setImagenFile] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    let imagenUrl = "";

    if (imagenFile) {
      const fileExt = imagenFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("events")
        .upload(fileName, imagenFile);

      if (uploadError) {
        console.error("Error al subir imagen:", uploadError);
        setMensaje("Error al subir la imagen.");
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("events")
        .getPublicUrl(fileName);

      imagenUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from("events").insert([
      {
        titulo,
        descripcion,
        fecha: fecha || null,
        hora,
        lugar,
        imagen: imagenUrl,
      },
    ]);

    if (error) {
      console.error("Error al crear evento:", error);
      setMensaje("Hubo un error al crear el evento.");
      setLoading(false);
      return;
    }

    router.push("/admin/eventos");
    router.refresh();
  }

  return (
    <main style={mainStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Nuevo evento</h1>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={inputStyle}
          />

          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            style={textareaStyle}
          />

          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Hora (ej: 19:30)"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Lugar"
            value={lugar}
            onChange={(e) => setLugar(e.target.value)}
            style={inputStyle}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagenFile(e.target.files?.[0] || null)}
            style={inputStyle}
          />

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Guardando..." : "Guardar evento"}
          </button>
        </form>

        {mensaje && <p style={messageStyle}>{mensaje}</p>}
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
  minHeight: "120px",
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
};