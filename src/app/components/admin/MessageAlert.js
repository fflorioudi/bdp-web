"use client";

import {
  messageBaseStyle,
  successMessageStyle,
  errorMessageStyle,
} from "../../../lib/adminStyles";

export default function MessageAlert({
  message,
  type = "success",
  marginTop = 0,
}) {
  if (!message) return null;

  return (
    <p
      style={{
        ...messageBaseStyle,
        ...(type === "success"
          ? successMessageStyle
          : errorMessageStyle),
        marginTop,
      }}
    >
      {message}
    </p>
  );
}