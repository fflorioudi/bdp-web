import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "BDP",
  description: "Sitio institucional BDP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}