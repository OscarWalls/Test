// app/test/page.js
import { sql } from "@vercel/postgres";

export default async function TestConnection() {
  let info = null;
  let error = null;

  try {
    // 1. Intentamos una consulta súper simple al sistema de Postgres
    const result = await sql`SELECT NOW(), current_database(), current_user;`;

    // 2. Extraemos los datos de la primera fila
    info = result.rows[0];
  } catch (err) {
    // 3. Si algo falla, guardamos el error
    error = err;
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", color: "red" }}>
        <h1>❌ Error de Conexión</h1>
        <pre style={{ background: "#fff0f0", padding: "1rem" }}>
          {error.message}
        </pre>
        <p>Revisa que:</p>
        <ul>
          <li>Hayas reiniciado el servidor (npm run dev).</li>
          <li>
            Tu variable en .env.local se llame <b>POSTGRES_URL</b>.
          </li>
          <li>Tengas internet (Neon es una DB en la nube).</li>
        </ul>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#0070f3" }}>¡Conexión Exitosa! 🚀</h1>
      <div
        style={{ background: "#000000", padding: "1rem", borderRadius: "8px" }}
      >
        <p>
          <strong>Hora del servidor:</strong> {info.now.toString()}
        </p>
        <p>
          <strong>Base de Datos:</strong> {info.current_database}
        </p>
        <p>
          <strong>Usuario:</strong> {info.current_user}
        </p>
      </div>
      <p style={{ marginTop: "1rem", color: "#666" }}>
        Si ves estos datos, tu archivo <b>.env.local</b> está bien configurado y
        Next.js se está comunicando con Neon correctamente.
      </p>
    </div>
  );
}
