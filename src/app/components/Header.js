"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function Header() {
  const supabase = createClient();

  const [user, setUser] = useState(null);

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

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <Link href="/" style={logoLinkStyle}>
          BDP
        </Link>
      </div>

      <nav style={navStyle}>
        <Link href="/" style={linkStyle}>
          Inicio
        </Link>
        <Link href="/historia" style={linkStyle}>
          Historia
        </Link>
        <Link href="/eventos" style={linkStyle}>
          Eventos
        </Link>
        <Link href="/miembros" style={linkStyle}>
          Miembros
        </Link>
        <Link href="/galeria" style={linkStyle}>
          Galería
        </Link>
        <Link href="/testimonios" style={linkStyle}>
          Testimonios
        </Link>

        {user && (
          <Link href="/admin" style={linkStyle}>
            Admin
          </Link>
        )}
      </nav>
    </header>
  );
}

const headerStyle = {
  width: "100%",
  backgroundColor: "#7a1c10",
  borderBottom: "1px solid #b98b5c",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 40px",
  boxSizing: "border-box",
  flexWrap: "wrap",
  gap: "20px",
};

const logoStyle = {
  display: "flex",
  alignItems: "center",
};

const logoLinkStyle = {
  color: "#f1d3a2",
  textDecoration: "none",
  fontSize: "2rem",
  fontWeight: "bold",
};

const navStyle = {
  display: "flex",
  gap: "28px",
  flexWrap: "wrap",
  alignItems: "center",
};

const linkStyle = {
  color: "#f1d3a2",
  textDecoration: "none",
  fontSize: "1.1rem",
  fontWeight: "500",
};