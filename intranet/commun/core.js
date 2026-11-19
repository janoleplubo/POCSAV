
/* =========================================================================
   LOGO (extrait du modèle Paris Ouest fourni)
   ========================================================================= */
let CONFIG = defaultConfig();
let unlocked = false;
let gateInput = "";
let gateError = "";
let currentStep = "select"; // clé parmi activeStepKeys()
let settingsOpen = false;
let menuOpen = false;

function applyMobileScale(){
  try{
    const coarse = window.matchMedia("(hover:none) and (pointer:coarse)").matches;
    const sw = Math.min(screen.width, screen.height), iw = window.innerWidth;
    let f = (iw<=640) ? 17 : 16;
    if(coarse && sw<=700 && iw>sw*1.15) f = 16*iw/sw;
    document.documentElement.style.fontSize = f+"px";
  }catch(e){}
}
applyMobileScale();
window.addEventListener("resize", applyMobileScale);
function toggleMenu(){ menuOpen = !menuOpen; render(); }
let settingsTab = "metiers";
let genMessage = null;

function uid(prefix){ return prefix+"_"+Math.random().toString(36).slice(2,9); }

function defaultStartDate(){
  const d = new Date(); d.setHours(12,0,0,0);
  const wd = d.getDay(); // 0 dim, 5 ven, 6 sam
  d.setDate(d.getDate() + (wd===5 ? 3 : wd===6 ? 2 : 1)); // lendemain, sinon lundi suivant
  const p = n=>String(n).padStart(2,"0");
  return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate());
}
let dossier = makeDossier();

/* =========================================================================
   NAVIGATION DYNAMIQUE : les étapes "sous-traitants" et "aperçu" ne
   s'affichent que si au moins un document qui en a besoin est sélectionné.
   Le "Matériel OPC" est un parcours totalement à part (incompatible avec
   les 3 autres documents) : quand il est coché, on saute directement à
   son propre écran, sans passer par chantier/sous-traitants/aperçu/pdf.
   ========================================================================= */
function goNext(){
  const keys = activeStepKeys();
  const i = keys.indexOf(currentStep);
  if(i>=0 && i<keys.length-1) goStep(keys[i+1]);
}
function goPrev(){
  const keys = activeStepKeys();
  const i = keys.indexOf(currentStep);
  if(i>0) goStep(keys[i-1]);
}

/* Remarque : pas de stockage persistant (window.storage) dans cette version.
   Les réglages modifiés dans l'écran "Réglages" s'appliquent immédiatement
   pour la session en cours, mais ne sont pas partagés avec les autres
   utilisateurs ni conservés après fermeture de l'onglet. Pour rendre un
   changement permanent pour toute l'équipe, il faut le faire mettre à jour
   dans le fichier source. */

/* =========================================================================
   OUTILS DE MAPPING NOM <-> ID (pour l'écran réglages)
   ========================================================================= */
function idsToNames(ids, collection){
  return (ids||[]).map(id=>{ const it = collection.find(c=>c.id===id); return it?it.nom:null; }).filter(Boolean).join(", ");
}
function namesToIds(text, collection){
  if(!text) return [];
  return text.split(",").map(s=>s.trim()).filter(Boolean).map(name=>{
    const it = collection.find(c=>c.nom.toLowerCase()===name.toLowerCase());
    return it?it.id:null;
  }).filter(Boolean);
}

/* =========================================================================
   LOGIQUE MÉTIER : calcul des propositions (fiche + 1/4h sécurité)
   ========================================================================= */
function uniqJoinList(strings){
  const parts = [];
  strings.forEach(s=>{ (s||"").split(",").forEach(p=>{ const t=p.trim(); if(t && !parts.includes(t)) parts.push(t); }); });
  return parts.join(", ");
}
/* ---- 1/4h sécurité : rotation hebdomadaire de 5 groupes (2 risques par groupe) ---- */
const DOTS = "...................................";
const QH_GROUPS = [
  { nom:"Chute de hauteur et chute d'objets", lines:[
    "## Risque de chute de hauteur",
    "- Escabeau **interdit**. Utiliser d'abord une gazelle ou un échafaudage roulant.",
    "- Échafaudage roulant : bloquer les freins. Vérifier le montage avec la notice. Montage par une personne formée uniquement. PV de réception affiché.",
    "- Trémie de moins de 1 m² : la fermer avec un contreplaqué. Trémie plus grande : poser des garde-corps.",
    "## Risque de chute d'objets et de heurts",
    "- Casque obligatoire.",
    "- Ne jamais passer sous une zone de travail en hauteur. Elle est balisée.",
    "- Obstacle bas ou qui dépasse : le signaler avec du ruban et le bouchonner."
  ]},
  { nom:"Risque électrique et chute de plain-pied", lines:[
    "## Risque électrique",
    "- Ne jamais intervenir sous tension. Couper. Cadenasser. Vérifier l'absence de tension. Personnel habilité uniquement.",
    "- Rallonges et outils en bon état. Interdit : rallonge rafistolée ou raccordée avec un domino, un Wago ou du scotch.",
    "- Dérouler la rallonge en entier : une rallonge enroulée chauffe.",
    "## Risque de chute de plain-pied",
    "- Câbles et rallonges au sol : les passer en hauteur ou les protéger. Les ranger en fin de journée.",
    "- Évacuer gravats et emballages au fur et à mesure. Passages dégagés.",
  ]},
  { nom:"Outils et machines, poussières", lines:[
    "## Risque lié aux outils et machines",
    "- Capot de la disqueuse toujours en place. Vérifier le disque avant usage.",
    "- Débrancher l'outil avant de changer le disque.",
    "## Risque poussières",
    "- Découpe ou percement : aspirer à la source ou humidifier. Ne pas balayer à sec.",
    "- Masque FFP2 minimum pour poncer, découper ou carotter.",
    "- Fenêtre ouverte pendant tout le travail."
  ]},
  { nom:"Incendie, secours et alerte", lines:[
    "## Risque d'incendie et de travaux par point chaud",
    "- Brasage, soudure, meulage : éloigner ou protéger ce qui peut brûler. Extincteur à portée de main.",
    "- Surveiller la zone 1 heure après la fin. Revérifier 3 heures plus tard.",
    "- Ranger les solvants et les bombes à l'écart.",
    "## Secours et alerte",
    "- Urgences : 15 (SAMU), 18 (pompiers), 112.",
    "- Adresse du chantier : @ADRESSE@",
    "- Trousse de secours : "+DOTS,
    "- Extincteurs : "+DOTS,
    "- Accident : protéger, alerter, secourir. Ne pas déplacer le blessé, sauf danger immédiat."
  ]},
  { nom:"Manutention et bruit", lines:[
    "## Risque de manutention manuelle",
    "- Charge lourde ou encombrante : porter à deux ou utiliser un chariot.",
    "- Dos droit, genoux fléchis, charge près du corps. Ne pas tourner le buste.",,
    "## Risque bruit",
    "- Bouchons ou casque anti-bruit dès qu'on doit hausser la voix pour se faire entendre.",
    "- Une audition perdue ne revient pas."
  ]}
];
const QH_SPECIAUX = {
  amiante:{ label:"Amiante", lines:[
    "## Risque amiante",
    "- Ne jamais percer, poncer ou casser un matériau sans avoir vérifié le repérage amiante scotché sur la porte.",
    "- Doute sur un matériau : arrêter le travail et prévenir le conducteur de travaux."
  ]},
  plomb:{ label:"Plomb", lines:[
    "## Risque plomb",
    "- Ne jamais percer, poncer ou casser un matériau sans avoir vérifié le repérage plomb scotché sur la porte.",
    "- Se laver les mains avant de manger, boire ou fumer."
  ]},
  coactivite:{ label:"Coactivité", lines:[
    "## Risque de coactivité",
    "- Avant de couper l'eau ou l'électricité, prévenir les autres corps d'état.",
    "- Ne rien laisser dans les passages communs : matériel, câbles, gravats."
  ]},
  chaleur:{ label:"Fortes chaleurs", lines:[
    "## Risque fortes chaleurs",
    "- Boire de l'eau régulièrement, même sans soif.",
    "- Malaise, crampes ou nausées : s'arrêter, aller à l'ombre, prévenir. Malaise grave : appeler le 15."
  ]},
  elecNonConsigne:{ label:"Électricité non consignée", lines:[
    "## Risque électricité non coupée",
    "- Le courant n'est pas coupé : ne pas percer, casser ou couper un mur sans savoir où passent les fils.",
    "- Ne jamais toucher un fil inconnu.",
    "- Électricien habilité uniquement. Outils isolés."
  ]},
  gazAlimente:{ label:"Réseau gaz alimenté", lines:[
    "## Risque gaz : le gaz est en service",
    "- Pas de flamme, de soudure, d'étincelle ou de disqueuse près des tuyaux de gaz.",
    "- Ne pas percer ni casser un mur sans savoir où passent les tuyaux.",
    "- Odeur de gaz : aucun interrupteur. Ouvrir les fenêtres. Sortir. Appeler le 18, puis GRDF : 0 800 47 33 33."
  ]},
  siteOccupe:{ label:"Site occupé", lines:[
    "## Site occupé : des habitants sont présents",
    "- Laisser les passages libres. Fermer les portes derrière soi.",
    "- Ne jamais laisser un outil ou un produit sans surveillance.",
    "- Respecter les horaires de bruit. Problème avec un habitant : prévenir le conducteur de travaux."
  ]}
};
function qhDate(){
  const d = computeChantierDate();
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d||"");
  if(m) return new Date(Date.UTC(+m[1],+m[2]-1,+m[3]));
  const n = new Date();
  return new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate()));
}
function isoWeek(dt){
  const d = new Date(Date.UTC(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate()));
  const day = d.getUTCDay()||7;
  d.setUTCDate(d.getUTCDate()+4-day);
  const y0 = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil(((d-y0)/86400000+1)/7);
}
function adresseVisible(){ return !!(dossier.docs.fiche || dossier.docs.affichages || dossier.docs.urgence); }
function qhAdresse(){ return adresseVisible() ? (dossier.adresse||"").trim() : ""; }
function qhAutoGroup(){ return (isoWeek(qhDate())-1)%5; }
function qhGroupIndex(){
  const g = dossier.quartHeure.groupe;
  return (g===undefined||g===null||g==="") ? qhAutoGroup() : Number(g);
}
function qhFlags(){
  const f = Object.assign({}, dossier.risquesSpec);
  if(dossier.docs.fiche){
    const ids = new Set();
    dossier.sousTraitants.forEach(st=>st.risques.forEach(r=>ids.add(r)));
    Object.keys(QH_SPECIAUX).forEach(k=>{ if(ids.has(k)) f[k]=true; });
  }
  const dt = qhDate();
  const mo = dt.getUTCMonth()+1;
  if(mo>=6 && mo<=8 && dt.getUTCDate()<=7) f.chaleur = true; // 1 fois par mois en été (1re semaine du mois)
  return f;
}
function computeThemesText(){
  const g = QH_GROUPS[qhGroupIndex()];
  const f = qhFlags();
  const out = [];
  CONFIG.socleQuartHeure.forEach(l=>out.push(l));
  g.lines.forEach(l=>out.push(l.replace("@ADRESSE@", qhAdresse() || DOTS)));
  Object.keys(QH_SPECIAUX).forEach(k=>{ if(f[k]) QH_SPECIAUX[k].lines.forEach(l=>out.push(l)); });
  return out.join("\n");
}
function qhSignature(){
  return JSON.stringify([qhGroupIndex(), qhFlags(), qhAdresse(), CONFIG.socleQuartHeure]);
}
function ensureThemes(){
  if(!dossier.docs.quartHeure) return;
  const sig = qhSignature();
  if(!dossier.quartHeure.themesText || dossier.quartHeure.sig!==sig){
    dossier.quartHeure.themesText = computeThemesText();
    dossier.quartHeure.sig = sig;
  }
}
function setRisqueSpec(k, v){ dossier.risquesSpec[k]=v; }
function setQhGroupe(v){ dossier.quartHeure.groupe = v===""?"":Number(v); dossier.quartHeure.themesText=""; ensureThemes(); render(); }

