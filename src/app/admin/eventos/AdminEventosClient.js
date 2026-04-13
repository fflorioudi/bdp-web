"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  containerStyle,
  buttonStyle,
  inputStyle,
  dangerButtonStyle,
  hoverButtonProps,
} from "@/lib/adminStyles";
import MessageAlert from "../../components/admin/MessageAlert";

export default function AdminEventosClient() {
  const supabase = createClient();

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [lugar, setLugar] = useState("");

  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  // 🔄 Obtener eventos
  const fetchEventos = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("fecha", { ascending: true });

    if (error) {
      setType("error");
      setMessage("Error al cargar eventos");
    } else {
      setEventos(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  // ➕ Crear evento
  const handleCreate = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("events").insert([
      {
        titulo,
        fecha,
        hora,
        lugar,
      },
    ]);

    if (error) {
      setType("error");
      setMessage("Error al crear evento");
    } else {
      setType("success");
      setMessage("Evento creado correctamente");
      setTitulo("");
      setFecha("");
      setHora("");
      setLugar("");
      fetchEventos();
    }
  };

  // 🗑️ Eliminar evento
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

    if (error) {
      setType("error");
      setMessage("Error al eliminar evento");
    } else {
      setType("success");
      setMessage("Evento eliminado");
      fetchEventos();
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Admin Eventos
      </h1>

      <MessageAlert type={type} message={message} />

      {/* FORM */}
      <form onSubmit={handleCreate}>
        <input
          style={inputStyle}
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <input
          style={inputStyle}
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <input
          style={inputStyle}
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Lugar"
          value={lugar}
          onChange={(e) => setLugar(e.target.value)}
        />

        <button type="submit" style={buttonStyle} {...hoverButtonProps}>
          Crear evento
        </button>
      </form>

      {/* LISTA */}
      {loading ? (
        <p>Cargando...</p>
      ) : eventos.length === 0 ? (
        <p>No hay eventos</p>
      ) : (
        eventos.map((evento) => (
          <div
            key={evento.id}
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            <h3>{evento.titulo}</h3>
            <p>{evento.fecha}</p>
            <p>{evento.hora}</p>
            <p>{evento.lugar}</p>

            <button
              onClick={() => handleDelete(evento.id)}
              style={dangerButtonStyle}
              {...hoverButtonProps}
            >
              Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
}