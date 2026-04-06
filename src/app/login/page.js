"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    console.log("Intentando login con:", email);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("RESULT LOGIN:", { data, error });

    if (error) {
      console.error("LOGIN ERROR:", error);
      setMensaje(error.message || "Error al iniciar sesión.");
      setLoading(false);
      return;
    }

    console.log("Login exitoso, redirigiendo a /admin");

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main style={mainStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Login Admin</h1>

        <form onSubmit={handleLogin} style={formStyle}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {mensaje && <p style={messageStyle}>{mensaje}</p>}
      </div>
    </main>
  );
}

const mainStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  color: "#e6d3b3",
};

const cardStyle = {
  width: "100%",
  maxWidth: "450px",
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