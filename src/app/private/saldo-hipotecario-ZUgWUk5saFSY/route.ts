// Ruta privada y aislada. Route Handler (no page.tsx) a propósito: así no
// pasa por src/app/layout.tsx ni hereda nav/fuentes/scripts del resto del
// sitio. El acceso lo protege src/middleware.ts (Basic Auth contra
// PRIVATE_ROUTE_SECRET), scoped únicamente a este path exacto.

const HTML = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Saldo Hipotecario</title>
<style>
  :root {
    --bg-page: #eef0ec;
    --bg-screen: #f7f8f5;
    --surface: #ffffff;
    --ink: #12181b;
    --muted: #667085;
    --accent: #0b6e4f;
    --accent-soft: #e4f1ea;
    --border: #e2e5e1;
    --shadow: rgba(18, 24, 27, 0.08);
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --bg-page: #0b0d0c;
      --bg-screen: #121615;
      --surface: #1b211f;
      --ink: #edefec;
      --muted: #9aa79e;
      --accent: #35c08a;
      --accent-soft: rgba(53, 192, 138, 0.14);
      --border: #2a322e;
      --shadow: rgba(0, 0, 0, 0.45);
    }
  }

  :root[data-theme="dark"] {
    --bg-page: #0b0d0c;
    --bg-screen: #121615;
    --surface: #1b211f;
    --ink: #edefec;
    --muted: #9aa79e;
    --accent: #35c08a;
    --accent-soft: rgba(53, 192, 138, 0.14);
    --border: #2a322e;
    --shadow: rgba(0, 0, 0, 0.45);
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    min-height: 100vh;
    background: var(--bg-page);
    color: var(--ink);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 40px 16px;
    font-family: "Manrope", ui-sans-serif, system-ui, sans-serif;
  }

  .rule {
    text-align: center;
    color: var(--muted);
    font-size: 12px;
    letter-spacing: 0.04em;
    margin: 0 0 20px;
  }

  .stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .device {
    width: 375px;
    max-width: 100%;
    background: #ffffff;
    border: 1px solid var(--border);
    border-radius: 28px;
    padding: 22px 16px 28px;
    box-shadow: 0 20px 40px -24px var(--shadow);
  }

  .statusbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
    font-size: 13px;
    font-variant-numeric: tabular-nums;
    color: var(--muted);
    padding: 0 4px 18px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .field-label {
    font-family: "Manrope", ui-sans-serif, system-ui, sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 0 2px;
  }

  .balance-card {
    background: #ffffff;
    border: 1px solid #a9a9a9;
    border-radius: 4px;
    padding: 20px 18px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
  }

  .balance-amount {
    font-family: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
    font-weight: 700;
    font-size: 26px;
    font-variant-numeric: tabular-nums;
    color: #a9a9a9;
    letter-spacing: -0.01em;
    text-wrap: balance;
  }

  .balance-amount .mark {
    font-weight: 600;
    color: var(--accent);
    margin-right: 2px;
  }

  .currency-tag {
    flex: none;
    font-family: "Manrope", ui-sans-serif, system-ui, sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: var(--accent);
    background: var(--accent-soft);
    padding: 4px 8px;
    border-radius: 4px;
  }

  .footnote {
    margin: 10px 2px 0;
    font-family: "Manrope", ui-sans-serif, system-ui, sans-serif;
    font-size: 11px;
    color: var(--muted);
    line-height: 1.4;
  }

  .spec {
    margin-top: 22px;
    font-family: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
    font-size: 11px;
    color: var(--muted);
    text-align: center;
  }

  .amort-section {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .amort-card {
    background: #ffffff;
    border: 1px solid #a9a9a9;
    border-radius: 4px;
    padding: 4px 12px;
    overflow-x: auto;
  }

  .amort-table {
    width: 100%;
    border-collapse: collapse;
    font-family: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
  }

  .amort-table th {
    text-align: right;
    font-family: "Manrope", ui-sans-serif, system-ui, sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 10px 0 8px;
    border-bottom: 1px solid var(--border);
  }

  .amort-table th:first-child,
  .amort-table td:first-child {
    text-align: left;
  }

  .amort-table td {
    padding: 9px 0;
    font-size: 12.5px;
    font-variant-numeric: tabular-nums;
    color: #a9a9a9;
    text-align: right;
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
  }

  .amort-table tbody tr:last-child td {
    border-bottom: none;
  }

  .amort-table tr.final td {
    color: var(--accent);
    font-weight: 700;
  }

  .amort-table td.col-fecha {
    color: var(--muted);
    font-weight: 500;
  }
</style>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=IBM+Plex+Sans:wght@500;600;700&display=swap">
</head>
<body>

<div class="stage">
  <div class="device">

    <div class="field">
      <span class="field-label">Crédito Hipotecario</span>
      <div class="balance-card">
        <span class="balance-amount">$ 328,745.45</span>
      </div>
    </div>

    <div class="amort-section">
      <span class="field-label">Tabla de Amortización</span>
      <div class="amort-card">
        <table class="amort-table">
          <thead>
            <tr><th>Fecha</th><th>Pago</th><th>Saldo</th></tr>
          </thead>
          <tbody>
            <tr><td class="col-fecha">17 sep 2026</td><td>26,578.45</td><td>302,167.00</td></tr>
            <tr><td class="col-fecha">17 oct 2026</td><td>26,578.45</td><td>275,588.55</td></tr>
            <tr><td class="col-fecha">17 nov 2026</td><td>26,578.45</td><td>249,010.10</td></tr>
            <tr><td class="col-fecha">17 dic 2026</td><td>26,578.45</td><td>222,431.65</td></tr>
            <tr><td class="col-fecha">17 ene 2027</td><td>26,578.45</td><td>195,853.20</td></tr>
            <tr><td class="col-fecha">17 feb 2027</td><td>26,578.45</td><td>169,274.75</td></tr>
            <tr><td class="col-fecha">17 mar 2027</td><td>26,578.45</td><td>142,696.30</td></tr>
            <tr><td class="col-fecha">17 abr 2027</td><td>26,578.45</td><td>116,117.85</td></tr>
            <tr><td class="col-fecha">17 may 2027</td><td>26,578.45</td><td>89,539.40</td></tr>
            <tr><td class="col-fecha">17 jun 2027</td><td>26,578.45</td><td>62,960.95</td></tr>
            <tr><td class="col-fecha">17 jul 2027</td><td>26,578.45</td><td>36,382.50</td></tr>
            <tr><td class="col-fecha">17 ago 2027</td><td>26,578.45</td><td>9,804.05</td></tr>
            <tr class="final"><td class="col-fecha">17 sep 2027</td><td>9,804.05</td><td>0.00</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

</body>
</html>`

export async function GET() {
  return new Response(HTML, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      // No index, no cache compartido — es privada.
      "x-robots-tag": "noindex, nofollow",
      "cache-control": "private, no-store",
    },
  })
}
