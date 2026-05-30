import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

const DEFAULT_TITLE = "Blog Legal — Guías sobre tus derechos"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") || DEFAULT_TITLE

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(160deg, #0C0D10 0%, #1A1C26 100%)",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px)",
          }}
        />

        {/* Gold accent line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #C49A3C 0%, #E2B865 50%, #C49A3C 100%)",
          }}
        />

        {/* Header — Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 300,
              color: "#C49A3C",
              letterSpacing: "-0.5px",
            }}
          >
            Lexia
          </div>
          <div
            style={{
              width: "1px",
              height: "24px",
              background: "rgba(196,154,60,0.4)",
            }}
          />
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "rgba(196,154,60,0.7)",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Guías Legales
          </div>
        </div>

        {/* Center — Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
            justifyContent: "center",
            paddingTop: "16px",
            paddingBottom: "16px",
          }}
        >
          {/* Decorative element */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "32px",
                height: "1px",
                background: "rgba(196,154,60,0.5)",
              }}
            />
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(196,154,60,0.6)",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Artículo
            </div>
          </div>

          <div
            style={{
              fontSize: title.length > 60 ? "44px" : "54px",
              fontWeight: 300,
              color: "#FAF7F2",
              lineHeight: 1.15,
              letterSpacing: "-0.5px",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#C49A3C",
              letterSpacing: "0.5px",
            }}
          >
            lexiamx.com • Guías Legales
          </div>

          {/* Shield icon */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              border: "1px solid rgba(196,154,60,0.3)",
              background: "rgba(196,154,60,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            ⚖️
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
