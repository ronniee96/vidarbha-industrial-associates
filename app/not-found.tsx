import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#07111f", color: "#f5f8fb", fontFamily: "system-ui, sans-serif", textAlign: "center" }}>
      <div>
        <p style={{ color: "#25a8ff", fontWeight: 800, letterSpacing: ".18em" }}>404 / PAGE NOT FOUND</p>
        <h1 style={{ fontSize: "clamp(52px, 10vw, 100px)", margin: "10px 0", lineHeight: 1 }}>Wrong turn.</h1>
        <p style={{ color: "#9aaabd" }}>The page you requested does not exist.</p>
        <Link href="/" style={{ display: "inline-flex", marginTop: 20, padding: "13px 20px", background: "#0076ff", color: "white", fontWeight: 800 }}>Back to VIA website</Link>
      </div>
    </main>
  );
}
