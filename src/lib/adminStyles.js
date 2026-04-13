export const pageStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 20px",
  color: "#e6d3b3",
};

export const pageNarrowStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "40px 20px",
  color: "#e6d3b3",
};

export const titleStyle = {
  fontSize: "2.4rem",
  margin: 0,
};

export const centeredTitleStyle = {
  textAlign: "center",
  marginBottom: "24px",
  fontSize: "2.2rem",
};

export const subtitleStyle = {
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "1.1rem",
};

export const topBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
  gap: "20px",
  flexWrap: "wrap",
};

export const cardStyle = {
  backgroundColor: "#6f4328",
  borderRadius: "16px",
  padding: "22px",
  boxShadow: "0 4px 14px rgba(0,0,0,0.28)",
};

export const formCardStyle = {
  backgroundColor: "#6f4328",
  padding: "28px",
  borderRadius: "16px",
  boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
};

export const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
};

export const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

export const primaryButtonStyle = {
  padding: "12px 18px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#9a6b45",
  color: "#fff",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "600",
  transition: "0.2s ease",
};

export const secondaryButtonStyle = {
  padding: "10px 14px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#8b5e3c",
  color: "#fff",
  cursor: "pointer",
  fontSize: "0.95rem",
  fontWeight: "600",
};

export const dangerButtonStyle = {
  padding: "10px 14px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#5a1a14",
  color: "#fff",
  cursor: "pointer",
  fontSize: "0.95rem",
  fontWeight: "600",
};

export const logoutButtonStyle = {
  padding: "12px 18px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#5a1a14",
  color: "#fff",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "600",
};

export const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  fontSize: "1rem",
  outline: "none",
};

export const textareaStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  fontSize: "1rem",
  minHeight: "160px",
  resize: "vertical",
  outline: "none",
};

export const messageBaseStyle = {
  marginBottom: "20px",
  fontWeight: "bold",
  padding: "12px 14px",
  borderRadius: "10px",
};

export const successMessageStyle = {
  backgroundColor: "#355b3d",
  color: "#d9ffe0",
};

export const errorMessageStyle = {
  backgroundColor: "#6a2d2d",
  color: "#ffd6d6",
};

export const imageStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "14px",
};

export const largeImageStyle = {
  width: "100%",
  maxHeight: "320px",
  objectFit: "cover",
  borderRadius: "10px",
};

export const placeholderStyle = {
  width: "100%",
  height: "220px",
  borderRadius: "10px",
  marginBottom: "14px",
  backgroundColor: "#8b5e3c",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  textAlign: "center",
  padding: "10px",
};

export const buttonsRowStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};
export const hoverLiftProps = {
  onMouseEnter: (e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
  },
  onMouseLeave: (e) => {
    e.currentTarget.style.transform = "translateY(0)";
  },
};

export const hoverButtonProps = {
  onMouseEnter: (e) => {
    e.currentTarget.style.opacity = "0.9";
    e.currentTarget.style.transform = "scale(1.03)";
  },
  onMouseLeave: (e) => {
    e.currentTarget.style.opacity = "1";
    e.currentTarget.style.transform = "scale(1)";
  },
};