/* =========================================================================
   MÉTIER PERSONNALISÉ (ajout manuel si un métier n'existe pas encore)
   ========================================================================= */
function addCustomMetier(stId){
  const st = dossier.sousTraitants.find(s=>s.id===stId);
  if(!st || !st.customNom || !st.customNom.trim()){ return; }
  const newMetier = {
    id: uid("cm"),
    nom: st.customNom.trim(),
    nature: st.customNature||"",
    produits: st.customProduits||"",
    outillage: st.customOutillage||"",
    etapes: splitLinesArr(st.customEtapes||""),
    epi: [], risques: [],
    _custom: true
  };
  CONFIG.corpsDeMetier.push(newMetier);
  if(!st.metiers.includes(newMetier.id)) st.metiers.push(newMetier.id);
  st.customNom = ""; st.customNature=""; st.customProduits=""; st.customOutillage=""; st.customEtapes="";
  st.preview = null;
  render();
}

/* =========================================================================
   GÉNÉRATION DU PDF
   ========================================================================= */
const EMARGEMENT_ROWS = 11;
const EMARGEMENT_MIN_ROWS = 8;
const TABLE_ROW_H = 7.3;
const TABLE_HEADER_H = 8.5;
const SZ = { body:10.5, label:10.5, subhead:11.5, banner:12, title:16, subtitle:9.5, small:8 };

function splitLinesArr(text){ return String(text||"").split("\n").map(s=>s.trim()).filter(Boolean); }
function splitCommaArr(text){ return String(text||"").split(",").map(s=>s.trim()).filter(Boolean); }
function computeChantierDate(){
  const dates = dossier.sousTraitants.map(s=>s.dateDebut).filter(Boolean).sort();
  return dates[0] || dossier.dateDebut || "—";
}

// Calcule la plus grande taille de police (parmi une liste décroissante) qui permet
// aux thèmes du 1/4h sécurité de tenir dans l'espace disponible avant le tableau
// d'émargement, afin que tout le document tienne sur une seule page.
const THEME_FIT_SIZES = [
  {size:9.8, lh:4.6}, {size:9.3, lh:4.35}, {size:8.8, lh:4.1}, {size:8.3, lh:3.85},
  {size:7.8, lh:3.6}, {size:7.3, lh:3.35}, {size:6.8, lh:3.1}
];
function qhHeight(pdf, items, maxWidth, opt){
  let h = 0;
  items.forEach((it,i)=>{
    if(it.startsWith("## ")){
      pdf.setFont("helvetica","bold"); pdf.setFontSize(opt.size+0.8);
      h += (i>0?opt.lh*0.5:0) + pdf.splitTextToSize(it.slice(3), maxWidth).length*opt.lh;
    } else {
      pdf.setFont("helvetica","normal"); pdf.setFontSize(opt.size);
      h += pdf.splitTextToSize(it.replace(/^-\s*/,""), it.startsWith("-")?maxWidth-5:maxWidth).length*opt.lh + (it.startsWith("-")?0:opt.lh*0.3);
    }
  });
  return h;
}
function fitThemeFont(pdf, items, maxWidth, availableHeight){
  for(const opt of THEME_FIT_SIZES){
    if(qhHeight(pdf, items, maxWidth, opt) <= availableHeight) return opt;
  }
  return THEME_FIT_SIZES[THEME_FIT_SIZES.length-1];
}
function drawThemes(D, items, opt){
  const p = D.pdf, IND = opt.ind||8, SUB = 4, BASE = opt.base||0;
  let lvl1 = false, inTheme = false;
  items.forEach((it,i)=>{
    if(it.startsWith("# ")){
      lvl1 = true; inTheme = false;
      p.setFont("helvetica","bold"); p.setFontSize(opt.size+1.2); p.setTextColor(0,0,0);
      if(i>0) D.y += opt.lh*0.6;
      p.splitTextToSize(it.slice(2), D.contentW-BASE).forEach(l=>{ D.ensureSpace(opt.lh+0.4); p.text(l, D.margin+BASE, D.y); D.y += opt.lh; });
    } else if(it.startsWith("## ")){
      inTheme = true;
      const b0 = BASE + (lvl1 ? IND : 0);
      p.setFont("helvetica","bold"); p.setFontSize(opt.size+0.8); p.setTextColor(0,0,0);
      if(i>0) D.y += opt.lh*0.6;
      p.splitTextToSize(it.slice(3), D.contentW-b0).forEach(l=>{ D.ensureSpace(opt.lh+0.4); p.text(l, D.margin+b0, D.y); D.y += opt.lh; });
    } else {
      const b0 = BASE + (lvl1 ? IND : 0) + (inTheme ? SUB : 0);
      p.setFont("helvetica","normal"); p.setFontSize(opt.size); p.setTextColor(0,0,0);
      const dash = it.startsWith("-");
      const body = it.replace(/^-\s*/,""), wMax = (dash?D.contentW-5:D.contentW)-b0;
      if(body.indexOf("**")>=0){
        /* texte avec passages en gras : **mot** */
        const words = []; body.split(/(\*\*.+?\*\*[.,;:]?)/).forEach(seg=>{ const m = /^\*\*(.+?)\*\*([.,;:]?)$/.exec(seg); if(m) words.push({w:m[1]+m[2],b:true}); else seg.split(/\s+/).filter(Boolean).forEach(w=>words.push({w:w,b:false})); });
        const wd = (o)=>{ p.setFont("helvetica",o.b?"bold":"normal"); return p.getTextWidth(o.w); };
        p.setFont("helvetica","normal"); const sp = p.getTextWidth(" ");
        const lines = []; let cur = [], cw = 0;
        words.forEach(o=>{ const w = wd(o); if(cur.length && cw+sp+w > wMax){ lines.push(cur); cur=[]; cw=0; } cw += (cur.length?sp:0)+w; cur.push(o); });
        if(cur.length) lines.push(cur);
        lines.forEach((ln,k)=>{ D.ensureSpace(opt.lh+0.4); p.setFont("helvetica","normal"); if(dash&&k===0) p.text("-", D.margin+b0+1, D.y);
          let x = D.margin+b0+(dash?5:0); ln.forEach(o=>{ p.setFont("helvetica",o.b?"bold":"normal"); p.text(o.w, x, D.y); x += p.getTextWidth(o.w)+sp; }); D.y += opt.lh; });
        p.setFont("helvetica","normal");
      } else
      p.splitTextToSize(body, wMax).forEach((l,k)=>{ D.ensureSpace(opt.lh+0.4); if(dash&&k===0) p.text("-", D.margin+b0+1, D.y); p.text(l, D.margin+b0+(dash?5:0), D.y); D.y += opt.lh; });
      if(!dash) D.y += opt.lh*0.3;
    }
  });
}

