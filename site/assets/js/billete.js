const $ = (s) => document.querySelector(s);

async function init(){
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const r = await fetch("data/billetes.json", { cache: "no-store" });
  const all = await r.json();
  const b = all.find(x => x.id === id);

  if (!b) {
    document.body.innerHTML = `<div class="container"><h1>No encontrado</h1><a class="back" href="index.html">← Volver</a></div>`;
    return;
  }

  $("#title").textContent = `${b.pais} • ${b.denominacion} ${b.moneda}`;
  $("#subtitle").textContent = `${b.anio} • ${b.serie || "—"}`;

  $("#front").src = b.frontImg;
  $("#back").src = b.backImg;

  $("#pais").textContent = b.pais || "—";
  $("#denom").textContent = `${b.denominacion ?? "—"}`;
  $("#moneda").textContent = b.moneda || "—";
  $("#anio").textContent = b.anio ?? "—";
  $("#serie").textContent = b.serie || "—";
  $("#estado").textContent = b.estado || "—";
  $("#cert").textContent = b.certificacion || "—";
  $("#notas").textContent = b.notas || "—";
}

init();