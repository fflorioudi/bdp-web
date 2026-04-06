"use client";

import { useState } from "react";
import { createClient } from "../../../../lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  pageNarrowStyle,
  formCardStyle,
  centeredTitleStyle,
  inputStyle,
  primaryButtonStyle,
  messageBaseStyle,
  successMessageStyle,
  errorMessageStyle,
} from "../../../../lib/adminStyles";

export default function NuevoGaleriaClient() {
  const supabase = createClient();
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [file, setFile] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!file) {
      setMensaje("Tenés que seleccionar una imagen.");
      setTipoMensaje("error");
      return;
    }

    setLoading(true);
    setMensaje("");
    setTipoMensaje("");

    const fileName = `${Date.now()}.${file.name.split(".").pop()}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Error al subir imagen:", uploadError);
      setMensaje("Hubo un error al subir la imagen.");
      setTipoMensaje("error");
      setLoading(false);
      return;
    }

    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    const { error: insertError } = await supabase
      .from("gallery")
      .insert([{ titulo, imagen: data.publicUrl }]);

    if (insertError) {
      console.error("Error al guardar imagen en base de datos:", insertError);
      setMensaje("La imagen subió, pero hubo un error al guardarla.");
      setTipoMensaje("error");
      setLoading(false);
      return;
    }

    router.push("/admin/galeria");
    router.refresh();
  }

  return (
    <main style={pageNarrowStyle}>
      <div style={formCardStyle}>
        <h1 style={centeredTitleStyle}>Nueva imagen</h1>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            placeholder="Título (opcional)"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={inputStyle}
          />

          <label style={fileLabelStyle}>
            <span style={fileLabelTextStyle}>Seleccionar imagen</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={hiddenFileInputStyle}
              required
            />
          </label>

          <p style={fileNameStyle}>
            {file ? file.name : "Ningún archivo seleccionado"}
          </p>

          <button type="submit" disabled={loading} style={primaryButtonStyle}>
            {loading ? "Guardando..." : "Guardar imagen"}
          </button>
        </form>

        {mensaje && (
          <p
            style={{
              ...messageStyle,
              ...(tipoMensaje === "success"
                ? successMessageStyle
                : errorMessageStyle),
            }}
          >
            {mensaje}
          </p>
        )}
      </div>
    </main>
  );
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const fileLabelStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 18px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#8b5e3c",
  color: "#fff",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "600",
  width: "fit-content",
};

const fileLabelTextStyle = {
  pointerEvents: "none",
};

const hiddenFileInputStyle = {
  display: "none",
};

const fileNameStyle = {
  margin: 0,
  opacity: 0.9,
  fontSize: "0.95rem",
};

const messageStyle = {
  marginTop: "16px",
  marginBottom: 0,
  textAlign: "center",
  fontWeight: "bold",
  padding: "12px",
  borderRadius: "10px",
};