const FICHE_TH = {size:10, lh:5, base:15, ind:8};
/* texte "Métier :\nligne" -> "## Métier" + "- ligne" (un seul métier : tirets seuls) */
function toThemes(text, splitComma){
  const out = [];
  splitLinesArr(text||"").forEach(l=>{
    const t = l.trim(); if(!t || t==="—") return;
    if(/ :$/.test(t) && !/^[-•\d]/.test(t)) out.push("# "+t.slice(0,-2));
    else { const x = t.replace(/^[-•]\s*/,"").replace(/^\d+\.\s*/,""); (splitComma ? x.split(/\s*,\s*/) : [x]).forEach(y=>{ if(y) out.push("- "+y.charAt(0).toUpperCase()+y.slice(1)); }); }
  });
  if(out.filter(x=>x.startsWith("# ")).length===1 && out[0].startsWith("# ")) out.shift();
  return out;
}
function chantierLabel(){
  const n = (dossier.nomChantier||"").trim(), a = (dossier.affaire||"").trim();
  return (n && a) ? n+" — n° "+a : (n || a || "");
}
function dotsFor(D, maxW){
  const p=D.pdf; let str=""; while(p.getTextWidth(str+".") < maxW) str += "."; return str;
}
function dottedLines(D, n){
  const p=D.pdf; p.setFont("helvetica","normal"); p.setFontSize(SZ.body);
  const str = dotsFor(D, D.contentW-6);
  for(let i=0;i<n;i++){ D.ensureSpace(7); p.text(str, D.margin+2, D.y); D.y += 6.4; }
  D.y += 1;
}
function dotLine(D, label){
  const p=D.pdf; D.ensureSpace(7);
  p.setFont("helvetica","bold"); p.setFontSize(SZ.label);
  p.text(label+" :", D.margin, D.y);
  const lw = p.getTextWidth(label+" :  ");
  p.setFont("helvetica","normal");
  p.text(dotsFor(D, D.contentW-lw-3), D.margin+lw+1, D.y);
  D.y += 6.4;
}
function drawUrgIcon(p, kind, cx, cy, bg){
  p.setFillColor(255,255,255); p.setDrawColor(255,255,255); p.setTextColor(255,255,255);
  if(kind==="flame"){
    /* flamme : Bootstrap Icons (licence MIT) */
    try{ p.addImage(FLAME_B64, "PNG", cx-7, cy-8.5, 14, 16); }catch(e){}
  } else if(kind==="cross"){
    p.setLineWidth(0.9); p.circle(cx, cy, 7, "S");
    p.rect(cx-1.4, cy-4.6, 2.8, 9.2, "F"); p.rect(cx-4.6, cy-1.4, 9.2, 2.8, "F");
  } else {
    // triangle d'avertissement plein, point d'exclamation en creux
    p.setFillColor(255,255,255); p.setDrawColor(255,255,255); p.setLineWidth(1.6);
    p.triangle(cx-8.2, cy+7, cx+8.2, cy+7, cx, cy-8.6, "FD");
    p.setFillColor(bg[0],bg[1],bg[2]);
    p.roundedRect(cx-1.1, cy-3.6, 2.2, 6.4, 0.9, 0.9, "F");
    p.circle(cx, cy+4.6, 1.2, "F");
  }
  p.setLineWidth(0.2);
}
function renderUrgence(D){
  D.newPage();
  D.header("FICHE D'URGENCE", "À afficher à la base vie. En cas d'accident : protéger, alerter, secourir.");
  const p=D.pdf, m=D.margin, W=D.contentW, gap=4, cw=(W-2*gap)/3;
  // numéros d'urgence
  const ch=38;
  [{n:"18",l:"POMPIERS",c:[200,30,30],ic:"flame"},{n:"15",l:"SAMU",c:[20,84,166],ic:"cross"},{n:"112",l:"URGENCE (portable)",c:[45,45,45],ic:"alert"}].forEach((c,i)=>{
    const x=m+i*(cw+gap), y=D.y;
    p.setFillColor(c.c[0],c.c[1],c.c[2]); p.roundedRect(x, y, cw, ch, 3, 3, "F");
    drawUrgIcon(p, c.ic, x+cw/2, y+10.5, c.c);
    p.setTextColor(255,255,255); p.setFont("helvetica","bold"); p.setFontSize(30); p.text(c.n, x+cw/2, y+29.5, {align:"center"});
    p.setFontSize(10); p.text(c.l, x+cw/2, y+35, {align:"center"});
  });
  p.setTextColor(30,30,30); D.y += ch+3;
  // urgence gaz (GRDF)
  p.setFillColor(255,205,0); p.roundedRect(m, D.y, W, 10, 2, 2, "F");
  p.setTextColor(0,0,0); p.setFont("helvetica","bold"); p.setFontSize(12);
  p.text("URGENCE GAZ (GRDF) :  0 800 47 33 33", m+W/2, D.y+6.6, {align:"center"});
  p.setFont("helvetica","normal"); p.setFontSize(8); p.text("gratuit, 24 h sur 24", m+W-3, D.y+6.2, {align:"right"});
  p.setTextColor(30,30,30); D.y += 13;
  // adresse
  const adr=(dossier.adresse||"").trim(), code=(dossier.codeAcces||"").trim();
  const bh=22, y0=D.y;
  p.setDrawColor(30,30,30); p.setLineWidth(0.6); p.roundedRect(m, y0, W, bh, 2, 2, "S"); p.setLineWidth(0.2);
  p.setFont("helvetica","bold"); p.setFontSize(8.5); p.setTextColor(110,110,110);
  p.text("ADRESSE DU CHANTIER (à donner aux secours)", m+4, y0+6);
  p.setTextColor(0,0,0);
  if(adr){
    p.setFontSize(13.5); const l=p.splitTextToSize(adr, W-8); p.text(l.slice(0,2), m+4, y0+12.5);
  } else { p.setFont("helvetica","normal"); p.setFontSize(11); p.text(dotsFor(D, W-8), m+4, y0+14); }
  p.setFont("helvetica","normal"); p.setFontSize(9.5);
  const sub=[chantierLabel(), code?("Code d'accès : "+code):""].filter(Boolean).join("   —   ");
  if(sub) p.text(sub, m+4, y0+bh-3);
  p.setTextColor(30,30,30); D.y += bh+5;
  // 3 gestes
  const gh=25;
  [["1","PROTÉGER","Écarter le danger (courant, gaz, feu) sans se mettre en danger."],
   ["2","ALERTER","Appeler le 18, le 15 ou le 112. Prévenir ensuite le conducteur de travaux."],
   ["3","SECOURIR","Rester près du blessé. Ne pas le déplacer, sauf danger immédiat."]].forEach((g,i)=>{
    const x=m+i*(cw+gap), y=D.y;
    p.setDrawColor(200,200,200); p.roundedRect(x, y, cw, gh, 2, 2, "S");
    p.setFillColor(234,79,0); p.circle(x+6, y+6.5, 3.6, "F");
    p.setTextColor(255,255,255); p.setFont("helvetica","bold"); p.setFontSize(10); p.text(g[0], x+6, y+7.8, {align:"center"});
    p.setTextColor(196,67,0); p.setFontSize(11.5); p.text(g[1], x+12, y+8);
    p.setTextColor(30,30,30); p.setFont("helvetica","normal"); p.setFontSize(9.5);
    p.text(p.splitTextToSize(g[2], cw-6), x+3, y+14.5);
  });
  D.y += gh+5;
  // message d'appel
  D.subheading("Quand j'appelle, je dis :");
  D.bullets([
    "L'adresse : "+(adr||"............................................")+".",
    "Le code d'accès : "+(code||"............")+".",
    "Ce qui s'est passé : chute, coupure, feu, gaz, malaise.",
    "Combien de blessés (les secours disent « victimes »).",
    "L'état de chaque blessé : conscient ou non, respire ou non, saigne ou non."
  ], {size:10.5, lh:5.2, gapAfter:0});
  D.paragraph("Je ne raccroche pas en premier.", {bold:true, gapAfter:2});
  // à prévenir
  D.subheading("À prévenir ensuite");
  D.keyValue("Conducteur de travaux", (dossier.cdtNom||"").trim() ? (dossier.cdtNom.trim()+"      Tél. : ......................................") : "..........................................      Tél. : ......................................");
  const sts = dossier.sousTraitants.filter(st=>(st.entreprise||"").trim() || (st.contactNom||"").trim() || (st.contactTel||"").trim());
  const rows = Math.max(3, sts.length), rh=7, cwid=[64, 54, W-118];
  D.ensureSpace(8+rows*rh+3);
  let y=D.y;
  p.setFillColor(234,79,0); p.rect(m, y, W, 7.5, "F");
  p.setTextColor(255,255,255); p.setFont("helvetica","bold"); p.setFontSize(9.5);
  let x=m; ["Entreprise sur le chantier","Contact","Téléphone"].forEach((t,i)=>{ p.text(t, x+2, y+5.2); x+=cwid[i]; });
  y += 7.5; p.setTextColor(30,30,30); p.setFont("helvetica","normal"); p.setFontSize(10); p.setDrawColor(200,200,200);
  for(let r=0;r<rows;r++){
    if(r%2===1){ p.setFillColor(250,244,238); p.rect(m, y, W, rh, "F"); }
    x=m; const st=sts[r]||{}; const vals=[st.entreprise||"", st.contactNom||"", st.contactTel||""];
    for(let c=0;c<3;c++){ p.rect(x, y, cwid[c], rh, "S"); if(vals[c]) p.text(String(vals[c]), x+2, y+4.9, {maxWidth:cwid[c]-4}); x+=cwid[c]; }
    y += rh;
  }
  D.y = y + 5;
}

/* Particularités du chantier (1/4h) : texte saisi, sinon 2 lignes pointillées à remplir à la main */
const QH_SITE_LH = 6;
function qhSiteLines(D){
  const t = (dossier.quartHeure.siteLine||"").trim();
  if(!t) return null;
  const p = D.pdf; p.setFont("helvetica","normal"); p.setFontSize(SZ.body);
  return t.split(/\n/).flatMap(l=>p.splitTextToSize(l, D.contentW-6));
}
function qhSiteHeight(lines){ return 6 + Math.max(2, lines?lines.length:2)*QH_SITE_LH + 1; }
function qhSiteBlock(D, lines){
  D.subheading("Particularités du chantier");
  const p = D.pdf; p.setFont("helvetica","normal"); p.setFontSize(SZ.body);
  if(lines && lines.length){
    lines.forEach(l=>{ p.text(l, D.margin+2, D.y); D.y += QH_SITE_LH; });
    if(lines.length<2) D.y += QH_SITE_LH*(2-lines.length);
  } else {
    const dots = "."; const maxW = D.contentW-6; let str = "";
    while(p.getTextWidth(str+dots) < maxW) str += dots;
    for(let i=0;i<2;i++){ p.text(str, D.margin+2, D.y); D.y += QH_SITE_LH; }
  }
  D.y += 1;
}
function renderQuartHeure(D){
  D.newPage();
  D.header("ÉMARGEMENT 1/4 D'HEURE SÉCURITÉ", "");
  D.keyValueRow([["Date", computeChantierDate()], ["Chantier", chantierLabel() || qhAdresse() || "—"]]);
  D.keyValueRow([["Présentateur", dossier.quartHeure.presentateur || dossier.cdtNom || "—"], ["Support fait par", dossier.quartHeure.supportPar || dossier.cdtNom || "—"]]);
  D.y += 3;
  D.subheading("Thèmes abordés");

  const items = splitLinesArr(dossier.quartHeure.themesText);
  const bottomLimit = D.pageH - 20;
  const siteLines = qhSiteLines(D);
  const fixedAfterThemes = 2 + 2.5 + qhSiteHeight(siteLines) + 6 + TABLE_HEADER_H + EMARGEMENT_MIN_ROWS*TABLE_ROW_H;
  const availableForThemes = bottomLimit - D.y - fixedAfterThemes;
  const fit = fitThemeFont(D.pdf, items, D.contentW-6, availableForThemes);

  drawThemes(D, items, fit); D.y += 2;
  D.y += 2.5;
  qhSiteBlock(D, siteLines);
  D.subheading("Émargement");
  // le tableau descend jusqu'en bas de la page : autant de lignes que la place restante le permet
  const restant = (D.pageH - 20) - D.y - TABLE_HEADER_H - 1;
  D.signatureTable(Math.max(EMARGEMENT_MIN_ROWS, Math.floor(restant / TABLE_ROW_H)));
}

