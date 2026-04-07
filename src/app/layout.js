import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "BDP",
  description: "Sitio institucional de Beato Deogracias Palacios",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <div style={pageWrapperStyle}>
          <div style={contentStyle}>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

const pageWrapperStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

const contentStyle = {
  flex: 1,
};