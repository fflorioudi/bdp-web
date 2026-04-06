"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import {
  pageStyle,
  subtitleStyle,
  linkStyle,
  cardStyle,
  logoutButtonStyle,
} from "../../lib/adminStyles";

export default function AdminClient() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error al cerrar sesión:", error);
      return;
    }

    router.push("/login");
    router.refresh();
  }

  return (
    <main style={pageStyle}>
      <h1 style={dashboardTitleStyle}>Panel de administración</h1>
      <p style={subtitleStyle}>Gestioná el contenido del sitio BDP.</p>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button onClick={handleLogout} style={logoutButtonStyle}>
          Cerrar sesión
        </button>
      </div>

      <section style={dashboardGridStyle}>
        <Link href="/admin/miembros" style={linkStyle}>
          <article style={cardStyle}>
            <h2 style={cardTitleStyle}>Miembros</h2>
            <p>Ver, editar y eliminar miembros.</p>
          </article>
        </Link>

        <Link href="/admin/eventos" style={linkStyle}>
          <article style={cardStyle}>
            <h2 style={cardTitleStyle}>Eventos</h2>
            <p>Crear y administrar eventos del grupo.</p>
          </article>
        </Link>

        <Link href="/admin/historia" style={linkStyle}>
          <article style={cardStyle}>
            <h2 style={cardTitleStyle}>Historia</h2>
            <p>Editar la historia institucional.</p>
          </article>
        </Link>

        <Link href="/admin/testimonios" style={linkStyle}>
          <article style={cardStyle}>
            <h2 style={cardTitleStyle}>Testimonios</h2>
            <p>Crear y administrar testimonios.</p>
          </article>
        </Link>

        <Link href="/admin/galeria" style={linkStyle}>
          <article style={cardStyle}>
            <h2 style={cardTitleStyle}>Galería</h2>
            <p>Subir y administrar imágenes.</p>
          </article>
        </Link>
      </section>
    </main>
  );
}

const dashboardTitleStyle = {
  fontSize: "2.7rem",
  marginBottom: "10px",
  textAlign: "center",
};

const dashboardGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
};

const cardTitleStyle = {
  fontSize: "1.5rem",
  marginBottom: "10px",
};