let lastPdfUrl = null;
let lastPdfFilename = null;

/* =========================================================================
   PANNEAUX DE SIGNALÉTIQUE (visuels fournis par l'utilisateur, en fond de
   page ; seuls le chantier et le numéro de zone sont surimposés).
   Coordonnées calées par OCR sur les visuels d'origine (repère jsPDF :
   origine en haut à gauche, contrairement au repère bas-gauche utilisé lors
   du calage initial -> y converti ici : y_jspdf = 297 - y_bas).
   ========================================================================= */
const SIGNAGE_CHANTIER_X = 46;
const SIGNAGE_CHANTIER_Y = 297 - 12.6;
const SIGNAGE_CHANTIER_MAXW = 60;
const SIGNAGE_ZONE_X = 112;
const SIGNAGE_ZONE_Y = 297 - 12.6;

function fitFontForWidth(pdf, text, maxWidthMm, startSize){
  let size = startSize;
  for(; size > 7; size -= 0.5){
    pdf.setFont("helvetica","normal");
    pdf.setFontSize(size);
    if(pdf.getTextWidth(text) <= maxWidthMm) break;
  }
  return size;
}
function addSignagePage(pdf, b64, isFirstPage){
  if(!isFirstPage) pdf.addPage();
  try{ pdf.addImage(b64, "PNG", 0, 0, 210, 297); }catch(e){ console.error("Signage image error", e); }
}
function drawSignageChantier(pdf, chantierText){
  const size = fitFontForWidth(pdf, chantierText, SIGNAGE_CHANTIER_MAXW, 10.5);
  pdf.setTextColor(25,24,22);
  pdf.setFont("helvetica","normal");
  pdf.setFontSize(size);
  pdf.text(chantierText, SIGNAGE_CHANTIER_X, SIGNAGE_CHANTIER_Y);
}
function drawSignageZone(pdf, zoneNumber){
  pdf.setTextColor(25,24,22);
  pdf.setFont("helvetica","bold");
  pdf.setFontSize(10.5);
  pdf.text("Zone n° : "+zoneNumber, SIGNAGE_ZONE_X, SIGNAGE_ZONE_Y);
}
/* Affiche DANGER GAZ : case cochée sur le chantier, ou risque gaz d'un sous-traitant */
function gazActif(){
  if(dossier.risquesSpec && dossier.risquesSpec.gazAlimente) return true;
  return !!(dossier.docs.fiche && dossier.sousTraitants.some(st=>(st.risques||[]).includes("gazAlimente")));
}
function renderSignagePages(pdf, isFirstContent){
  const chantierText = (dossier.affaire||"").trim() || (dossier.adresse||"").trim() || "—";
  const nbZones = Math.max(0, parseInt(dossier.nbZones)||0);
  let firstPage = !!isFirstContent;

  addSignagePage(pdf, SIGNAGE_BASEVIE_B64, firstPage); firstPage = false;
  drawSignageChantier(pdf, chantierText);

  addSignagePage(pdf, SIGNAGE_STOCKAGE_B64, firstPage);
  drawSignageChantier(pdf, chantierText);

  if(gazActif()){
    addSignagePage(pdf, SIGNAGE_GAZ_B64, firstPage);
    drawSignageChantier(pdf, chantierText);
  }

  for(let z=1; z<=nbZones; z++){
    addSignagePage(pdf, SIGNAGE_INTERDIT_B64, firstPage);
    drawSignageChantier(pdf, chantierText);
    drawSignageZone(pdf, z);

    addSignagePage(pdf, SIGNAGE_EPI_B64, firstPage);
    drawSignageChantier(pdf, chantierText);
    drawSignageZone(pdf, z);
  }
}

function updateST(id, field, value){
  const st = dossier.sousTraitants.find(s=>s.id===id);
  if(st){ st[field] = value; }
}
const RISQUES_FICHE = ["amiante","plomb","coactivite","chaleur","elecNonConsigne","gazAlimente","siteOccupe"];
function toggleMetier(id, metierId, checked){
  const st = dossier.sousTraitants.find(s=>s.id===id);
  if(!st) return;
  if(checked){
    if(!st.metiers.includes(metierId)) st.metiers.push(metierId);
    const m = CONFIG.corpsDeMetier.find(x=>x.id===metierId);
    if(m) (m.risques||[]).forEach(r=>{ if(RISQUES_FICHE.includes(r) && !st.risques.includes(r)) st.risques.push(r); });
  } else {
    st.metiers = st.metiers.filter(x=>x!==metierId);
  }
  st.preview = null; render();
}
function toggleRisque(id, risqueId, checked){
  const st = dossier.sousTraitants.find(s=>s.id===id);
  if(!st) return;
  if(checked){ if(!st.risques.includes(risqueId)) st.risques.push(risqueId); }
  else { st.risques = st.risques.filter(x=>x!==risqueId); }
  st.preview = null; render();
}
function addSousTraitant(){ dossier.sousTraitants.push(makeSousTraitant()); render(); }
function removeSousTraitant(id){
  if(dossier.sousTraitants.length<=1) return;
  dossier.sousTraitants = dossier.sousTraitants.filter(s=>s.id!==id); render();
}
function updatePreviewField(id, field, value){
  const st = dossier.sousTraitants.find(s=>s.id===id);
  if(st){ if(!st.preview) st.preview = computePreview(st); st.preview[field]=value; }
}
function updateThemesText(value){ dossier.quartHeure.themesText = value; }
function newDossier(){
  if(confirm("Repartir sur un nouveau dossier ? Le dossier actuel (non enregistré) sera perdu.")){
    dossier = makeDossier(); currentStep = "select"; genMessage=null; render();
  }
}
function toggleSettings(){ settingsOpen = !settingsOpen; if(!settingsOpen){ adminOk=false; settingsMsg=null; } render(); }
function setSettingsTab(tab){ settingsTab = tab; render(); }

/* --- Réglages : Corps de métier --- */
function addMetierRow(){ const id=uid("cm"); CONFIG.corpsDeMetier.push({id:id, nom:"Nouveau métier", nature:"", produits:"", outillage:"", risquesTexte:"", etapes:[], epi:[], risques:[]}); settingsSel.metiers=id; render(); }
function updateMetierField(id, field, value){
  const m = CONFIG.corpsDeMetier.find(x=>x.id===id); if(!m) return;
  if(field==="etapes") m.etapes = splitLinesArr(value);
  else if(field==="epi") m.epi = namesToIds(value, CONFIG.epi);
  else if(field==="risques") m.risques = namesToIds(value, CONFIG.risques);
  else m[field] = value;
}
function deleteMetierRow(id){ if(confirm("Supprimer ce corps de métier ?")){ CONFIG.corpsDeMetier = CONFIG.corpsDeMetier.filter(x=>x.id!==id); render(); } }

/* --- Réglages : Risques --- */
function addRisqueRow(){ const id=uid("rq"); CONFIG.risques.push({id:id, nom:"Nouveau risque", declencheSi:"", epi:[], equipements:"", consignes:"", themeQuartHeure:""}); settingsSel.risques=id; render(); }
function updateRisqueField(id, field, value){
  const r = CONFIG.risques.find(x=>x.id===id); if(!r) return;
  if(field==="epi") r.epi = namesToIds(value, CONFIG.epi);
  else r[field] = value;
}
function deleteRisqueRow(id){ if(confirm("Supprimer ce risque ?")){ CONFIG.risques = CONFIG.risques.filter(x=>x.id!==id); render(); } }

/* --- Réglages : EPI --- */
function addEpiRow(){ CONFIG.epi.push({id:uid("ep"), nom:"Nouvel EPI", statut:"conditionnel"}); render(); }
function updateEpiField(id, field, value){ const e = CONFIG.epi.find(x=>x.id===id); if(e) e[field]=value; }
function deleteEpiRow(id){ if(confirm("Supprimer cet EPI ?")){ CONFIG.epi = CONFIG.epi.filter(x=>x.id!==id); render(); } }

/* --- Réglages : textes & socle & code --- */
function updateTexteFixe(field, value){ CONFIG.textes[field] = value; }
function updateSocle(value){ CONFIG.socleQuartHeure = splitLinesArr(value); }
function updateAccessCode(value){ CONFIG.accessCode = value; }

