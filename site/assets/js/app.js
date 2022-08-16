const $ = (s) => document.querySelector(s);

let all = [];

function uniq(arr){ return [...new Set(arr)].sort((a,b)=>a.localeCompare(b)); }

function normalize(str){
  return (str ?? "").toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"");
}

function buildCard(b){
  const el = document.createElement("article");
  el.className = "card";
  el.innerHTML = `
    <img class="thumb" src="${b.frontImg}" alt="${b.pais} ${b.denominacion}" loading="lazy">
    <div class="card-body">
      <div class="title">${b.pais} • ${b.denominacion} ${b.moneda}</div>
      <div class="small">${b.anio} • ${b.serie || "—"}</div>
      <div class="badges">
        <span class="badge">${b.estado || "—"}</span>
        ${b.certificacion ? `<span class="badge">${b.certificacion}</span>` : ``}
      </div>
    </div>
  `;
  el.addEventListener("click", () => {
    window.location.href = `billetes.html?id=${encodeURIComponent(b.id)}`;
  });
  return el;
}

function apply(){
  const q = normalize($("#q").value);
  const pais = $("#pais").value;
  const estado = $("#estado").value;
  const sort = $("#sort").value;

  let res = all.filter(b => {
    if (pais && b.pais !== pais) return false;
    if (estado && (b.estado || "") !== estado) return false;

    if (!q) return true;
    const hay = normalize([
      b.pais, b.moneda, b.serie, b.estado, b.certificacion, b.notas,
      b.denominacion, b.anio
    ].join(" "));
    return hay.includes(q);
  });

  // Sort
  res.sort((a,b) => {
    if (sort === "anioAsc") return (a.anio??0) - (b.anio??0);
    if (sort === "anioDesc") return (b.anio??0) - (a.anio??0);
    if (sort === "paisAsc") return (a.pais||"").localeCompare(b.pais||"");
    // "nuevo": asumo que lo último en JSON es lo último agregado
    return 0;
  });

  const grid = $("#grid");
  grid.innerHTML = "";
  res.forEach(b => grid.appendChild(buildCard(b)));

  $("#empty").classList.toggle("hidden", res.length !== 0);

  $("#stats").innerHTML = `
    <div class="stat">Total: <b>${all.length}</b></div>
    <div class="stat">Mostrando: <b>${res.length}</b></div>
  `;
}

async function init(){
  $("#year").textContent = new Date().getFullYear();
  const r = await fetch("data/billetes.json", { cache: "no-store" });
  all = await r.json();

  // Países para select
  const paises = uniq(all.map(b => b.pais).filter(Boolean));
  const sel = $("#pais");
  paises.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    sel.appendChild(opt);
  });

  ["q","pais","estado","sort"].forEach(id => $("#"+id).addEventListener("input", apply));
  ["pais","estado","sort"].forEach(id => $("#"+id).addEventListener("change", apply));

  apply();
}

init();
