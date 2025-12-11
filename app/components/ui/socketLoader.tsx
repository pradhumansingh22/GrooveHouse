export default function SocketLoader() {

    const message =
      "Heads up: the server's waking up from its beauty sleep — might take ~50 seconds.";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#ffffff",
        flexDirection: "column",
        gap: "32px",
        fontFamily: "inherit",
      }}
    >
      {/* Minimal spinner */}
      <div
        style={{
          position: "relative",
          width: "48px",
          height: "48px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            border: "3px solid #2E3F3C",
            borderTop: "3px solid transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>

      {/* Main text */}
      <div
        style={{
          textAlign: "center",
          color: "#2E3F3C",
        }}
      >
        <h2
          style={{
            margin: "0 0 8px 0",
            fontSize: "18px",
            fontWeight: "500",
            letterSpacing: "0.3px",
          }}
        >
          Connecting to WebSocket Server
        </h2>
        <p
          style={{
            margin: "0",
            fontSize: "14px",
            fontWeight: "400",
            opacity: "0.7",
            letterSpacing: "0.2px",
          }}
        >
         {message}
        </p>
      </div>

      {/* Global styles for animation */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
