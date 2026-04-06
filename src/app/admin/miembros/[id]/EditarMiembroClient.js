"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../lib/supabase/client";

export default function EditarMiembroClient({ id }) {
  const router = useRouter();
  const supabase = createClient();

  const [nombre, setNombre] = useState("");
  const [apodo, setApodo] = useState("");
  const [edad, setEdad] = useState("");
  const [rol, setRol] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [frase, setFrase] = useState("");
  const [fotoActual, setFotoActual] = useState("");
  const [fotoFile, setFotoFile] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    cargarMiembro();
  }, []);

  async function cargarMiembro() {
    setLoading(true);

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error al cargar miembro:", error);
      setMensaje("No se pudo cargar el miembro.");
      setLoading(false);
      return;
    }

    setNombre(data.nombre || "");
    setApodo(data.apodo || "");
    setEdad(data.edad || "");
    setRol(data.rol || "");
    setDescripcion(data.descripcion || "");
    setFrase(data.frase || "");
    setFotoActual(data.foto || "");

    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMensaje("");

    let fotoUrl = fotoActual;

    if (fotoFile) {
      const fileExt = fotoFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("members")
        .upload(fileName, fotoFile);

      if (uploadError) {
        console.error("Error al subir foto:", uploadError);
        setMensaje("Error al subir la nueva foto.");
        setSaving(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("members")
        .getPublicUrl(fileName);

      fotoUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase
      .from("members")
      .update({
        nombre,
        apodo,
        edad: edad ? Number(edad) : null,
        rol,
        descripcion,
        frase,
        foto: fotoUrl,
      })
      .eq("id", id);

    if (error) {
      console.error("Error al editar miembro:", error);
      setMensaje("Hubo un error al guardar los cambios.");
      setSaving(false);
      return;
    }

    router.push("/admin/miembros");
    router.refresh();
  }

  if (loading) {
    return (
      <main style={mainStyle}>
        <p>Cargando miembro...</p>
      </main>
    );
  }

  return (
    <main style={mainStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Editar miembro</h1>

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
            placeholder="Apodo"
            value={apodo}
            onChange={(e) => setApodo(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
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
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            style={textareaStyle}
          />

          <textarea
            placeholder="Frase"
            value={frase}
            onChange={(e) => setFrase(e.target.value)}
            style={textareaStyle}
          />

          {fotoActual ? (
            <img src={fotoActual} alt={nombre} style={imageStyle} />
          ) : (
            <div style={placeholderStyle}>Sin foto actual</div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFotoFile(e.target.files?.[0] || null)}
            style={inputStyle}
          />

          <button type="submit" disabled={saving} style={buttonStyle}>
            {saving ? "Guardando..." : "Guardar cambios"}
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

const imageStyle = {
  width: "100%",
  maxHeight: "320px",
  objectFit: "cover",
  borderRadius: "10px",
};

const placeholderStyle = {
  width: "100%",
  height: "220px",
  borderRadius: "10px",
  backgroundColor: "#8b5e3c",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
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