/* --- Réglages partagés : chargement, enregistrement, retour à l'origine --- */
/* SETTINGS_REPO, SETTINGS_FILE, SETTINGS_CACHE_KEY, SETTINGS_TOKEN_KEY : voir reglages-config.js de chaque appli */
let adminOk = false, adminError = "", settingsMsg = null, settingsSel = {};
let SETTINGS_INFO = {updated:""};
let SETTINGS_DEFAULTS = {};
function clone(o){ return JSON.parse(JSON.stringify(o)); }
function snapshotDefaults(){
  SETTINGS_DEFAULTS = {
    corpsDeMetier: clone(CONFIG.corpsDeMetier), risques: clone(CONFIG.risques), epi: clone(CONFIG.epi),
    textes: clone(CONFIG.textes), socleQuartHeure: clone(CONFIG.socleQuartHeure),
    qhGroups: clone(QH_GROUPS), qhSpeciaux: clone(QH_SPECIAUX), accessCode: CONFIG.accessCode
  };
}
function buildSettings(){
  return { version:1, updated:new Date().toISOString(), adminCodeHash: CONFIG.adminCodeHash||"", accessCode: CONFIG.accessCode,
    corpsDeMetier: CONFIG.corpsDeMetier, risques: CONFIG.risques, epi: CONFIG.epi, textes: CONFIG.textes,
    socleQuartHeure: CONFIG.socleQuartHeure, qhGroups: QH_GROUPS, qhSpeciaux: QH_SPECIAUX };
}
function applySettings(o){
  if(!o || typeof o!=="object") return;
  ["corpsDeMetier","risques","epi","textes","socleQuartHeure"].forEach(k=>{ if(o[k]!==undefined) CONFIG[k] = clone(o[k]); });
  if(o.accessCode!==undefined && o.accessCode!=="") CONFIG.accessCode = o.accessCode;
  CONFIG.adminCodeHash = o.adminCodeHash || CONFIG.adminCodeHash || "";
  if(Array.isArray(o.qhGroups)){ QH_GROUPS.length = 0; clone(o.qhGroups).forEach(g=>QH_GROUPS.push(g)); }
  if(o.qhSpeciaux && typeof o.qhSpeciaux==="object"){ Object.keys(QH_SPECIAUX).forEach(k=>delete QH_SPECIAUX[k]); Object.assign(QH_SPECIAUX, clone(o.qhSpeciaux)); }
  SETTINGS_INFO.updated = o.updated || "";
}
function lsGet(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
function lsSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
function lsDel(k){ try{ localStorage.removeItem(k); }catch(e){} }
async function loadSharedSettings(){
  try{
    const c = lsGet(SETTINGS_CACHE_KEY); if(c){ applySettings(JSON.parse(c)); render(); }
  }catch(e){}
  try{
    const ctl = new AbortController(); const t = setTimeout(()=>ctl.abort(), 4000);
    const r = await fetch(SETTINGS_FILE+"?t="+Date.now(), {cache:"no-store", signal:ctl.signal}); clearTimeout(t);
    if(!r.ok) return;
    const txt = await r.text(); const o = JSON.parse(txt);
    if(o.updated && o.updated===SETTINGS_INFO.updated) return;
    applySettings(o); lsSet(SETTINGS_CACHE_KEY, txt);
    if(!settingsOpen) render();
  }catch(e){ /* hors ligne ou fichier absent : on garde la version en cache ou d'origine */ }
}
async function sha256Hex(str){
  try{
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("poc|"+str));
    return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join("");
  }catch(e){ let h=5381; for(const ch of "poc|"+str) h=((h<<5)+h+ch.charCodeAt(0))|0; return "x"+(h>>>0).toString(16); }
}
async function submitAdminCode(){
  const el = document.getElementById("adm-code"); const typed = (el?el.value:"").trim();
  if(!CONFIG.adminCodeHash){
    if(typed.length<4){ adminError = "Le code doit faire au moins 4 caractères."; render(); return; }
    CONFIG.adminCodeHash = await sha256Hex(typed); adminOk = true; adminError = "";
    settingsMsg = {type:"success", text:"Code administrateur défini. Il sera enregistré pour tout le monde avec le bouton « Enregistrer pour tout le monde »."};
  } else if(await sha256Hex(typed)===CONFIG.adminCodeHash){ adminOk = true; adminError = ""; }
  else { adminError = "Code incorrect."; }
  render();
}
async function updateAdminCode(v){
  v = (v||"").trim(); if(!v) return;
  if(v.length<4){ settingsMsg = {type:"error", text:"Le code doit faire au moins 4 caractères."}; render(); return; }
  CONFIG.adminCodeHash = await sha256Hex(v);
  settingsMsg = {type:"success", text:"Nouveau code administrateur pris en compte. Pensez à « Enregistrer pour tout le monde »."}; render();
}
function closeSettings(){ settingsOpen = false; adminOk = false; settingsMsg = null; render(); }
function qhModified(x){
  try{
    if(x.kind==="g") return JSON.stringify(SETTINGS_DEFAULTS.qhGroups[x.i])!==JSON.stringify(QH_GROUPS[x.i]);
    return JSON.stringify(SETTINGS_DEFAULTS.qhSpeciaux[x.k])!==JSON.stringify(QH_SPECIAUX[x.k]);
  }catch(e){ return false; }
}
function updateQh(id, field, value){
  if(id.startsWith("g")){ const g = QH_GROUPS[Number(id.slice(1))]; if(!g) return; if(field==="nom") g.nom = value; else g.lines = splitLinesArr(value); }
  else { const o = QH_SPECIAUX[id.slice(2)]; if(!o) return; if(field==="nom") o.label = value; else o.lines = splitLinesArr(value); }
}
function resetSettingsTab(){
  if(!confirm("Revenir au réglage d'origine pour cet onglet ? Vos modifications de cet onglet seront perdues (tant que vous n'avez pas enregistré).")) return;
  const D = SETTINGS_DEFAULTS, t = settingsTab;
  if(t==="metiers") CONFIG.corpsDeMetier = clone(D.corpsDeMetier);
  if(t==="risques") CONFIG.risques = clone(D.risques);
  if(t==="epi") CONFIG.epi = clone(D.epi);
  if(t==="textes"){ CONFIG.textes = clone(D.textes); CONFIG.socleQuartHeure = clone(D.socleQuartHeure); }
  if(t==="qh"){ QH_GROUPS.length = 0; clone(D.qhGroups).forEach(g=>QH_GROUPS.push(g)); Object.keys(QH_SPECIAUX).forEach(k=>delete QH_SPECIAUX[k]); Object.assign(QH_SPECIAUX, clone(D.qhSpeciaux)); }
  if(t==="code") CONFIG.accessCode = D.accessCode;
  settingsMsg = {type:"success", text:"Réglage d'origine rétabli pour cet onglet. Faites « Enregistrer pour tout le monde » pour le publier."}; render();
}
function forgetGithubToken(){ lsDel(SETTINGS_TOKEN_KEY); settingsMsg = {type:"success", text:"Clé GitHub oubliée sur cet appareil."}; render(); }
function b64utf8(str){ const bytes = new TextEncoder().encode(str); let bin = ""; bytes.forEach(b=>bin+=String.fromCharCode(b)); return btoa(bin); }
async function saveShared(){
  let token = lsGet(SETTINGS_TOKEN_KEY);
  if(!token){
    token = (prompt("Pour publier pour tout le monde, collez la clé d'accès GitHub (une seule fois sur cet appareil) :")||"").trim();
    if(!token){ settingsMsg = {type:"error", text:"Publication annulée : aucune clé saisie. Vos modifications restent actives sur cet appareil."}; render(); return; }
  }
  const payload = buildSettings(); const txt = JSON.stringify(payload, null, 1);
  const api = "https://api.github.com/repos/"+SETTINGS_REPO+"/contents/"+SETTINGS_FILE;
  const hdr = {"Authorization":"Bearer "+token, "Accept":"application/vnd.github+json"};
  try{
    let sha; const g = await fetch(api+"?ref=main&t="+Date.now(), {headers:hdr, cache:"no-store"});
    if(g.status===401||g.status===403){ lsDel(SETTINGS_TOKEN_KEY); throw new Error("Clé GitHub refusée (401/403). Elle a été oubliée : recommencez avec une clé valide."); }
    if(g.ok){ sha = (await g.json()).sha; }
    const body = {message:"Réglages mis à jour depuis l'appli", content:b64utf8(txt), branch:"main"}; if(sha) body.sha = sha;
    const r = await fetch(api, {method:"PUT", headers:Object.assign({"Content-Type":"application/json"},hdr), body:JSON.stringify(body)});
    if(!r.ok){ const e = await r.text(); throw new Error("GitHub a refusé l'enregistrement ("+r.status+"). "+e.slice(0,160)); }
    lsSet(SETTINGS_TOKEN_KEY, token); lsSet(SETTINGS_CACHE_KEY, txt); SETTINGS_INFO.updated = payload.updated;
    settingsMsg = {type:"success", text:"Enregistré pour tout le monde. Les autres le recevront à la réouverture de l'appli (compter 1 à 2 minutes)."};
  }catch(e){
    lsSet(SETTINGS_CACHE_KEY, txt);
    settingsMsg = {type:"error", text:"Non publié : "+(e.message||e)+" Vos modifications restent actives sur cet appareil."};
  }
  render();
}

/* --- Gate --- */
function updateGateInput(v){
  gateInput = v;
  /* validation automatique : dès que le code saisi est bon, ou qu'il a la longueur du code et qu'il est faux */
  const typed = v.trim().toLowerCase();
  const codes = [String(CONFIG.accessCode), "abid"].map(c=>c.toLowerCase());
  const maxLen = Math.max.apply(null, codes.map(c=>c.length));
  if(codes.includes(typed)){ unlocked = true; gateError = ""; render(); }
  else if(typed.length >= maxLen){
    gateError = "Code incorrect."; gateInput = ""; render();
    const i = document.querySelector(".gate-body input"); if(i) i.focus();
  }
}
function submitGate(){
  const typed = gateInput.trim().toLowerCase();
  const codes = [String(CONFIG.accessCode), "abid"].map(c=>c.toLowerCase());
  if(codes.includes(typed)){ unlocked = true; gateError=""; }
  else { gateError = "Code incorrect."; }
  render();
}

/* =========================================================================
   RENDU
   ========================================================================= */
