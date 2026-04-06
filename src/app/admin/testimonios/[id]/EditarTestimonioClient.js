"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../lib/supabase/client";

export default function EditarTestimonioClient({ id }) {
  const router = useRouter();
  const supabase = createClient();

  const [nombre, setNombre] = useState("");
  const [texto, setTexto] = useState("");
  const [rol, setRol] = useState("");
  const [fotoActual, setFotoActual] = useState("");
  const [fotoFile, setFotoFile] = useState(null);
  const [eliminarFoto, setEliminarFoto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    cargarTestimonio();
  }, []);

  async function cargarTestimonio() {
    setLoading(true);

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error al cargar testimonio:", error);
      setMensaje("No se pudo cargar el testimonio.");
      setTipoMensaje("error");
      setLoading(false);
      return;
    }

    setNombre(data.nombre || "");
    setTexto(data.texto || "");
    setRol(data.rol || "");
    setFotoActual(data.foto || "");
    setEliminarFoto(false);

    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMensaje("");
    setTipoMensaje("");

    let fotoUrl = fotoActual;

    if (eliminarFoto) {
      fotoUrl = "";
    }

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
        setSaving(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("testimonials")
        .getPublicUrl(fileName);

      fotoUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase
      .from("testimonials")
      .update({
        nombre,
        texto,
        rol,
        foto: fotoUrl,
      })
      .eq("id", id);

    if (error) {
      console.error("Error al editar testimonio:", error);
      setMensaje("Hubo un error al guardar los cambios.");
      setTipoMensaje("error");
      setSaving(false);
      return;
    }

    router.push("/admin/testimonios");
    router.refresh();
  }

  if (loading) {
    return (
      <main style={mainStyle}>
        <p>Cargando testimonio...</p>
      </main>
    );
  }

  return (
    <main style={mainStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Editar testimonio</h1>

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

          {fotoActual && !eliminarFoto ? (
            <img src={fotoActual} alt={nombre} style={imageStyle} />
          ) : (
            <div style={placeholderStyle}>
              {eliminarFoto ? "La foto se eliminará al guardar" : "Sin foto actual"}
            </div>
          )}

          {fotoActual && (
            <label style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={eliminarFoto}
                onChange={(e) => setEliminarFoto(e.target.checked)}
              />
              Eliminar foto actual
            </label>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFotoFile(e.target.files?.[0] || null);
              if (e.target.files?.[0]) {
                setEliminarFoto(false);
              }
            }}
            style={inputStyle}
          />

          <button type="submit" disabled={saving} style={buttonStyle}>
            {saving ? "Guardando..." : "Guardar cambios"}
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

const imageStyle = {
  width: "120px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "50%",
  alignSelf: "center",
};

const placeholderStyle = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  backgroundColor: "#8b5e3c",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  alignSelf: "center",
  textAlign: "center",
  padding: "10px",
};

const checkboxRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "1rem",
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