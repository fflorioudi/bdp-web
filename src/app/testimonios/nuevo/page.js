"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";

export default function NuevoTestimonioPublicoPage() {
  const supabase = createClient();

  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const [texto, setTexto] = useState("");
  const [fotoFile, setFotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");

  useEffect(() => {
    if (!mensaje) return;
    const timer = setTimeout(() => setMensaje(""), 3000);
    return () => clearTimeout(timer);
  }, [mensaje]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    let fotoUrl = "";

    if (fotoFile) {
      const fileExt = fotoFile.name.split(".").pop();
      const fileName = `${Date.now()}-${fotoFile.name.replace(/\s+/g, "-")}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("testimonials")
        .upload(fileName, fotoFile);

      if (uploadError) {
        console.error("Error al subir foto:", uploadError);
        setTipoMensaje("error");
        setMensaje("Hubo un error al subir la foto.");
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
        rol,
        texto,
        foto: fotoUrl,
      },
    ]);

    if (error) {
      console.error("Error al enviar testimonio:", error);
      setTipoMensaje("error");
      setMensaje("Hubo un error al enviar el testimonio.");
      setLoading(false);
      return;
    }

    setTipoMensaje("success");
    setMensaje("¡Tu testimonio fue enviado correctamente!");
    setNombre("");
    setRol("");
    setTexto("");
    setFotoFile(null);
    setLoading(false);
  }

  return (
    <main style={mainStyle}>
      <div style={cardStyle}>
        <div style={topRowStyle}>
          <Link href="/testimonios" style={backLinkStyle}>
            ← Volver
          </Link>
        </div>

        <h1 style={titleStyle}>Dejar testimonio</h1>
        <p style={subtitleStyle}>
          Si querés, podés compartir tu experiencia con BDP.
        </p>

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
            placeholder="Rol o vínculo (opcional)"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Escribí tu testimonio"
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
            {loading ? "Enviando..." : "Enviar testimonio"}
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
  padding: "48px 20px",
  color: "#e6d3b3",
};

const cardStyle = {
  backgroundColor: "#6f4328",
  padding: "28px",
  borderRadius: "16px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.24)",
};

const topRowStyle = {
  marginBottom: "14px",
};

const backLinkStyle = {
  color: "#f1d3a2",
  textDecoration: "none",
  fontWeight: "600",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "10px",
  fontSize: "2.3rem",
};

const subtitleStyle = {
  textAlign: "center",
  marginBottom: "24px",
  fontSize: "1.05rem",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  fontSize: "1rem",
};

const textareaStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  fontSize: "1rem",
  minHeight: "180px",
  resize: "vertical",
};

const buttonStyle = {
  padding: "12px 18px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#9a6b45",
  color: "#fff",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "700",
};

const messageStyle = {
  marginTop: "16px",
  marginBottom: 0,
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