function esc(s){ return String(s===undefined||s===null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

function renderStepper(){
  const keys = activeStepKeys();
  const currentIdx = keys.indexOf(currentStep);
  const mob = '<div class="stepper-m"><small>Étape '+(currentIdx+1)+' sur '+keys.length+' · '+STEP_LABELS[currentStep]+'</small><div class="pb"><i style="width:'+Math.round((currentIdx+1)/keys.length*100)+'%"></i></div></div>';
  return mob+'<div class="stepper">'+keys.map((key,i)=>{
    const n=i+1; const cls = key===currentStep?"active":(i<currentIdx?"done":"");
    return '<div class="step-pill '+cls+'" style="cursor:pointer;" onclick="goStep(\''+key+'\')"><span class="num">'+n+'</span>'+STEP_LABELS[key]+'</div>';
  }).join('')+'</div>';
}

const TILE_ICONS = {
  urgence:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v9M7.5 12h9"/></svg>',
  fiche:'<svg viewBox="0 0 24 24"><path d="M9 4h6v3H9z"/><path d="M8 5.5H6.5A1.5 1.5 0 0 0 5 7v12.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V7a1.5 1.5 0 0 0-1.5-1.5H16"/><path d="M8.5 12h7M8.5 16h5"/></svg>',
  quartHeure:'<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5V6z"/><path d="M9 12l2.2 2.2L15.5 10"/></svg>',
  affichages:'<svg viewBox="0 0 24 24"><rect x="2.5" y="3.5" width="19" height="17" rx="2"/><path d="M6.5 15.5a5.5 5.5 0 0 1 11 0z"/><path d="M5.5 15.5h13M12 10v2.5"/></svg>',
  materiel:'<svg viewBox="0 0 24 24"><path d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2z"/><path d="M4 7.2l8 4.3 8-4.3M12 11.5V21"/></svg>'
};
function toggleDocOther(key, checked){
  dossier.docs[key] = checked;
  if(checked) dossier.docs.materiel = false;
  render();
}
function toggleDocMateriel(checked){
  dossier.docs.materiel = checked;
  if(checked){ dossier.docs.fiche=false; dossier.docs.quartHeure=false; dossier.docs.affichages=false; dossier.docs.urgence=false; }
  render();
}

/* =========================================================================
   MATÉRIEL OPC — module indépendant (données, logique, rendu), préfixé
   "Materiel" pour ne jamais entrer en collision avec le reste de l'app.
   ========================================================================= */
let CATEGORIES_MATERIEL = [
  { id:"elec", nom:"Électricité", fournisseur:"REXEL", items:[
    {label:"Prises nues", qty:20},
    {label:"Enjoliveurs noirs", qty:20},
    {label:"PC TV", qty:1},
    {label:"PC 32A", qty:1},
    {label:"Réglette sans prise", qty:1},
    {label:"Réglette avec prise", qty:1},
    {label:"Hublots", qty:0},
    {label:"DCL en applique", qty:4},
    {label:"DCL encastré", qty:0},
    {label:"Plots boîtiers placo (= nb PC + nb inter)", qty:29},
    {label:"Interrupteurs simples", qty:5},
    {label:"Interrupteurs va-et-vient", qty:2},
    {label:"Radiateur électrique 1500W", qty:0},
  ]},
  { id:"plomberie", nom:"Plomberie", fournisseur:"SFCP", items:[
    {label:"Lavabo", qty:1, ref:"S09326", prix:21},
    {label:"Pied de lavabo", qty:1, ref:"S09327", prix:16.37},
    {label:"Siphon", qty:2, ref:"P001KQ", prix:1.4},
    {label:"Mitigeur lavabo", qty:1, ref:"R26483", prix:51.95},
    {label:"Mitigeur douche", qty:1, ref:"R26490", prix:55.86},
    {label:"Flexible de douchette", qty:1, ref:"R0757B", prix:25.92},
    {label:"Pommeau de douchette", qty:1, ref:"R00TMU", prix:17.95},
    {label:"WC complet", qty:1, ref:"S09332", prix:60.95},
    {label:"Fixation WC", qty:1, ref:"P00O19", prix:1.25},
    {label:"Robinet 1/4 de tour", qty:1, ref:"P04362", prix:2.02},
    {label:"Vanne papillon 12/17", qty:4, ref:"P001OA", prix:3.04},
    {label:"Flexible inox", qty:1, ref:"C00PYR", prix:1.33},
    {label:"Grille accès sous douche", qty:1, ref:"", prix:0},
    {label:"Pipe coudée toilettes", qty:1, ref:"P001L0", prix:5.83},
    {label:"Porte papier toilette", qty:1, ref:"R54926", prix:16.23},
    {label:"Tablette céramique", qty:1, ref:"S31821", prix:32.38},
    {label:"Coude PVC 90° en 40", qty:5, ref:"P03918", prix:0.85},
    {label:"Coude PVC 90° en 32", qty:3, ref:"P03917", prix:0.63},
    {label:"Sèche-serviettes", qty:1, ref:"C53949", prix:126.64},
    {label:"Bouche VMC cuisine", qty:1, ref:"E06768", prix:75.20},
    {label:"Bouche VMC SdB", qty:1, ref:"E00034", prix:35.42},
    {label:"Radiateur", qty:0, ref:"", prix:0},
    {label:"Groupe de sécurité BECS", qty:0, ref:"P07490", prix:8.98},
    {label:"Siphon kit déflecteur (évier/LV/LL)", qty:1, global:true, ref:"PC5485", prix:1.38},
    {label:"Fillain", qty:0, ref:"P12541", prix:2.22},
    {label:"Manchon 40", qty:4, ref:"P03843", prix:0.34},
    {label:"Manchon 32", qty:4, ref:"", prix:0},
    {label:"Bouchons laiton", qty:4, ref:"P04906", prix:0.42},
    {label:"Boîte de joints 12/17, 15/21, 20/27", qty:1, global:true, ref:"PC5968", prix:2.06},
    {label:"Colle PVC", qty:1, global:true, ref:"P00216", prix:12.91},
  ]},
  { id:"cedeo", nom:"Cuisine (CEDEO)", fournisseur:"CEDEO", items:[
    {label:"Kitchenette métal", qty:1},
    {label:"Portes kitchenette", qty:1},
    {label:"Mitigeur évier", qty:1},
    {label:"Évier", qty:1},
    {label:"Plaque avec minuteur", qty:1},
    {label:"Frigo", qty:1},
  ]},
  { id:"peinture", nom:"BCL (peinture / sol souple)", fournisseur:"BCL", items:[
    {label:"Velours 15L", qty:2, extra:1},
    {label:"Ragréage", qty:1},
    {label:"Primaire", qty:1},
    {label:"Bâche 50m", qty:3, global:true},
    {label:"Sacs à gravats", qty:20},
    {label:"Colle lino", qty:0.65, roundUp:true},
    {label:"Tube silicone sanitaire", qty:3},
    {label:"Enduit gros", qty:1},
    {label:"Enduit fin", qty:1},
    {label:"Enduit rebouchage", qty:1, global:true},
    {label:"Carton acrylique", qty:1},
    {label:"Carton scotch peintre", qty:1, global:true},
    {label:"Chiffons (kg)", qty:10, global:true},
    {label:"Boîte ponçage 120 (main)", qty:1, global:true},
    {label:"Boîte ponçage 150 (machine)", qty:1, global:true},
    {label:"Sachet brosses", qty:1, global:true},
    {label:"Barre de seuil", qty:2},
    {label:"Scotch lino", qty:2},
    {label:"Remontées plinthes (ml)", qty:30},
    {label:"Baguette d'angle en bois", qty:2},
    {label:"Mastic chêne clair ROMUS94781 (sol souple)", qty:0.65, roundUp:true},
  ]},
  { id:"carrelage", nom:"Carrelage / faïence", fournisseur:"Point P", items:[
    {label:"Carroplâtre hydro (m²)", qty:2},
    {label:"Colle carroplâtre (adaptée à la surface)", qty:1},
    {label:"Faïence blanche 20x20 (m²)", qty:2},
    {label:"Sac joints fins blancs", qty:1},
    {label:"Sac colle faïence", qty:1},
    {label:"Arrêt de faïence PVC blanc", qty:1},
  ]},
  { id:"quincaillerie", nom:"Quincaillerie (Foussier)", fournisseur:"Foussier", items:[
    {label:"Barre rideau de douche", qty:1},
    {label:"Butée de porte", qty:2},
    {label:"Miroir 40x60", qty:1},
  ]},
  { id:"autres", nom:"Autres", fournisseurParItem:true, items:[
    {label:"Sol souple Tradiflor 2S3 Valençay Doré (réf. Forbo 2087)", fournisseur:"Gerflor", qty:1},
  ]},
];
let materielState = { nombreLogements:1, chantierRef:"", outputHtml:"", genOptions:{listes:false, emails:false, recap:false, precommande:false}, codePrecommande:"", devisPdfUrl:null, devisPdfFilename:null };
const PRECOMMANDE_CODE = "2510";

function parseQtyMateriel(v){
  let t = String(v==null?"":v).trim().replace(",",".");
  if(t.indexOf("/")>0){
    const p = t.split("/"); const a = parseFloat(p[0]), b = parseFloat(p[1]);
    return (b>0 && isFinite(a)) ? Math.max(0,a/b) : 0;
  }
  const n = parseFloat(t); return (isFinite(n)&&n>0)?n:0;
}
function stepMaterielQty(catIdx, itemIdx, delta){
  const item = CATEGORIES_MATERIEL[catIdx].items[itemIdx];
  const n = Math.max(0, Math.round(((item.qty||0)+delta)*1e6)/1e6);
  item.qty = n; item.qtyTxt = String(n);
  render();
}
function updateMaterielItem(catIdx, itemIdx, field, value){
  const item = CATEGORIES_MATERIEL[catIdx].items[itemIdx];
  if(field==="qty"){ item.qtyTxt = String(value); item.qty = parseQtyMateriel(value); }
  else if(field==="prix") item[field] = parseFloat(value)||0;
  else if(field==="global" || field==="roundUp") item[field] = !!value;
  else item[field] = value;
  if(field==="qty" || field==="global" || field==="roundUp"){ delete item.totalOverride; recomputeMaterielTotals(); }
}
// Total modifiable à la main (même apparence qu'un texte) : remplace le calcul pour cette ligne.
// Un champ vidé redonne le calcul automatique ; modifier la quantité ou le nombre de logements l'annule aussi.
function updateMaterielTotal(catIdx, itemIdx, value){
  const item = CATEGORIES_MATERIEL[catIdx].items[itemIdx];
  const t = String(value||"").trim();
  if(!t){ delete item.totalOverride; return; }
  if(!/^[0-9.,\/\s]+$/.test(t)) return;
  item.totalOverride = parseQtyMateriel(t);
}
function updateMaterielCatFournisseur(catIdx, value){ CATEGORIES_MATERIEL[catIdx].fournisseur = value; }
function toggleMaterielPrecommande(checked){
  materielState.genOptions.precommande = checked;
  if(!checked){
    materielState.codePrecommande = "";
    if(materielState.devisPdfUrl){ URL.revokeObjectURL(materielState.devisPdfUrl); materielState.devisPdfUrl = null; materielState.devisPdfFilename = null; }
  }
  render();
}
function toggleMaterielCatActive(catIdx, checked){
  CATEGORIES_MATERIEL[catIdx].active = checked;
  render();
}
function updateMaterielLogements(value){
  materielState.nombreLogements = parseInt(value)||1;
  CATEGORIES_MATERIEL.forEach(c=>c.items.forEach(it=>{ delete it.totalOverride; }));
  recomputeMaterielTotals();
}
function computeMaterielItemTotal(item, mult){
  if(item.totalOverride!==undefined && item.totalOverride!==null) return item.totalOverride; // total saisi à la main
  let total = item.global ? (item.qty||0) : (item.qty||0)*mult;
  total += item.extra||0;
  total = Math.round(total*1e6)/1e6;
  if(item.roundUp) total = Math.ceil(total);
  return total;
}
function recomputeMaterielTotals(){
  const mult = Math.max(1, parseInt(materielState.nombreLogements)||1);
  CATEGORIES_MATERIEL.forEach((cat,catIdx)=>{
    cat.items.forEach((item,itemIdx)=>{
      const el = document.getElementById("mtot_"+catIdx+"_"+itemIdx);
      if(el && el!==document.activeElement){ el.value = computeMaterielItemTotal(item, mult); el.style.setProperty("--w", Math.max(1,el.value.length)+"ch"); }
    });
  });
}

function groupBySupplierMateriel(){
  const groups = {};
  const mult = Math.max(1, parseInt(materielState.nombreLogements)||1);
  CATEGORIES_MATERIEL.forEach(cat=>{
    if(cat.active===false) return;
    cat.items.forEach(item=>{
      const fournisseur = (cat.fournisseurParItem ? item.fournisseur : cat.fournisseur) || "Fournisseur à préciser";
      const totalQty = computeMaterielItemTotal(item, mult);
      if(totalQty<=0) return;
      if(!groups[fournisseur]) groups[fournisseur] = [];
      groups[fournisseur].push({label:item.label, qty:totalQty});
    });
  });
  return groups;
}

function generateMateriel(){
  const groups = groupBySupplierMateriel();
  let html = "";
  const suppliers = Object.keys(groups).sort();
  const mult = Math.max(1, parseInt(materielState.nombreLogements)||1);
  const sectionTitle = (txt)=> '<h2 style="font-size:21px;font-weight:800;color:#fff;background:var(--accent);padding:10px 14px;border-radius:8px;margin:26px 0 14px;">'+esc(txt)+'</h2>';

  if(materielState.genOptions.recap){
    html += sectionTitle("① Récapitulatif — validation sous-traitant"+(mult>1?" (× "+mult+" logements)":""));
    const lignes = [];
    CATEGORIES_MATERIEL.forEach(cat=>{
      if(cat.active===false) return;
      const itemsAvecQte = cat.items.filter(it=>computeMaterielItemTotal(it, mult)>0);
      if(!itemsAvecQte.length) return;
      lignes.push("**"+cat.nom.toUpperCase()+"**");
      itemsAvecQte.forEach(it=> lignes.push("- "+it.label+" : "+computeMaterielItemTotal(it, mult)));
      lignes.push("");
    });
    const text = "Récapitulatif matériel"+(materielState.chantierRef?" — "+materielState.chantierRef:"")+"\nMerci de valider les quantités ci-dessous.\n\n"+lignes.join("\n").trim();
    html += outputBlockListMateriel("Récapitulatif (à valider par le sous-traitant)", text);
  }
  if(materielState.genOptions.emails){
    html += sectionTitle("② Mails de demande de prix"+(mult>1?" (× "+mult+" logements)":""));
    suppliers.forEach(f=>{
      const lines = groups[f].map(it=>"- "+it.label+" : "+it.qty).join("\n");
      const subject = "Demande de prix"+(materielState.chantierRef?" — chantier "+materielState.chantierRef:"");
      const body = "Bonjour,\n\nPourriez-vous me transmettre un devis pour les articles suivants :\n\n"+lines+
        "\n\nMerci de votre retour rapide.";
      html += outputBlockEmailMateriel(f, subject, body);
    });
  }
  if(materielState.genOptions.listes){
    html += sectionTitle("③ Listes par fournisseur"+(mult>1?" (× "+mult+" logements)":""));
    suppliers.forEach(f=>{
      const lines = groups[f].map(it=>"- "+it.label+" : "+it.qty).join("\n");
      const text = "Fournisseur : "+f+(materielState.chantierRef?"\nChantier / réf. : "+materielState.chantierRef:"")+"\n\n"+lines;
      html += outputBlockListMateriel(f, text);
    });
  }
  if(materielState.genOptions.precommande){
    html += sectionTitle("④ Liste de commande plomberie");
    if(materielState.codePrecommande !== PRECOMMANDE_CODE){
      html += '<div class="st-card" style="border-color:#C0392B;"><strong style="color:#C0392B;">Code incorrect.</strong>'+
        '<p style="font-size:13px;color:var(--muted);margin-top:6px;">Saisissez le code d\'accès ci-dessus pour générer le bon de commande plomberie.</p></div>';
    } else {
      try{
        generateDevisPlomberiePDF(mult);
        autoOpenPdf(materielState.devisPdfUrl, materielState.devisPdfFilename);
        let missingWarning = "";
        if(materielState.devisMissingPrix && materielState.devisMissingPrix.length){
          missingWarning = '<div class="st-card" style="border-color:#C45A00;background:#FFF6E9;margin-bottom:10px;"><strong style="color:#C45A00;">⚠ Prix manquant pour '+materielState.devisMissingPrix.length+' article(s)</strong>'+
            '<p style="font-size:13px;color:var(--muted);margin:6px 0 0;">Le bon de commande est généré mais incomplet (marqué "MANQUANT") pour : '+esc(materielState.devisMissingPrix.join(", "))+'.</p></div>';
        }
        html += missingWarning+'<div class="st-card"><strong>Liste de commande plomberie prête</strong>'+
          '<p style="font-size:13px;color:var(--muted);margin:6px 0 10px;">Chantier : '+esc(materielState.chantierRef||"—")+(mult>1?" — × "+mult+" logements":"")+'</p>'+
          '<a class="btn" style="display:inline-block;text-decoration:none;" href="'+materielState.devisPdfUrl+'" download="'+esc(materielState.devisPdfFilename)+'" target="_blank" rel="noopener">⬇ Ouvrir / télécharger le PDF</a></div>';
      }catch(e){
        console.error(e);
        html += '<div class="st-card" style="border-color:#C0392B;"><strong style="color:#C0392B;">Erreur lors de la génération :</strong> '+esc(e.message)+'</div>';
      }
    }
  }
  if(!materielState.genOptions.listes && !materielState.genOptions.emails && !materielState.genOptions.recap && !materielState.genOptions.precommande){
    html = '<p style="color:var(--muted);font-size:13px;">Cochez au moins une option avant de générer.</p>';
  }
  materielState.outputHtml = html;
  render();
  setTimeout(()=>{ const el=document.getElementById("materiel-resultats"); if(el) el.scrollIntoView({behavior:"smooth"}); }, 50);
}

function generateDevisPlomberiePDF(mult){
  if(!window.jspdf) throw new Error("Bibliothèque PDF non chargée — vérifiez la connexion et réessayez.");
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ unit:"mm", format:"a4" });
  const D = new Doc(pdf);
  D.showFooter = false;
  D.newPage();
  D.header("LISTE DE COMMANDE PLOMBERIE", "Chantier "+(materielState.chantierRef||"—")+" — à transmettre au fournisseur pour chiffrage du total");

  const today = new Date();
  const dateStr = String(today.getDate()).padStart(2,"0")+"/"+String(today.getMonth()+1).padStart(2,"0")+"/"+today.getFullYear();
  D.keyValueRow([["Chantier / réf.", materielState.chantierRef||"—"], ["Date", dateStr]]);
  D.keyValueRow([["Fournisseur", "SFCP"], ["Logements", String(mult)]]);
  D.y += 2;

  const plomberie = CATEGORIES_MATERIEL.find(c=>c.id==="plomberie");
  const rows = [];
  const missing = [];
  let totalHT = 0;
  (plomberie ? plomberie.items : []).forEach(item=>{
    const qty = computeMaterielItemTotal(item, mult);
    if(qty<=0) return;
    const pu = item.prix||0;
    const missingPrix = !pu;
    if(missingPrix) missing.push(item.label);
    const ligneHT = qty*pu;
    totalHT += ligneHT;
    rows.push([item.ref||"—", item.label, String(qty), missingPrix?"MANQUANT":pu.toFixed(2), ligneHT.toFixed(2)]);
  });
  materielState.devisMissingPrix = missing;

  if(missing.length){
    const msg = "ATTENTION — Prix manquant pour "+missing.length+" article(s) : devis incomplet tant qu'ils ne sont pas renseignés : "+missing.join(", ");
    pdf.setFont("helvetica","bold"); pdf.setFontSize(SZ.body-1);
    const innerW = D.contentW-10;
    const lines = pdf.splitTextToSize(msg, innerW);
    const boxH = 4.6*lines.length + 6;
    D.ensureSpace(boxH+4);
    pdf.setFillColor(255,235,235); pdf.setDrawColor(210,0,0);
    pdf.rect(D.margin, D.y, D.contentW, boxH, "FD");
    pdf.setTextColor(210,0,0);
    lines.forEach((l,i)=> pdf.text(l, D.margin+5, D.y+5.2+i*4.6));
    D.y += boxH + 4;
    pdf.setTextColor(30,30,30); pdf.setFont("helvetica","normal");
  }

  D.subheading("Détail des articles");
  D.table(
    ["Réf.","Désignation","Qté","PU HT (EUR)","Total HT (EUR)"],
    rows,
    [26, D.contentW-26-16-30-30, 16, 30, 30],
    ["left","left","right","right","right"]
  );

  D.y += 2;
  D.ensureSpace(15);
  const p = pdf;
  const boxW = 74, boxX = D.margin+D.contentW-boxW;
  p.setDrawColor(210,206,199);
  p.rect(boxX, D.y, boxW, 11, "S");
  p.setFont("helvetica","bold"); p.setFontSize(SZ.body); p.setTextColor(30,30,30);
  p.text("Total HT", boxX+4, D.y+7); p.text(totalHT.toFixed(2)+" EUR", boxX+boxW-4, D.y+7, {align:"right"});
  D.y += 15;

  const safeRef = (materielState.chantierRef||"chantier").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\-]+/gi,"_").replace(/^_+|_+$/g,"");
  const filename = "Commande_plomberie_"+safeRef+".pdf";
  const blob = pdf.output("blob");
  if(materielState.devisPdfUrl) URL.revokeObjectURL(materielState.devisPdfUrl);
  materielState.devisPdfUrl = URL.createObjectURL(blob);
  materielState.devisPdfFilename = filename;
}

