import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          backgroundColor: "#0f2527", // deep teal-ish
          color: "white",
          fontSize: 42,
          fontWeight: 600,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* inline svg logo */}
          <svg width="72" height="72" viewBox="0 0 96 96" fill="none">
            <circle cx="48" cy="48" r="38" stroke="#228b94" strokeWidth="6" />
            <path
              d="M60 36 44 44 36 60 52 52 60 36z"
              stroke="#228b94"
              strokeWidth="6"
              fill="none"
            />
            <circle cx="48" cy="48" r="20" stroke="#228b94" strokeWidth="6" />
          </svg>
          <div>REE Portal</div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 400, opacity: 0.9 }}>
          Rare-earth prices, policy overlays, and a path to buy.
        </div>
      </div>
    ),
    { ...size },
  );
}
