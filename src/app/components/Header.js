"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function Header() {
  const supabase = createClient();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  function handleCloseMenu() {
    setMenuOpen(false);
  }

  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        <div style={topRowStyle}>
          <Link href="/" style={logoLinkStyle} onClick={handleCloseMenu}>
            BDP
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            style={menuButtonStyle}
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>

        <nav
          style={{
            ...navStyle,
            ...(menuOpen ? navOpenStyle : {}),
          }}
        >
          <Link href="/" style={linkStyle} onClick={handleCloseMenu}>
            Inicio
          </Link>
          <Link href="/historia" style={linkStyle} onClick={handleCloseMenu}>
            Historia
          </Link>
          <Link href="/eventos" style={linkStyle} onClick={handleCloseMenu}>
            Eventos
          </Link>
          <Link href="/miembros" style={linkStyle} onClick={handleCloseMenu}>
            Miembros
          </Link>
          <Link href="/galeria" style={linkStyle} onClick={handleCloseMenu}>
            Galería
          </Link>
          <Link href="/playlist" style={linkStyle} onClick={handleCloseMenu}>
            Playlist
          </Link>
          <Link href="/testimonios" style={linkStyle} onClick={handleCloseMenu}>
            Testimonios
          </Link>

          {user && (
            <Link href="/admin" style={adminLinkStyle} onClick={handleCloseMenu}>
              Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

const headerStyle = {
  width: "100%",
  background: "linear-gradient(180deg, #7a1c10 0%, #6e160c 100%)",
  borderBottom: "1px solid rgba(241, 211, 162, 0.28)",
  position: "sticky",
  top: 0,
  zIndex: 50,
  boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
};

const innerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "14px 20px",
};

const topRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
};

const logoLinkStyle = {
  color: "#f1d3a2",
  textDecoration: "none",
  fontSize: "2rem",
  fontWeight: "800",
  letterSpacing: "0.5px",
};

const menuButtonStyle = {
  backgroundColor: "transparent",
  border: "1px solid rgba(241, 211, 162, 0.4)",
  color: "#f1d3a2",
  borderRadius: "10px",
  padding: "6px 10px",
  fontSize: "1.2rem",
  cursor: "pointer",
};

const navStyle = {
  display: "none",
  flexDirection: "column",
  gap: "14px",
  marginTop: "16px",
};

const navOpenStyle = {
  display: "flex",
};

const linkStyle = {
  color: "#f1d3a2",
  textDecoration: "none",
  fontSize: "1.05rem",
  fontWeight: "500",
  transition: "opacity 0.2s ease, transform 0.2s ease",
};

const adminLinkStyle = {
  ...linkStyle,
  fontWeight: "700",
};