function outputBlockListMateriel(title, text){
  const taId = "mta_"+Math.random().toString(36).slice(2,9);
  return '<div class="st-card"><strong>'+esc(title)+'</strong>'+
    '<textarea id="'+taId+'" readonly style="width:100%;min-height:130px;margin-top:8px;border:1px solid var(--border);border-radius:7px;padding:10px;font-family:\'Courier New\',monospace;font-size:12.5px;line-height:1.5;">'+esc(text)+'</textarea>'+
    '<div style="margin-top:8px;"><button class="btn secondary" style="padding:6px 12px;font-size:12.5px;" onclick="copyBlockMateriel(\''+taId+'\', this)">Copier</button>'+
    '<span class="copied-msg-materiel" style="display:none;color:#2F7A4D;font-size:12px;font-weight:600;margin-left:8px;">Copié !</span></div></div>';
}
function outputBlockEmailMateriel(fournisseur, subject, body){
  const subjId = "msubj_"+Math.random().toString(36).slice(2,9);
  const bodyId = "mbody_"+Math.random().toString(36).slice(2,9);
  return '<div class="st-card">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;">'+
      '<strong>'+esc(fournisseur)+'</strong>'+
      '<div style="text-align:right;">'+
        '<input id="'+subjId+'" type="text" readonly value="'+esc(subject)+'" style="border:1px solid var(--border);border-radius:6px;padding:5px 8px;font-size:12.5px;width:240px;text-align:right;">'+
        ' <button class="btn secondary" style="padding:6px 10px;font-size:12px;" onclick="copyInputMateriel(\''+subjId+'\', this)">Copier objet</button>'+
        '<span class="copied-msg-materiel" style="display:none;color:#2F7A4D;font-size:12px;font-weight:600;">Copié !</span>'+
      '</div>'+
    '</div>'+
    '<textarea id="'+bodyId+'" readonly style="width:100%;min-height:120px;margin-top:8px;border:1px solid var(--border);border-radius:7px;padding:10px;font-family:\'Courier New\',monospace;font-size:12.5px;line-height:1.5;">'+esc(body)+'</textarea>'+
    '<div style="margin-top:8px;"><button class="btn secondary" style="padding:6px 12px;font-size:12.5px;" onclick="copyBlockMateriel(\''+bodyId+'\', this)">Copier le corps du mail</button>'+
    '<span class="copied-msg-materiel" style="display:none;color:#2F7A4D;font-size:12px;font-weight:600;margin-left:8px;">Copié !</span></div></div>';
}
function copyBlockMateriel(taId, btn){
  const ta = document.getElementById(taId);
  ta.select();
  try{ navigator.clipboard.writeText(ta.value); }catch(e){ try{ document.execCommand("copy"); }catch(e2){} }
  const msg = btn.nextElementSibling;
  if(msg){ msg.style.display = "inline"; setTimeout(()=>msg.style.display="none", 1500); }
}
function copyInputMateriel(inputId, btn){
  const inp = document.getElementById(inputId);
  inp.select();
  try{ navigator.clipboard.writeText(inp.value); }catch(e){ try{ document.execCommand("copy"); }catch(e2){} }
  const msg = btn.nextElementSibling;
  if(msg){ msg.style.display = "inline"; setTimeout(()=>msg.style.display="none", 1500); }
}

