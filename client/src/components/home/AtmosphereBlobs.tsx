export function AtmosphereBlobs() {
  return (
    <>
      <div
        className="je-blob"
        style={{
          background: "var(--je-blue)",
          width: 420,
          height: 420,
          top: -80,
          left: -120,
          opacity: 0.55,
        }}
      />
      <div
        className="je-blob"
        style={{
          background: "var(--je-blue)",
          width: 360,
          height: 360,
          top: 80,
          right: -90,
          opacity: 0.4,
        }}
      />
      <div
        className="je-blob"
        style={{
          background: "var(--je-blue-navy)",
          width: 220,
          height: 220,
          bottom: -40,
          left: "42%",
          opacity: 0.22,
        }}
      />
    </>
  );
}