function renderCategoryMateriel(cat, catIdx){
  const mult = Math.max(1, parseInt(materielState.nombreLogements)||1);
  const active = cat.active!==false;
  let h = '<div class="st-card">'+
    '<div class="cat-head">'+
    '<strong>'+esc(cat.nom)+'</strong>'+
    '<label class="cat-need"><input type="checkbox" '+(active?"checked":"")+' onchange="toggleMaterielCatActive('+catIdx+', this.checked)"> Nécessaire pour ce chantier</label>'+
    '</div>';
  if(!active){
    h += '<p class="small-note" style="margin-top:8px;">Catégorie désactivée — exclue des listes, mails, récapitulatif et totaux.</p></div>';
    return h;
  }
  if(!cat.fournisseurParItem){
    h += '<div class="cat-four">Fournisseur : <input type="text" value="'+esc(cat.fournisseur||"")+'" oninput="updateMaterielCatFournisseur('+catIdx+', this.value)" placeholder="ex. REXEL"></div>';
  }
  const showRefPrix = cat.id==="plomberie";
  h += '<table class="mt"><tr class="mt-head">'+
    '<th class="c-art">Article</th><th class="c-qty">Qté</th><th class="c-tot">Total</th>'+
    (cat.fournisseurParItem?'<th>Fournisseur</th>':'')+
    (showRefPrix?'<th class="c-ref">Réf.</th><th class="c-ref">Prix HT (€)</th>':'')+
    '</tr>';
  cat.items.forEach((item,itemIdx)=>{
    h += '<tr><td class="art"><input class="i-lab" type="text" value="'+esc(item.label)+'" oninput="updateMaterielItem('+catIdx+','+itemIdx+',\'label\',this.value)"></td>';
    h += '<td class="qty"><div class="qwrap"><button type="button" class="qb" onclick="stepMaterielQty('+catIdx+','+itemIdx+',-1)">−</button><input class="qi" type="text" inputmode="decimal" value="'+esc(item.qtyTxt!==undefined?item.qtyTxt:item.qty)+'" oninput="updateMaterielItem('+catIdx+','+itemIdx+',\'qty\',this.value)"><button type="button" class="qb" onclick="stepMaterielQty('+catIdx+','+itemIdx+',1)">+</button></div></td>';
    h += '<td class="tot"><input class="ti" id="mtot_'+catIdx+'_'+itemIdx+'" type="text" inputmode="decimal" value="'+computeMaterielItemTotal(item, mult)+'" style="--w:'+String(computeMaterielItemTotal(item, mult)).length+'ch" onfocus="this.select()" oninput="this.style.setProperty(\'--w\',Math.max(1,this.value.length)+\'ch\');updateMaterielTotal('+catIdx+','+itemIdx+',this.value)" onblur="recomputeMaterielTotals()"></td>';
    if(cat.fournisseurParItem){
      h += '<td class="fo" data-l="Fournisseur"><input class="i-sm" type="text" value="'+esc(item.fournisseur||"")+'" oninput="updateMaterielItem('+catIdx+','+itemIdx+',\'fournisseur\',this.value)"></td>';
    }
    if(showRefPrix){
      if(item.custom){
        h += '<td class="rf" data-l="Réf."><input class="i-sm" type="text" value="'+esc(item.ref||"")+'" oninput="updateMaterielItem('+catIdx+','+itemIdx+',\'ref\',this.value)" placeholder="Code article"></td>';
        h += '<td class="rf" data-l="Prix HT (€)"><input class="i-sm i-px" type="number" min="0" step="0.01" value="'+esc(item.prix||0)+'" oninput="updateMaterielItem('+catIdx+','+itemIdx+',\'prix\',this.value)"></td>';
      } else {
        h += '<td class="rf dash">—</td><td class="rf dash">—</td>';
      }
    }
    h += '</tr>';
  });
  h += '</table>';
  h += '<button class="btn secondary add-art" onclick="addMaterielItem('+catIdx+')">+ Ajouter un article</button>';
  h += '</div>';
  return h;
}
function addMaterielItem(catIdx){
  const cat = CATEGORIES_MATERIEL[catIdx];
  const newItem = { label:"Nouvel article", qty:1 };
  if(cat.fournisseurParItem) newItem.fournisseur = "";
  if(cat.id==="plomberie"){ newItem.ref = ""; newItem.prix = 0; newItem.custom = true; }
  cat.items.push(newItem);
  render();
}

function field(label, value, key, placeholder, type){
  type = type||"text";
  return '<div class="field"><label>'+esc(label)+'</label><input type="'+type+'" value="'+esc(value)+'" placeholder="'+esc(placeholder||"")+'" oninput="updateDossier(\''+key+'\', this.value)"></div>';
}

function stField(id,label,key,value,type){
  type = type||"text";
  return '<div class="field"><label>'+esc(label)+'</label><input type="'+type+'" value="'+esc(value)+'" oninput="updateST(\''+id+'\',\''+key+'\',this.value)"></div>';
}

function previewField(id,label,key,value){
  return '<div class="field"><label>'+esc(label)+'</label><textarea rows="3" oninput="updatePreviewField(\''+id+'\',\''+key+'\',this.value)">'+esc(value)+'</textarea></div>';
}

function renderAdminGate(){
  const first = !CONFIG.adminCodeHash;
  return '<div class="card" style="max-width:420px;margin:30px auto;"><h2>Réglages</h2>'+
    '<p class="hint">'+(first ? 'Aucun code administrateur n\'est encore défini. Choisissez-en un (4 caractères ou plus). Il sera demandé à chaque ouverture des réglages.' : 'Saisissez le code administrateur.')+'</p>'+
    '<div class="field"><input type="password" id="adm-code" placeholder="Code administrateur" onkeydown="if(event.key===\'Enter\')submitAdminCode()" autocomplete="off"></div>'+
    (adminError? '<div class="error-msg">'+esc(adminError)+'</div>' : '')+
    '<div class="row-actions"><button class="btn secondary" onclick="toggleSettings()">Annuler</button><button class="btn" onclick="submitAdminCode()">'+(first?'Définir le code':'Entrer')+'</button></div></div>';
}
function selId(list, key){ return (list.find(x=>x.id===settingsSel[key]) || list[0] || {}).id; }
function setSel(key, id){ settingsSel[key] = id; render(); }
function isModified(section, item){
  try{ const d = (SETTINGS_DEFAULTS[section]||[]).find(x=>x.id===item.id); return !d || JSON.stringify(d)!==JSON.stringify(item); }catch(e){ return false; }
}
function listCol(section, list, key, labelFn){
  const cur = selId(list,key);
  return '<div class="adm-list">'+list.map(x=>'<div class="'+(x.id===cur?'on':'')+'" onclick="setSel(\''+key+'\',\''+x.id+'\')">'+esc(labelFn(x))+(isModified(section,x)?' <span class="mod">modifié</span>':'')+'</div>').join('')+'</div>';
}
function admField(label, inner){ return '<div class="field"><label>'+label+'</label>'+inner+'</div>'; }
function td(inner){ return '<td>'+inner+'</td>'; }

