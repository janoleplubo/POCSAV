function defaultConfig(){
  return {
    accessCode: "2104",
    epi: [
      {id:"chaussures", nom:"Chaussures de sécurité", statut:"systematique"},
      {id:"gants", nom:"Gants", statut:"conditionnel"},
      {id:"casque", nom:"Casque", statut:"conditionnel"},
      {id:"lunettes", nom:"Lunettes", statut:"conditionnel"},
      {id:"masque", nom:"Masque anti-poussière", statut:"conditionnel"},
      {id:"impermeables", nom:"Vêtements imperméables", statut:"conditionnel"},
      {id:"adaptes", nom:"Vêtements adaptés", statut:"conditionnel"},
      {id:"auditives", nom:"Protections auditives", statut:"conditionnel"}
    ],
    risques: [
      {id:"chaleur", nom:"Fortes chaleurs", declencheSi:"Fortes chaleurs",
       epi:[], equipements:"—",
       consignes:"Boire de l'eau souvent, même sans soif. Malaise, crampes, nausées : s'arrêter, aller à l'ombre, prévenir.",
       themeQuartHeure:null},
      {id:"elecNonConsigne", nom:"Électricité non consignée", declencheSi:"Travaux dans un logement ou un bâtiment où l'électricité n'est pas coupée",
       epi:["gants"], equipements:"—",
       consignes:"Courant non coupé : ne pas percer ni casser un mur sans savoir où passent les fils.\nNe jamais toucher un fil inconnu.\nÉlectricien habilité uniquement. Outils isolés.",
       themeQuartHeure:null},
      {id:"gazAlimente", nom:"Réseau gaz alimenté", declencheSi:"Réseau de gaz en service dans le bâtiment",
       epi:[], equipements:"—",
       consignes:"Gaz en service : pas de flamme, de soudure, d'étincelle ni de disqueuse près des tuyaux.\nNe pas percer ni casser un mur sans savoir où passent les tuyaux.\nOdeur de gaz : aucun interrupteur. Ouvrir les fenêtres. Sortir. Appeler le 18, puis GRDF : 0 800 47 33 33.",
       themeQuartHeure:null},
      {id:"siteOccupe", nom:"Site occupé", declencheSi:"Des habitants sont présents dans le bâtiment pendant les travaux",
       epi:[], equipements:"—",
       consignes:"Habitants présents. Passages libres. Portes fermées derrière vous.\nNe jamais laisser un outil ou un produit sans surveillance.\nRespecter les horaires de bruit. Problème avec un habitant : prévenir le conducteur de travaux.",
       themeQuartHeure:null},
      {id:"hauteur", nom:"Travail en hauteur", declencheSi:"Échafaudage roulant, intervention en toiture",
       epi:["casque"], equipements:"Gazelle, échafaudage roulant (ER)",
       consignes:"Escabeau **interdit**. Gazelle autorisée. Échafaudage roulant monté par du personnel formé uniquement.",
       themeQuartHeure:"Travail en hauteur : gazelles autorisées, escabeaux interdits, échafaudage roulant (ER) monté par du personnel formé."},
      {id:"amiante", nom:"Amiante", declencheSi:"Présence d'amiante signalée dans le logement",
       epi:["masque"], equipements:"—",
       consignes:"Avant d'intervenir : vérifier le DTA (dossier amiante) et la certification de l'entreprise.",
       themeQuartHeure:"Amiante : vérifier le DTA du logement et la certification de l'entreprise avant intervention."},
      {id:"plomb", nom:"Plomb", declencheSi:"Bâtiment ancien, présence de plomb signalée",
       epi:["masque","gants"], equipements:"—",
       consignes:"Interdit de poncer, percer ou toucher un matériau plombé sans formation.",
       themeQuartHeure:"Plomb : vérifier la présence de plomb avant ponçage/décapage ; retrait par une entreprise qualifiée uniquement."},
      {id:"electrique", nom:"Électrique", declencheSi:"Intervention sur réseau électrique (dépose/pose/mise aux normes)",
       epi:["gants"], equipements:"—",
       consignes:"Habilitation électrique obligatoire. Couper et cadenasser avant d'intervenir.",
       themeQuartHeure:"Électrique : habilitation obligatoire et consignation avant toute intervention sur le réseau."},
      {id:"coactivite", nom:"Coactivité", declencheSi:"Plusieurs corps d'état présents simultanément sur le chantier",
       epi:[], equipements:"—",
       consignes:"Prévenir le chef d'équipe ou le conducteur de travaux avant de travailler à côté d'une autre équipe.",
       themeQuartHeure:"Coactivité : coordonner toute intervention avec les autres équipes présentes sur le chantier."},
      {id:"chimique", nom:"Produits chimiques / CMR", declencheSi:"Usage de colles, résines, décapants, produits classés",
       epi:["masque","gants"], equipements:"—",
       consignes:"Aérer la zone. Garder les fiches de sécurité des produits sur place.",
       themeQuartHeure:"Produits chimiques : stockage fermé à l'écart de la chaleur, zone ventilée pendant l'usage."},
      {id:"confine", nom:"Espace confiné", declencheSi:"Intervention en espace non ventilé ou de faible volume",
       epi:["masque"], equipements:"—",
       consignes:"Aération obligatoire. Ne jamais travailler seul.",
       themeQuartHeure:"Espace confiné : ventilation obligatoire, ne jamais travailler seul."},
      {id:"poussiere", nom:"Poussières / découpe", declencheSi:"Usage de disqueuse, meuleuse, carottage",
       epi:["masque","lunettes","auditives"], equipements:"Aspirateur de chantier",
       consignes:"Arroser ou aspirer à la source.",
       themeQuartHeure:null}
    ],
    corpsDeMetier: [
      {id:"peinture", nom:"Reprise enduits et peinture",
       nature:"Remise en état esthétique des supports dégradés après infiltration : enduits et revêtements de peinture\nReprise des enduits, ponçage, impression, peinture de finition\nPose de plinthes blanches",
       utilises:"Spatules, grattoirs, couteaux à enduire\nBrosses métalliques et abrasifs\nAspirateur ou balayette\nEnduit de rebouchage / lissage (prêt à l'emploi ou équivalent)\nPeinture de finition (mat, velours ou satin selon l'existant)\nRouleaux, pinceaux, bacs à peinture\nPlinthes blanches\nProtections de sols et mobiliers (bâches, adhésifs)",
       produits:"XXXX",
       outillage:"XXXX",
       risquesTexte:"## À compléter\n- XXXX",
       etapes:["Protéger les sols, menuiseries, équipements et mobiliers situés à proximité des zones d'intervention, y compris les parties communes (zones circulables).","Gratter et purger les éléments dégradés pour éliminer toutes les peintures cloquées, écaillées ou non adhérentes, jusqu'à obtenir un support sain, sec et cohérent.","Éliminer poussières, laitances et débris par soufflage ou aspiration.","Reconstituer les supports avec un enduit de rebouchage sur les zones purgées, puis laisser sécher selon les préconisations du fabricant.","Appliquer un enduit de lissage pour obtenir une surface plane et homogène, puis poncer soigneusement après séchage.","Appliquer une couche d'impression et une couche de finition générale pour uniformiser les fonds et assurer une bonne adhérence des finitions.","Nettoyer le chantier et évacuer les protections en fin d'intervention."],
       epi:[], epiXXXX:true, risques:[], coll:["rubalise"], form:[]},
      {id:"faience", nom:"Pose de faïence murale",
       nature:"Pose de carreaux de faïence muraux intérieurs, en local sec ou humide\nRéalisation des joints\nFinitions et nettoyage",
       utilises:"Carreaux de faïence\nColle C1 ou C2S selon le local et le type de carreaux\nMortier-joint adapté (hydrofuge en local humide)\nPrimaire si le support est poreux\nCroisillons, règle, niveau\nÉponge",
       produits:"XXXX",
       outillage:"XXXX",
       risquesTexte:"## À compléter\n- XXXX",
       etapes:["Préparation du support : nettoyer le mur (dépoussiérage, grattage si besoin) et appliquer un primaire si le support est poreux.","Calepinage et traçage : définir l'alignement horizontal et vertical, prévoir des coupes symétriques aux extrémités.","Pose des carreaux : colle C1 ou C2S selon le local ; double encollage pour les carreaux de 30 × 30 cm et plus ou en zone humide ; croisillons pour la régularité des joints ; contrôle permanent de l'aplomb et de la planéité.","Joints : attendre le séchage de la colle (24 h), appliquer le mortier-joint adapté (hydrofuge en local humide), nettoyer à l'éponge humide.","Réception et nettoyage : vérifier l'alignement, la régularité des joints et des coupes ; nettoyage final et remise en état du chantier."],
       epi:[], epiXXXX:true, risques:[], coll:["rubalise"], form:[]},
      {id:"voile", nom:"Venue d'eau dans un voile béton en sous-sol",
       nature:"Colmatage / rebouchage des venues d'eau\nReprofilage de la zone béton\nÉtanchéité complémentaire",
       utilises:"Sika® Plug : mortier à prise ultra-rapide\nSika® MonoTop-412 : mortier de reprofilage\nSikaTop® Seal-107 : revêtement d'imperméabilisation",
       produits:"XXXX",
       outillage:"XXXX",
       risquesTexte:"## À compléter\n- XXXX",
       etapes:["Repérer la fuite et délimiter précisément la zone humide.","Piquer localement (3 à 5 cm) pour l'ancrage du mortier.","Nettoyer et humidifier le support (sans ruissellement).","Préparer le produit selon la notice (petites quantités, pâte ferme).","Appliquer immédiatement et maintenir sous pression manuelle 2 à 3 min.","Vérifier l'étanchéité, reprendre si nécessaire.","Reprofiler la zone avec un mortier étanche.","Appliquer une protection d'imperméabilisation."],
       epi:[], epiXXXX:true, risques:[], coll:["rubalise","barriere"], form:[]},
      {id:"fissure", nom:"Traitement de fissure et étanchéité",
       nature:"Colmatage / rebouchage\nReprofilage de la zone béton\nÉtanchéité complémentaire",
       utilises:"Sika® Plug ou équivalent : mortier à prise rapide\nFlashing Alezan : résine d'étanchéité\nPinceau / rouleau\nCREPI SEAL maelstrom ou équivalent : joint mastic\nMeuleuse\nProtection usuelle (meuleuse)",
       produits:"Sika® Plug ou équivalent : mortier à prise rapide\nFlashing Alezan : résine d'étanchéité\nCREPI SEAL maelstrom ou équivalent : joint mastic",
       outillage:"Meuleuse avec sa protection usuelle",
       risquesTexte:"## Ventilation\n- Ventiler la zone d'intervention si elle n'est pas à l'air libre.",
       etapes:["Décaper les fissures sur toute leur longueur, y compris au pied de l'édicule si nécessaire.","Ouvrir légèrement la fissure (largeur 5 à 10 mm).","Éliminer poussières, laitances et débris par soufflage ou aspiration.","Si l'étanchéité est en place sur la zone fissurée, la déposer localement pour réfection / traitement.","Remplir la fissure avec du mastic polyuréthane et un fond de joint.","Reboucher à l'enduit.","Lisser en surface pour obtenir une zone propre et régulière.","Reprendre les relevés d'étanchéité si besoin et les joints des solins au pourtour des édicules."],
       epi:["gants","lunettes","masque","impermeables"], risques:[], coll:["barriere","rubalise"], form:["harnais"]}
    ],
    socleQuartHeure: [],
    textes: {
      contraintesSite: "XXXX",
      attestation:
        "Chaque compagnon, en signant ci-dessous, atteste avoir reçu et compris les consignes techniques et de sécurité liées à cette intervention, et s'engage à les respecter."
    }
  };
}

/* =========================================================================
   ÉTAT GLOBAL
   ========================================================================= */
function makeSousTraitant(){
  return {
    id: uid("st"), entreprise:"", contactNom:"", contactTel:"", nbOuvriers:"",
    dateDebut:"", dateFin:"", metiers:[], risques:[], amianteNote:"", compagnons:[],
    preview:null, customNom:"", customNature:"", customProduits:"", customOutillage:"", customEtapes:""
  };
}

const DEFAULT_SITE_INTERVENTION_CASVP =
  "Opération « coup de poing » : rénovation d'appartements dans une résidence seniors occupée.\n"+
  "Dans chaque logement, nous déposons tout l'existant (murs, sols, électricité, appareils sanitaires), puis nous remettons tout à neuf.\n"+
  "Objectif : un logement neuf et plus de punaises de lit, grâce à la dépose de tout ce qui est en bois.\n"+
  "Travaux logement par logement. Les résidents sont présents dans l'immeuble : site occupé.";
function makeDossier(){
  return {
    docs:{ fiche:true, quartHeure:true, affichages:false, urgence:false, materiel:false }, chrono:"", natureTravaux:"", contactSite:"", nbComp:"2", tel:(function(){ try{ return localStorage.getItem("sav_tel")||""; }catch(e){ return ""; } })(),
    siteIntervention: "",
    affaire:"", nomChantier:"", adresse:"", cdtNom:(function(){ try{ return localStorage.getItem("sav_cdt")||""; }catch(e){ return ""; } })(), codeAcces:"", dateDebut:defaultStartDate(), dateFin:"", nbZones:1,
    sousTraitants:[ makeSousTraitant() ],
    quartHeure:{ participants:[], presentateur:"", supportPar:"", themesText:"", groupe:"", sig:"", siteLine:"" },
    risquesSpec:{ amiante:false, plomb:false, coactivite:false, chaleur:false, elecNonConsigne:false, gazAlimente:false, siteOccupe:false }
  };
}
const STEP_LABELS = {
  select: "Documents", chantier: "Chantier", "sous-traitants": "Modes opératoires", apercu: "Aperçu", pdf: "PDF et signatures"
};
function activeStepKeys(){ return dossier.docs.fiche ? ["select","chantier","sous-traitants","apercu","pdf"] : ["select","chantier","apercu","pdf"]; }
const SAV_VERSION = "V16";
function computePreview(st){
  const metiers = CONFIG.corpsDeMetier.filter(m => st.metiers.includes(m.id));
  const natureM = metiers.filter(m=>m.nature);
  const nature = natureM.length>1 ? natureM.map(m=>m.nom+" :\n"+m.nature).join("\n\n") : natureM.map(m=>m.nature).join("");

  function groupedField(fieldName){
    const withField = metiers.filter(m => m[fieldName]);
    if(withField.length > 1){
      return withField.map(m => m.nom+" :\n"+m[fieldName]).join("\n\n");
    } else if(withField.length === 1){
      return withField[0][fieldName];
    }
    return "";
  }
  const utilises = groupedField("utilises");
  const produits = groupedField("produits");
  const outillage = groupedField("outillage");

  const metiersAvecEtapes = metiers.filter(m => (m.etapes||[]).length);
  let etapesText;
  if(metiersAvecEtapes.length > 1){
    etapesText = metiersAvecEtapes
      .map(m => m.nom+" :\n"+m.etapes.map((e,i)=>(i+1)+". "+e).join("\n"))
      .join("\n\n");
  } else if(metiersAvecEtapes.length === 1){
    etapesText = metiersAvecEtapes[0].etapes.map((e,i)=>(i+1)+". "+e).join("\n");
  } else {
    etapesText = "";
  }

  const epiNom = id=>{ const e = CONFIG.epi.find(x=>x.id===id); return e?e.nom:null; };
  const epiLines = ["Chaussures de sécurité"];
  metiers.forEach(m=>{
    const names = (m.epi||[]).filter(i=>i!=="chaussures").map(epiNom).filter(Boolean);
    if(names.length) epiLines.push((metiers.length>1 ? m.nom : "Pour vos travaux")+" : "+names.join(", "));
    else if(m.epiXXXX) epiLines.push((metiers.length>1 ? m.nom : "Pour vos travaux")+" : XXXX");
  });
  { const deja = new Set(); metiers.forEach(m=>(m.epi||[]).forEach(e=>deja.add(e)));
    const sup = new Set();
    st.risques.forEach(rid=>{ const r = CONFIG.risques.find(x=>x.id===rid); if(r) (r.epi||[]).forEach(e=>{ if(e!=="chaussures" && !deja.has(e)) sup.add(e); }); });
    const names = [...sup].map(epiNom).filter(Boolean);
    if(names.length) epiLines.push("Selon les risques du chantier : "+names.join(", ")); }
  const epiText = epiLines.join("\n");

  const risqueObjs = st.risques.map(rid=>CONFIG.risques.find(r=>r.id===rid)).filter(Boolean);
  const risquesChantierText = risqueObjs.filter(r=>r.consignes).map(r=>"## "+r.nom+"\n"+splitLinesArr(r.consignes).map(l=>"- "+l.replace(/^- /,"")).join("\n")).join("\n");
  const metiersR = metiers.filter(m=>m.risquesTexte && m.risquesTexte.trim());
  const risquesMetierText = metiersR.map(m=>splitLinesArr(m.risquesTexte).map(l=> (metiersR.length>1 && l.startsWith("## ")) ? "## "+m.nom+" : "+l.slice(3) : l).join("\n")).join("\n");
  const precautionsText = CONFIG.textes.precautions || "";

  return {
    nature: nature || "—",
    utilises: utilises || "—",
    produits: produits || "Aucun produit dangereux.",
    outillage: outillage || "Aucun outil dangereux.",
    etapesText: etapesText || "—",
    epiText: epiText,
    risquesChantierText: risquesChantierText,
    precautionsText: "",
    risquesMetierText: risquesMetierText,
    risquesNames: risqueObjs.map(r=>r.nom),
    coll: (function(){ const o={}; metiers.forEach(m=>(m.coll||[]).forEach(k=>o[k]=true)); return o; })(),
    form: (function(){ const o={}; metiers.forEach(m=>(m.form||[]).forEach(k=>o[k]=true)); return o; })()
  };
}
const SAV_COLL = [{id:"barriere",nom:"Barrière de police"},{id:"rubalise",nom:"Rubalise"},{id:"homme",nom:"Homme trafic"},{id:"cones",nom:"Cônes de signalisation"}];
const SAV_FORM = [{id:"caces",nom:"CACES"},{id:"echafaudage",nom:"Échafaudage"},{id:"ss4",nom:"SS4"},{id:"harnais",nom:"Port du harnais"}];
function todayFr(){ const d=new Date(); const p=n=>String(n).padStart(2,"0"); return p(d.getDate())+"/"+p(d.getMonth()+1)+"/"+d.getFullYear(); }
function savChecks(D, list, state){
  const p=D.pdf; p.setFont("helvetica","normal"); p.setFontSize(10);
  let x=D.margin+FICHE_TH.base; D.ensureSpace(7);
  list.forEach(it=>{
    const w=p.getTextWidth(it.nom)+11;
    if(x+w>D.pageW-D.margin){ x=D.margin+FICHE_TH.base; D.y+=6.4; D.ensureSpace(7); }
    p.setDrawColor(40,40,40); p.setLineWidth(0.3); p.rect(x,D.y-3.3,3.6,3.6,"S");
    if(state&&state[it.id]){ p.setDrawColor(234,79,0); p.setLineWidth(0.7); p.line(x+0.7,D.y-1.4,x+1.6,D.y-0.4); p.line(x+1.6,D.y-0.4,x+3.1,D.y-2.9); }
    p.setLineWidth(0.2); p.setTextColor(0,0,0); p.text(it.nom,x+5.4,D.y); x+=w+3;
  });
  D.y+=8;
}
function prevChecks(st, list, key){
  return '<div class="check-grid">'+list.map(x=>'<label class="check-item"><input type="checkbox" '+((st.preview[key]||{})[x.id]?"checked":"")+' onchange="tickPrev(\''+st.id+'\',\''+key+'\',\''+x.id+'\',this)">'+esc(x.nom)+'</label>').join("")+'</div>';
}
function tickPrev(id, key, k, el){
  const st = dossier.sousTraitants.find(s=>s.id===id); if(!st) return;
  if(!st.preview) st.preview = computePreview(st);
  (st.preview[key] = st.preview[key]||{})[k] = el.checked;
}
function dateFr(iso){ const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(iso||""); return m?(m[3]+"/"+m[2]+"/"+m[1]):(iso||""); }
function renderFicheIntervention(D, st, index){
  if(!st.preview) st.preview = computePreview(st);
  D.newPage();
  D.header("FICHE DE SUIVI D'INTERVENTION SAV", "Présentation / validation des modes opératoires et des consignes de sécurité");
  { D.ensureSpace(60);
    D.infoCols([["N° chrono",dossier.chrono]],[["Affaire / Code",dossier.affaire]]);
    D.y += 1;
    const droite=[["Responsable",dossier.cdtNom],["Téléphone",dossier.tel],["Nombre de compagnons",dossier.nbComp || (((st.compagnons||[]).length)||"—")]];
    if((st.entreprise||"").trim()){ droite.splice(0,0,["Entreprise sous-traitante",st.entreprise],["Contact de l'entreprise",(st.contactNom||"—")+" — "+(st.contactTel||"—")]); }
    const gauche=[]; if((dossier.nomChantier||"").trim()) gauche.push(["Chantier",dossier.nomChantier]);
    gauche.push(["Adresse du site d'intervention",dossier.adresse],["Contact sur place",dossier.contactSite],["Dates d'intervention",(dateFr(dossier.dateDebut)||"—")+(dossier.dateFin?" au "+dateFr(dossier.dateFin):"")]);
    D.infoCols(gauche, droite); }
  D.y += 3;

  // 1. LE CHANTIER ET L'INTERVENTION
  D.banner("1. LE CHANTIER ET L'INTERVENTION");
  D.subheading("Rappel du sinistre");
  { const si = splitLinesArr(dossier.siteIntervention||"");
    if(si.length) drawThemes(D, si.map(l=>"- "+l.replace(/^-\s*/,"")), FICHE_TH); else dottedLines(D, 3);
    D.y += 2; }
  D.subheading("Nature des travaux");
  { const tn = splitLinesArr(dossier.natureTravaux||"").map(l=>"- "+l.replace(/^-\s*/,"")); drawThemes(D, tn.concat(toThemes(st.preview.nature)), FICHE_TH); D.y += 2; }
  D.subheading("Produits utilisés");
  drawThemes(D, toThemes(st.preview.utilises), FICHE_TH); D.y += 2;
  D.subheading("Étapes d'intervention");
  drawThemes(D, toThemes(st.preview.etapesText), FICHE_TH); D.y += 2;

  // 2. LES DANGERS
  D.banner("2. LES DANGERS");
  if((st.preview.risquesChantierText||"").trim()){ D.subheading("Risques du chantier"); drawThemes(D, splitLinesArr(st.preview.risquesChantierText), FICHE_TH); D.y += 2; }
  if((st.preview.risquesMetierText||"").trim()){
    D.subheading("Risques liés à vos travaux");
    { const noms = CONFIG.corpsDeMetier.map(m=>m.nom); let cur = null; const out = [];
      splitLinesArr(st.preview.risquesMetierText).forEach(l=>{
        if(l.startsWith("## ")){
          const nm = noms.find(n=>l.slice(3).startsWith(n+" : "));
          if(nm){ if(cur!==nm){ out.push("# "+nm); cur = nm; } out.push("## "+l.slice(3+nm.length+3)); return; }
        }
        out.push(l);
      });
      drawThemes(D, out, FICHE_TH); }
    D.y += 2;
  }
  D.subheading("Produits dangereux");
  drawThemes(D, toThemes(st.preview.produits,true), FICHE_TH); D.y += 2;
  D.subheading("Outils et machines dangereux");
  drawThemes(D, toThemes(st.preview.outillage,true), FICHE_TH); D.y += 2;

  // 3. SE PROTÉGER
  D.banner("3. SE PROTÉGER");
  D.subheading("EPI obligatoires");
  drawThemes(D, toThemes(st.preview.epiText), FICHE_TH); D.y += 2;
  if((st.preview.precautionsText||"").trim()){ D.subheading("Précautions générales"); drawThemes(D, toThemes(st.preview.precautionsText), FICHE_TH); D.y += 2; }
  D.subheading("Sécurité collective"); savChecks(D, SAV_COLL, st.preview.coll);
  D.subheading("Formation"); savChecks(D, SAV_FORM, st.preview.form);

  // 4. RÈGLES DU CHANTIER
  D.banner("4. RÈGLES DU CHANTIER");
  { const regles = splitLinesArr(CONFIG.textes.contraintesSite).concat((dossier.codeAcces||"").trim()?["Code d'accès, porte d'entrée du chantier : "+dossier.codeAcces]:[]);
    const estStock = l=>/stockage|gravats|déchets/i.test(l);
    drawThemes(D, regles.map(l=>"- "+l), FICHE_TH); D.y += 2; }

  D.ensureSpace(70);
  D.banner("5. VALIDATION DES CONSIGNES — COMPAGNONS");
  D.paragraph(CONFIG.textes.attestation);
  D.y += 2;
  { const p = D.pdf, cols=[64,30,D.contentW-94], rowH=17, hdrH=7.6, comps = st.compagnons||[];
    const n = Math.max(parseInt(dossier.nbComp)||1, comps.length, 1);
    const hdr = ["Nom et prénom","Date","Signature"];
    const drawHdr = ()=>{ D.ensureSpace(rowH+hdrH+4); let x=D.margin; hdr.forEach((h,k)=>{ p.setFillColor(234,79,0); p.setDrawColor(234,79,0); p.rect(x,D.y,cols[k],hdrH,"FD"); p.setFont("helvetica","bold"); p.setFontSize(9.5); p.setTextColor(255,255,255); p.text(h,x+2.5,D.y+5.2); x+=cols[k]; }); D.y+=hdrH; p.setTextColor(30,30,30); };
    drawHdr();
    for(let r=0;r<n;r++){
      if(D.y+rowH>D.pageH-20){ D.newPage(); drawHdr(); }
      const c = (pdfWithSigs && comps[r]) || null; let x=D.margin;
      cols.forEach(w=>{ p.setDrawColor(210,206,199); p.rect(x,D.y,w,rowH,"S"); x+=w; });
      if(c){ p.setFont("helvetica","normal"); p.setFontSize(9.5); p.setTextColor(30,30,30);
        p.text(p.splitTextToSize(((c.nom||"")+" "+(c.prenom||"")).trim(),cols[0]-4),D.margin+2,D.y+5.5);
        p.text(todayFr(),D.margin+cols[0]+2,D.y+5.5);
        if(c.sig){ try{ p.addImage(c.sig,"PNG",D.margin+cols[0]+cols[1]+2,D.y+1.2,cols[2]-4,rowH-2.4); }catch(e){} } }
      D.y+=rowH;
    }
  }
}

/* Lignes pointillées à remplir à la main */
function autoOpenPdf(url, filename){
  try{
    const a = document.createElement("a");
    a.href = url; a.download = filename||"document.pdf"; a.style.display="none";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }catch(e){}
  try{ window.open(url, "_blank"); }catch(e){}
}

/* =========================================================================
   ACTIONS UI (exposées en global pour les attributs onclick/oninput)
   ========================================================================= */
function updateDossier(field, value){ dossier[field] = value; try{ if(field==="cdtNom") localStorage.setItem("sav_cdt",value); if(field==="tel") localStorage.setItem("sav_tel",value); }catch(e){} }
function renderTopbar(){
  return '<div class="topbar'+(unlocked?'':' gate-top')+'">'+
    '<div class="brand"><img src="data:image/png;base64,'+LOGO_SAV_B64+'" alt="Démarrage SAV" style="cursor:pointer;height:30px;width:auto;" title="Retour au début" onclick="goStep(\'chantier\')">'+
      '<div><div class="brand-text">Fiche de suivi d\'intervention</div><div class="brand-sub">Service après-vente</div></div>'+
    '</div>'+
    (unlocked? '<div class="tb-actions" style="display:flex;gap:8px;"><button class="icon-btn" onclick="toggleSettings()">⚙ Réglages</button><button class="icon-btn" onclick="newDossier()">Nouvelle fiche</button></div>'+
      '<div class="tb-menu"><button class="menu-btn" onclick="toggleMenu()" aria-label="Menu">⋯</button>'+
      (menuOpen? '<div class="menu-pop"><button onclick="menuOpen=false;toggleSettings()">⚙ Réglages</button><button onclick="menuOpen=false;newDossier()">Nouvelle fiche</button></div>' : '')+
      '</div>' : '')+
  '</div>';
}

function renderGate(){
  return '<div class="gate-wrap"><div class="gate-card">'+
    '<div class="hero-band"><span class="logo-chip"><img src="data:image/png;base64,'+LOGO_SAV_B64+'" alt="Démarrage SAV"></span>'+
      '<div><h2>Fiche de suivi d\'intervention</h2><p>Service après-vente</p></div></div>'+
    '<div class="gate-body">'+
      '<div class="gate-hint">Accès réservé à l\'équipe SAV. Saisissez le code fourni.</div>'+
      '<input type="password" placeholder="Code d\'accès" value="'+esc(gateInput)+'" oninput="updateGateInput(this.value)" onkeydown="if(event.key===\'Enter\')submitGate()" autocomplete="off">'+
      (gateError? '<div class="error-msg">'+esc(gateError)+'</div>' : '')+
      '<button class="btn" onclick="submitGate()">Entrer</button>'+
      '<p class="gate-foot">Outil créé par Jean Bourdel. Usage interne.</p>'+
    '</div>'+
  '</div></div>';
}

function renderStepSelect(){
  const tile = (key,label,desc,checked,handler)=>
    '<label class="tile'+(checked?' sel':'')+'"><input type="checkbox" '+(checked?'checked':'')+' onchange="'+handler+'">'+
    '<span class="tile-ico">'+TILE_ICONS[key]+'</span>'+
    '<span class="tile-txt"><b>'+esc(label)+'</b><small>'+esc(desc)+'</small></span><span class="tile-chk"></span></label>';
  let h = '<div class="pick-card"><div class="hero-band"><span class="logo-chip"><img src="data:image/png;base64,'+LOGO_SAV_B64+'" alt="Démarrage SAV"></span>'+
    '<div><h2>Que faut-il préparer ?</h2><p>Cochez les deux pour le dossier complet, ou seulement ce dont vous avez besoin.</p></div></div><div class="pick-body"><div class="tile-grid">';
  h += tile("fiche","Fiche de 1ère intervention","Fiche de suivi d'intervention SAV : mode opératoire, consignes de sécurité, signatures des compagnons.",dossier.docs.fiche,"toggleDocOther('fiche', this.checked)");
  h += tile("quartHeure","1/4h sécurité","Thèmes et feuille d'émargement.",dossier.docs.quartHeure,"toggleDocOther('quartHeure', this.checked)");
  h += '</div>';
  const noneChecked = !dossier.docs.fiche && !dossier.docs.quartHeure;
  if(noneChecked) h += '<div class="error-msg" style="margin-top:12px;">Cochez au moins un document à générer.</div>';
  h += '<div class="row-actions"><span></span><button class="btn" '+(noneChecked?"disabled":"")+' onclick="goNext()">Continuer</button></div>';
  h += '</div></div>';
  return h;
}
function renderStepMateriel(){
  let h = '<div class="card"><h2>Liste de matériel — OPC</h2><p class="hint">Quantités "type" pour une opération coup de poing — corrigez librement libellés, fournisseurs et quantités.</p></div>';

  h += '<div class="card"><div class="field" style="max-width:220px;"><label>Nombre de logements concernés</label>'+
    '<input type="number" min="1" value="'+esc(materielState.nombreLogements)+'" oninput="updateMaterielLogements(this.value)"></div>'+
    '<p class="small-note">Quantités saisies pour 1 logement — multipliées par ce nombre à la génération.</p></div>';

  h += '<div class="card"><div class="field" style="margin-bottom:0;"><label>Nom et n° du chantier</label><input type="text" value="'+esc(materielState.chantierRef)+'" oninput="materielState.chantierRef=this.value" placeholder="ex. Résidence Les Lilas — 1466-102"></div></div>';

  CATEGORIES_MATERIEL.forEach((cat,i)=> h += renderCategoryMateriel(cat, i));

  h += '<div class="card"><h2 class="gen-title">Génération</h2>';
  h += '<div class="gen-row">'+
    '<label class="gen-opt"><input type="checkbox" '+(materielState.genOptions.listes?"checked":"")+' onchange="materielState.genOptions.listes=this.checked"> Listes par fournisseur</label>'+
    '<label class="gen-opt"><input type="checkbox" '+(materielState.genOptions.emails?"checked":"")+' onchange="materielState.genOptions.emails=this.checked"> Mails de demande de prix</label>'+
    '<label class="gen-opt"><input type="checkbox" '+(materielState.genOptions.recap?"checked":"")+' onchange="materielState.genOptions.recap=this.checked"> Récapitulatif global (validation sous-traitant)</label>'+
    '<label class="gen-opt"><input type="checkbox" '+(materielState.genOptions.precommande?"checked":"")+' onchange="toggleMaterielPrecommande(this.checked)"> Liste de commande plomberie</label>'+
    '</div>';
  if(materielState.genOptions.precommande){
    h += '<div class="gen-code">'+
      '<label>Code d\'accès</label>'+
      '<input type="password" value="'+esc(materielState.codePrecommande)+'" oninput="materielState.codePrecommande=this.value" placeholder="Code">'+
      '</div>';
  }
  h += '<button class="btn gen-go" onclick="generateMateriel()">Valider et générer →</button>';
  h += '</div>';

  h += '<div id="materiel-resultats">'+materielState.outputHtml+'</div>';

  h += '<div class="row-actions"><button class="btn secondary" onclick="goPrev()">Retour</button><span></span></div>';
  return h;
}

function renderStep1(){
  let h = '<div class="card"><h2>Informations chantier</h2><p class="hint">Ces informations seront reprises sur les documents du dossier.</p>';
  h += '<div class="grid2">';
  h += field("Nom du chantier", dossier.nomChantier, "nomChantier", "ex. Résidence Les Lilas");
  h += field("N° chrono (SAV)", dossier.chrono, "chrono", "ex. 2026-018");
  h += '</div>';
  h += '<div class="grid2">';
  h += field("Responsable (votre nom)", dossier.cdtNom, "cdtNom", "ex. Jean Bourdel");
  h += field("Téléphone", dossier.tel, "tel", "ex. 06 12 34 56 78", "tel");
  h += '</div>';
  h += field("Adresse du site d'intervention", dossier.adresse, "adresse", "ex. 12 rue de la Résidence, 75015 Paris");
  h += field("Contact sur place", dossier.contactSite, "contactSite", "ex. Mme Dupont, gardienne (nom et téléphone)");
  h += field("Nombre de compagnons", dossier.nbComp, "nbComp", "ex. 2", "number");
  if(dossier.docs.fiche){
    h += '<div class="grid3">';
    h += field("Code d'accès du chantier (porte)", dossier.codeAcces, "codeAcces", "ex. 3B45");
    h += field("Numéro affaire / code", dossier.affaire, "affaire", "ex. 1466-102");
    h += field("Date de début", dossier.dateDebut, "dateDebut", "", "date");
    h += field("Date de fin (estimée)", dossier.dateFin, "dateFin", "", "date");
    h += '</div>';
    h += '<div class="field"><label>Rappel du sinistre</label><textarea rows="5" placeholder="ex. Infiltration d\'eau dans la cage d\'escalier au dernier étage. Origine : fissures en toiture-terrasse." oninput="dossier.siteIntervention=this.value">'+esc(dossier.siteIntervention||"")+'</textarea><p class="small-note">Vide, le PDF imprime des lignes pointillées à remplir à la main.</p></div>';
    h += '<div class="field"><label>Nature des travaux à réaliser</label><textarea rows="4" placeholder="ex. Reprise des enduits et des peintures de la cage d\'escalier" oninput="dossier.natureTravaux=this.value">'+esc(dossier.natureTravaux||"")+'</textarea><p class="small-note">S\'ajoute aux travaux prévus par le mode opératoire.</p></div>';
  } else if(dossier.docs.quartHeure){
    h += '<div class="grid2">'+field("Date du 1/4h sécurité", dossier.dateDebut, "dateDebut", "", "date")+'</div>';
  }
  if(dossier.docs.quartHeure && !dossier.docs.fiche){
    const f = dossier.risquesSpec;
    h += '<div class="field"><label>Risques spécifiques au chantier</label><div class="rs-row">';
    [["amiante","Amiante"],["plomb","Plomb"],["coactivite","Coactivité"],["chaleur","Fortes chaleurs"],["elecNonConsigne","Électricité non consignée"],["gazAlimente","Réseau gaz alimenté"],["siteOccupe","Site occupé"]].forEach(([k,l])=>{
      h += '<label class="rs-item"><input type="checkbox" '+(f[k]?'checked':'')+' onchange="setRisqueSpec(\''+k+'\', this.checked)"> '+l+'</label>';
    });
    h += '</div><p class="small-note">Le groupe de risques change chaque semaine. Les risques cochés ici s\'ajoutent. Fortes chaleurs : ajouté aussi automatiquement une fois par mois de juin à août.</p></div>';
  }
  if(dossier.docs.affichages){
    h += '<label class="rs-item" style="display:block;margin:6px 0 12px;"><input type="checkbox" '+(dossier.risquesSpec.gazAlimente?'checked':'')+' onchange="setRisqueSpec(\'gazAlimente\', this.checked); render();"> Réseau gaz alimenté : ajouter l\'affiche « DANGER GAZ »</label>';
    h += '<div class="field" style="max-width:220px;"><label>Nombre de zones (signalétique)</label><input type="number" min="0" value="'+esc(dossier.nbZones===undefined?1:dossier.nbZones)+'" oninput="updateDossier(\'nbZones\', Math.max(0, parseInt(this.value)||0))"></div>';
    h += '<p class="small-note">Chaque zone reçoit son propre panneau « interdit au public » et « EPI obligatoires ». Mettez 0 si aucun de ces deux panneaux n\'est nécessaire pour ce chantier — la base vie et la zone de stockage restent générées, elles, une seule fois pour tout le chantier.</p>';
  }
  h += '<div class="row-actions"><button class="btn secondary" onclick="goPrev()">Retour</button><button class="btn" onclick="goNext()">Continuer</button></div>';
  h += '</div>';
  return h;
}
function toggleST(id){ const st=dossier.sousTraitants.find(s=>s.id===id); if(st){ st.showST=!st.showST; render(); } }
const MO_RESUME = {
  peinture:"Reprise des enduits, ponçage, impression, peinture de finition, plinthes",
  faience:"Préparation du support, pose des carreaux, joints, finitions",
  voile:"Colmatage de la venue d'eau, reprofilage, étanchéité complémentaire",
  fissure:"Ouverture et nettoyage de la fissure, remplissage au mastic, rebouchage, lissage"
};
function toggleCustom(id){ const st=dossier.sousTraitants.find(s=>s.id===id); if(st){ st.showCustom=!st.showCustom; render(); } }
function renderStep2(){
  let h = '<div class="card"><h2>Modes opératoires</h2><p class="hint">Choisissez le ou les modes opératoires de cette fiche.</p>';
  dossier.sousTraitants.forEach((st, idx)=>{
    h += '<div class="st-card"><div class="st-card-head"><strong>Fiche '+(idx+1)+'</strong>';
    h += dossier.sousTraitants.length>1 ? '<button class="btn ghost" onclick="removeSousTraitant(\''+st.id+'\')">Supprimer</button>' : '';
    h += '</div><label>Mode(s) opératoire(s) SAV</label>';
    CONFIG.corpsDeMetier.forEach((m,k)=>{
      const checked = st.metiers.includes(m.id);
      h += '<label class="mo'+(checked?' sel':'')+'"><input type="checkbox" '+(checked?"checked":"")+' onchange="toggleMetier(\''+st.id+'\',\''+m.id+'\',this.checked)">'
        + '<span><b>'+(k+1)+'. '+esc(m.nom)+(m._custom?' <span class="tag">ajouté</span>':'')+'</b>'
        + (MO_RESUME[m.id]?'<small>'+esc(MO_RESUME[m.id])+'</small>':(m.nature?'<small>'+esc(String(m.nature).split("\n")[0])+'</small>':''))+'</span></label>';
    });
    if(st.showCustom){
      h += '<div class="inline-ai" style="margin-top:14px;"><label>Mode opératoire absent de la liste</label>';
      h += '<input type="text" placeholder="Nom du mode opératoire" value="'+esc(st.customNom||"")+'" oninput="updateST(\''+st.id+'\',\'customNom\',this.value)">';
      h += '<input type="text" placeholder="Nature des travaux" value="'+esc(st.customNature||"")+'" oninput="updateST(\''+st.id+'\',\'customNature\',this.value)">';
      h += '<input type="text" placeholder="Produits / matériaux" value="'+esc(st.customProduits||"")+'" oninput="updateST(\''+st.id+'\',\'customProduits\',this.value)">';
      h += '<input type="text" placeholder="Outillage / matériel" value="'+esc(st.customOutillage||"")+'" oninput="updateST(\''+st.id+'\',\'customOutillage\',this.value)">';
      h += '<textarea rows="3" placeholder="Étapes d\'intervention (une par ligne)" oninput="updateST(\''+st.id+'\',\'customEtapes\',this.value)">'+esc(st.customEtapes||"")+'</textarea>';
      h += '<button class="btn secondary" onclick="addCustomMetier(\''+st.id+'\');st.showCustom=false;render()">Ajouter ce mode opératoire à la fiche</button> ';
      h += '<button class="btn ghost" onclick="toggleCustom(\''+st.id+'\')">Annuler</button></div>';
    } else {
      h += '<div style="margin-top:12px;"><button class="btn secondary" onclick="toggleCustom(\''+st.id+'\')">Ajouter un mode opératoire absent de la liste</button></div>';
    }
    if(st.showST){
      h += '<div class="inline-ai" style="margin-top:14px;"><label>Entreprise sous-traitante</label>';
      h += '<input type="text" placeholder="Entreprise" value="'+esc(st.entreprise)+'" oninput="updateST(\''+st.id+'\',\'entreprise\',this.value)">';
      h += '<input type="text" placeholder="Nom du contact" value="'+esc(st.contactNom)+'" oninput="updateST(\''+st.id+'\',\'contactNom\',this.value)">';
      h += '<input type="tel" placeholder="Téléphone du contact" value="'+esc(st.contactTel)+'" oninput="updateST(\''+st.id+'\',\'contactTel\',this.value)">';
      h += '<button class="btn ghost" onclick="st=dossier.sousTraitants.find(s=>s.id===\''+st.id+'\');st.entreprise=\'\';st.contactNom=\'\';st.contactTel=\'\';toggleST(\''+st.id+'\')">Retirer l\'entreprise</button></div>';
    } else {
      h += '<div style="margin-top:12px;"><button class="btn secondary" onclick="toggleST(\''+st.id+'\')">Ajouter une entreprise sous-traitante</button></div>';
    }
    h += '</div>';
  });
  h += '<button class="btn secondary" onclick="addSousTraitant()">Ajouter une intervention</button><p class="small-note">Ajoute une fiche complète (autres modes opératoires, autres compagnons) dans le même PDF.</p>';
  const manque = dossier.sousTraitants.some(s=>!s.metiers.length);
  if(manque) h += '<div class="error-msg" style="margin-top:12px;">Choisissez au moins un mode opératoire pour chaque intervention.</div>';
  h += '<div class="row-actions"><button class="btn secondary" onclick="goPrev()">Retour</button><button class="btn" '+(manque?"disabled":"")+' onclick="goNext()">Continuer vers l\'aperçu</button></div>';
  h += '</div>';
  return h;
}
function renderStep3(){
  let h = '<div class="card"><h2>Aperçu et validation des textes</h2><p class="hint">Propositions de textes, à adapter à votre chantier.</p>';
  if(dossier.docs.fiche){
    dossier.sousTraitants.forEach((st,idx)=>{
      if(!st.preview) st.preview = computePreview(st);
      h += '<div class="st-card doc-fpi"><div class="doc-tag">FICHE DE 1ÈRE INTERVENTION</div><div class="st-card-head"><strong>'+esc(st.entreprise||("Fiche "+(idx+1)))+'</strong></div>';
      h += previewField(st.id,"Nature des travaux","nature",st.preview.nature);
      h += previewField(st.id,"Étapes d'intervention","etapesText",st.preview.etapesText);
      h += '<div class="field"><label>Risques liés aux travaux (## = titre, - = consigne)</label><textarea rows="8" oninput="updatePreviewField(\''+st.id+'\',\'risquesMetierText\',this.value)">'+esc(st.preview.risquesMetierText||"")+'</textarea></div>';
      h += previewField(st.id,"Produits utilisés (liste complète)","utilises",st.preview.utilises);
      h += previewField(st.id,"Produits dangereux","produits",st.preview.produits);
      h += previewField(st.id,"Outils et machines dangereux","outillage",st.preview.outillage);
      h += previewField(st.id,"EPI obligatoires","epiText",st.preview.epiText);
      h += previewField(st.id,"Précautions générales","precautionsText",st.preview.precautionsText);
    h += '<label>Sécurité collective</label>'+prevChecks(st, SAV_COLL, "coll");
    h += '<label style="margin-top:10px;">Formation</label>'+prevChecks(st, SAV_FORM, "form");
      h += '</div>';
    });
  }
  if(dossier.docs.quartHeure){
    h += '<div class="st-card doc-qh"><div class="doc-tag">1/4H SÉCURITÉ</div><div class="st-card-head"><strong>Quart d\'heure sécurité (commun au chantier)</strong></div>';
    h += '<div class="grid2">';
    h += '<div class="field"><label>Présentateur</label><input type="text" value="'+esc(dossier.quartHeure.presentateur)+'" placeholder="'+esc(dossier.cdtNom||"")+'" oninput="dossier.quartHeure.presentateur=this.value"></div>';
    h += '<div class="field"><label>Support fait par</label><input type="text" value="'+esc(dossier.quartHeure.supportPar)+'" placeholder="'+esc(dossier.cdtNom||"")+'" oninput="dossier.quartHeure.supportPar=this.value"></div>';
    h += '</div>';
    h += '<div class="field"><label>Groupe de la semaine (semaine '+isoWeek(qhDate())+')</label><select onchange="setQhGroupe(this.value)"><option value=""'+(dossier.quartHeure.groupe===""?' selected':'')+'>Automatique : groupe '+(qhAutoGroup()+1)+' - '+esc(QH_GROUPS[qhAutoGroup()].nom)+'</option>'+QH_GROUPS.map((g,i)=>'<option value="'+i+'"'+(dossier.quartHeure.groupe===i?' selected':'')+'>Groupe '+(i+1)+' - '+esc(g.nom)+'</option>').join('')+'</select></div>';
    h += '<div class="field"><label>Thèmes abordés (## = titre en gras, - = tiret)</label><textarea rows="14" oninput="updateThemesText(this.value)">'+esc(dossier.quartHeure.themesText)+'</textarea></div>';
    h += '<div class="field"><label>Particularités du chantier (1 à 2 lignes)</label><textarea rows="2" placeholder="ex. Résidence occupée : prévenir le gardien avant de couper l\'eau." oninput="dossier.quartHeure.siteLine=this.value">'+esc(dossier.quartHeure.siteLine||"")+'</textarea><p class="small-note">Si vous laissez vide, le PDF imprime deux lignes pointillées à remplir à la main.</p></div>';
    h += '</div>';
  }
  h += '<div class="row-actions"><button class="btn secondary" onclick="goPrev()">Retour</button><button class="btn" onclick="goNext()">Continuer</button></div>';
  h += '</div>';
  return h;
}
let lastPdfBlob = null, signedDone = false, pdfMode = null; /* pdfMode : null (choix), "print" (à imprimer) ou "sign" (à signer) */
function sigCardHtml(id,c,i,qh){
  return '<div class="st-card"><strong>'+(qh?'Participant ':'Compagnon ')+(i+1)+'</strong><div>'
    + '<div class="field"><label>Prénom et nom</label><input type="text" autocomplete="name" '+(qh?'id="qhn_'+i+'" ':'')+'value="'+esc(c.nom)+'" oninput="updateComp(\''+id+'\','+i+',\'nom\',this.value)"></div></div>'
    + '<p class="small-note" style="margin:6px 0 10px;">En signant, je confirme '+(qh?'avoir assisté au quart d\'heure sécurité et en avoir compris les consignes.':'avoir lu et compris les consignes techniques et de sécurité de cette intervention, et je m\'engage à les respecter.')+'</p>'
    + '<label>Signature (au doigt)</label><canvas class="sigbox" id="sig_'+id+'_'+i+'"></canvas>'
    + '<div class="sig-actions"><button class="btn ghost" onclick="clearSig(\''+id+'\','+i+')">Effacer</button><span class="signed" id="sg_'+id+'_'+i+'">'+(c.sig?"Signature enregistrée":"")+'</span></div></div>';
}
function sigBlockHtml(){
  let h = '<div class="sig-zone"><h3>Signatures des compagnons</h3><p class="hint">'+esc(CONFIG.textes.attestation)+' Chacun écrit son prénom et nom puis signe au doigt.</p>';
  dossier.sousTraitants.forEach((st,si)=>{
    if(dossier.sousTraitants.length>1) h += '<div class="st-card-head" style="margin-top:12px;"><strong>Fiche '+(si+1)+'</strong></div>';
    st.compagnons.forEach((c,i)=>{ h += sigCardHtml(st.id,c,i,false); });
    h += '<button class="btn secondary" onclick="addComp(\''+st.id+'\')">Ajouter un compagnon</button>';
  });
  return h+'</div>';
}
function sigBlockQhHtml(){
  let h = '<div class="sig-zone"><h3>Signatures du 1/4h sécurité</h3><p class="hint">Chaque participant écrit son prénom et nom puis signe au doigt.</p>';
  dossier.quartHeure.participants.forEach((c,i)=>{ h += sigCardHtml("QH",c,i,true); });
  h += '<button class="btn secondary" onclick="addComp(\'QH\')">Ajouter un participant</button></div>';
  return h;
}
function renderPdfChoice(){
  return '<div class="card"><h2>Quel PDF voulez-vous ?</h2>'
    + '<p class="hint">Dans les deux cas, le PDF contient la même fiche. Seule la façon de signer change.</p>'
    + '<button class="btn" style="width:100%;margin-bottom:6px;" onclick="choosePdf(\'print\')">PDF à imprimer</button>'
    + '<p class="small-note" style="margin:0 0 16px;">Sans signatures : on imprime puis on fait signer à la main.</p>'
    + '<button class="btn" style="width:100%;margin-bottom:6px;" onclick="choosePdf(\'sign\')">PDF à signer</button>'
    + '<p class="small-note" style="margin:0 0 6px;">Les compagnons signent au doigt sur l\'écran, le PDF signé est prêt à envoyer.</p>'
    + '<div class="row-actions"><button class="btn secondary" onclick="goPrev()">← Retour modifier</button></div></div>';
}
function choosePdf(mode){ pdfMode = mode; generatePdf(false); window.scrollTo(0,0); render(); }
function renderPrintResult(){
  return '<div class="card"><h2>PDF prêt à imprimer</h2>'+(genMessage?'<div class="err-banner">'+esc(genMessage.text)+'</div>':'<div class="success-banner">'+esc(lastPdfFilename)+'</div>')
    + '<button class="btn" style="width:100%;margin-bottom:10px;" onclick="sharePdf()">Partager par mail</button>'
    + '<button class="btn secondary" style="width:100%;" onclick="dlPdf()">Télécharger le PDF</button>'
    + '<p class="small-note">« Partager » ouvre le menu du téléphone : choisissez votre messagerie, le PDF part en pièce jointe.</p>'
    + '<div id="pv" class="pv" style="margin-top:12px;"></div>'
    + '<div class="row-actions"><button class="btn secondary" onclick="pdfMode=null;render()">← Changer de choix</button><button class="btn secondary" onclick="newDossier()">Nouveau dossier</button></div></div>';
}
function renderStep4(){
  if(signedDone) return renderStep5();
  if(!pdfMode) return renderPdfChoice();
  if(pdfMode==="print") return renderPrintResult();
  let h = '<div class="card pdfcard"><h2>PDF et signatures</h2>';
  if(genMessage) h += '<div class="err-banner">'+esc(genMessage.text)+'</div>';
  if(dossier.docs.fiche){ h += '<div id="pv1" class="pv"></div>'+sigBlockHtml(); }
  if(dossier.docs.quartHeure){ h += '<div id="pv2" class="pv"></div>'+sigBlockQhHtml(); }
  h += '<div class="row-actions"><button class="btn secondary" onclick="goPrev()">Retour modifier</button><button class="btn" onclick="saveSigned()">Enregistrer le PDF signé</button></div></div>';
  return h;
}
function getComps(id){ if(id==="QH") return dossier.quartHeure.participants; const st=dossier.sousTraitants.find(s=>s.id===id); return st?st.compagnons:null; }
function updateComp(id,i,k,v){ const cs=getComps(id); if(!cs||!cs[i]) return; const old=cs[i][k]; cs[i][k]=v;
  if(id!=="QH" && k==="nom"){ const q=dossier.quartHeure.participants[i]; if(q && (q.nom===""||q.nom===old)){ q.nom=v; const el=document.getElementById("qhn_"+i); if(el) el.value=v; } } }
function addComp(id){ const cs=getComps(id); cs.push({prenom:"",nom:"",sig:null}); render(); window.scrollTo(0,document.body.scrollHeight); }
function renderStep5(){
  let h = '';
  if(signedDone){
    h += '<div class="card"><h2>PDF signé enregistré</h2><div class="success-banner">'+esc(lastPdfFilename)+'</div>'
      + '<button class="btn" style="width:100%;margin-bottom:10px;" onclick="sharePdf()">Partager par mail</button>'
      + '<button class="btn secondary" style="width:100%;" onclick="dlPdf()">Télécharger le PDF</button>'
      + '<p class="small-note">« Partager » ouvre le menu du téléphone : choisissez votre messagerie, le PDF part en pièce jointe.</p>'
      + '<div id="pv" class="pv" style="margin-top:12px;"></div>'
      + '<div class="row-actions"><button class="btn secondary" onclick="signedDone=false;pdfMode="sign";generatePdf(false);render()">← Revoir les signatures</button><button class="btn secondary" onclick="newDossier()">Nouveau dossier</button></div></div>';
    return h;
  }
  h += '<div class="card"><h2>Signatures des compagnons</h2><p class="hint">'+esc(CONFIG.textes.attestation)+' Chacun écrit son nom puis signe au doigt.</p>';
  dossier.sousTraitants.forEach((st,si)=>{
    const t = CONFIG.corpsDeMetier.find(m=>m.id===(st.metiers||[])[0]);
    if(dossier.sousTraitants.length>1) h += '<div class="st-card-head" style="margin-top:12px;"><strong>Intervention '+(si+1)+(t?" : "+esc(t.nom):"")+'</strong></div>';
    st.compagnons.forEach((c,i)=>{
      h += '<div class="st-card"><strong>Compagnon '+(i+1)+'</strong><div>'
        + '<div class="field"><label>Prénom et nom</label><input type="text" autocomplete="name" value="'+esc(c.nom)+'" oninput="updateComp(\''+st.id+'\','+i+',\'nom\',this.value)"></div></div>'
        + '<p class="small-note" style="margin:6px 0 10px;">En signant, je confirme avoir lu et compris les consignes techniques et de sécurité de cette intervention, et je m\'engage à les respecter.</p>'
        + '<label>Signature (au doigt)</label><canvas class="sigbox" id="sig_'+st.id+'_'+i+'"></canvas>'
        + '<div class="sig-actions"><button class="btn ghost" onclick="clearSig(\''+st.id+'\','+i+')">Effacer</button><span class="signed" id="sg_'+st.id+'_'+i+'">'+(c.sig?"Signature enregistrée":"")+'</span></div></div>';
    });
    h += '<button class="btn secondary" onclick="addComp(\''+st.id+'\')">Ajouter un compagnon</button>';
  });
  h += '<div class="row-actions"><button class="btn secondary" onclick="goPrev()">Retour</button><button class="btn" onclick="saveSigned()">Enregistrer le PDF signé</button></div></div>';
  return h;
}
function initSig(stId, i){
  const cs = getComps(stId); const c = cs&&cs[i];
  const cv = document.getElementById("sig_"+stId+"_"+i); if(!cv||!c) return;
  const r = cv.getBoundingClientRect(), dpr = Math.max(1, window.devicePixelRatio||1);
  cv.width = Math.round(r.width*dpr); cv.height = Math.round(r.height*dpr);
  const g = cv.getContext("2d"); g.scale(dpr,dpr); g.lineWidth=2.6; g.lineCap="round"; g.lineJoin="round"; g.strokeStyle="#111";
  if(c.sig){ const im=new Image(); im.onload=()=>g.drawImage(im,0,0,r.width,r.height); im.src=c.sig; }
  let drawing=false, last=null;
  const pos = e=>{ const b=cv.getBoundingClientRect(); return {x:e.clientX-b.left, y:e.clientY-b.top}; };
  cv.onpointerdown = e=>{ drawing=true; last=pos(e); cv.setPointerCapture(e.pointerId); g.beginPath(); g.moveTo(last.x,last.y); g.lineTo(last.x+0.1,last.y+0.1); g.stroke(); e.preventDefault(); };
  cv.onpointermove = e=>{ if(!drawing) return; const p=pos(e); g.beginPath(); g.moveTo(last.x,last.y); g.lineTo(p.x,p.y); g.stroke(); last=p; e.preventDefault(); };
  const end = ()=>{ if(!drawing) return; drawing=false; { const tc=document.createElement("canvas"); tc.width=560; tc.height=Math.round(560*cv.height/cv.width); tc.getContext("2d").drawImage(cv,0,0,tc.width,tc.height); c.sig=tc.toDataURL("image/png"); } const s=document.getElementById("sg_"+stId+"_"+i); if(s) s.textContent="Signature enregistrée"; };
  cv.onpointerup=end; cv.onpointercancel=end; cv.onpointerleave=end;
}
function clearSig(stId,i){
  const cs=getComps(stId); const cv=document.getElementById("sig_"+stId+"_"+i); if(!cv||!cs) return;
  const g=cv.getContext("2d"); g.save(); g.setTransform(1,0,0,1,0,0); g.clearRect(0,0,cv.width,cv.height); g.restore();
  cs[i].sig=null; const s=document.getElementById("sg_"+stId+"_"+i); if(s) s.textContent="";
}
function saveSigned(){
  const all = (dossier.docs.fiche?dossier.sousTraitants.reduce((a,s)=>a.concat(s.compagnons),[]):[]).concat(dossier.docs.quartHeure?dossier.quartHeure.participants:[]);
  const manque = all.filter(c=>!c.sig || !((c.nom||"")+(c.prenom||"")).trim());
  if(manque.length && !confirm(manque.length+" compagnon(s) sans nom ou sans signature. Enregistrer quand même ?")) return;
  const btn=document.querySelector(".row-actions .btn:not(.secondary)"); if(btn){ btn.disabled=true; btn.textContent="Enregistrement…"; }
  setTimeout(()=>{ generatePdf(true); signedDone = !genMessage; render(); window.scrollTo(0,0); }, 50);
}
/* ----- affichage du PDF page par page (pdf.js), secours : lecteur du navigateur ----- */
function loadPdfjs(){ return new Promise((ok,ko)=>{
  if(window.pdfjsLib && window.__pdfWorkerOk) return ok();
  const V="3.11.174", B="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/"+V+"/";
  const go=()=>fetch(B+"pdf.worker.min.js").then(r=>{ if(!r.ok) throw new Error("worker"); return r.text(); })
    .then(txt=>{ pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([txt],{type:"text/javascript"})); window.__pdfWorkerOk=true; ok(); }).catch(ko);
  if(window.pdfjsLib) return go();
  const s=document.createElement("script"); s.src=B+"pdf.min.js"; s.onload=go; s.onerror=ko; document.head.appendChild(s); }); }
let fichePages = 0;
async function showPdf(){
  const box0=document.getElementById("pv"), b1=document.getElementById("pv1"), b2=document.getElementById("pv2"); if(!(box0||b1||b2)||!lastPdfBlob) return;
  const mine = lastPdfUrl;
  try{ await loadPdfjs(); const doc=await pdfjsLib.getDocument({data:await lastPdfBlob.arrayBuffer()}).promise; if(mine!==lastPdfUrl) return;
    [box0,b1,b2].forEach(b=>{ if(b) b.innerHTML=""; });
    for(let n=1;n<=doc.numPages;n++){
      const box = box0 || ((b1 && (n<=fichePages || !b2)) ? b1 : b2); if(!box) continue;
      const pg=await doc.getPage(n); const v0=pg.getViewport({scale:1}); const sc=Math.min(2.2,Math.min(box.clientWidth||360,1100)*Math.max(1,window.devicePixelRatio||1)/v0.width); const vp=pg.getViewport({scale:sc});
      const cv=document.createElement("canvas"); cv.width=vp.width; cv.height=vp.height; box.appendChild(cv); await pg.render({canvasContext:cv.getContext("2d"),viewport:vp}).promise; }
  }catch(e){ const box=box0||b1||b2; if(box) box.innerHTML='<iframe class="pdf" src="'+lastPdfUrl+'#view=FitH"></iframe>'; }
}
function dlPdf(){ const a=document.createElement("a"); a.href=lastPdfUrl; a.download=lastPdfFilename; document.body.appendChild(a); a.click(); a.remove(); }
async function sharePdf(){
  try{ const file=new File([lastPdfBlob],lastPdfFilename,{type:"application/pdf"});
    if(navigator.canShare && navigator.canShare({files:[file]})){ await navigator.share({files:[file],title:"Fiche de suivi d'intervention SAV",text:"Fiche de suivi d'intervention SAV"+(/_signee/.test(lastPdfFilename)?" signée":"")+"."}); return; }
  }catch(e){ if(e&&e.name==="AbortError") return; }
  dlPdf(); location.href="mailto:?subject="+encodeURIComponent("Fiche de suivi d'intervention SAV")+"&body="+encodeURIComponent("Bonjour,\n\nVeuillez trouver ci-joint la fiche de suivi d'intervention SAV signée (fichier téléchargé : "+lastPdfFilename+").");
}
function generatePdf(withSigs){
  try{
    if(!window.jspdf){ genMessage = {type:"error", text:"La bibliothèque PDF ne s'est pas chargée, réessayez."}; return; }
    dossier.sousTraitants.forEach(st=>{ if(!st.preview) st.preview = computePreview(st); });
    pdfWithSigs = !!withSigs;
    const { jsPDF } = window.jspdf; const pdf = new jsPDF({ unit:"mm", format:"a4", compress:true }); const D = new Doc(pdf);
    ensureThemes();
    if(dossier.docs.fiche) dossier.sousTraitants.forEach((st,i)=> renderFicheIntervention(D, st, i));
    fichePages = dossier.docs.fiche ? D.pageNum : 0;
    if(dossier.docs.quartHeure) renderQuartHeure(D);
    const safe = s=>String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9\-]+/gi,"_").replace(/^_+|_+$/g,"");
    lastPdfFilename = "Fiche_SAV_"+([safe(dossier.affaire),safe(dossier.chrono),safe(dossier.nomChantier)].filter(Boolean).join("_")||"intervention")+(withSigs?"_signee":"")+".pdf";
    lastPdfBlob = pdf.output("blob"); if(lastPdfUrl) URL.revokeObjectURL(lastPdfUrl); lastPdfUrl = URL.createObjectURL(lastPdfBlob);
    genMessage = null;
  }catch(e){ console.error(e); genMessage = {type:"error", text:"Une erreur est survenue pendant la génération : "+e.message}; }
}
function goStep(key){
  if(key==="apercu"){ dossier.sousTraitants.forEach(st=>{ if(!st.preview) st.preview = computePreview(st); }); ensureThemes(); }
  if(key==="pdf") pdfMode = null;
  if(key==="pdf"){ signedDone=false; { const n=Math.max(1,parseInt(dossier.nbComp)||1); while(dossier.quartHeure.participants.length<n) dossier.quartHeure.participants.push({prenom:"",nom:"",sig:null}); } dossier.sousTraitants.forEach(st=>{ const n=Math.max(1,parseInt(dossier.nbComp)||1); while(st.compagnons.length<n) st.compagnons.push({prenom:"",nom:"",sig:null}); }); }
  currentStep = key; if(key!=="pdf") genMessage=null; window.scrollTo(0,0); render();
}

function autosizeAll(){ document.querySelectorAll("main textarea").forEach(t=>{ t.style.height="auto"; t.style.height=(t.scrollHeight+4)+"px"; }); }
document.addEventListener("input", e=>{ const t=e.target; if(t && t.tagName==="TEXTAREA" && t.closest("main")){ t.style.height="auto"; t.style.height=(t.scrollHeight+4)+"px"; } });

function renderSettings(){
  if(!adminOk) return renderAdminGate();
  const tabs = [["metiers","Métiers"],["risques","Risques"],["epi","EPI"],["qh","1/4h sécurité"],["textes","Textes communs"],["code","Codes"]];
  let h = '<div class="card adm"><div class="adm-top"><h2>Réglages</h2><span class="hint" style="margin:0">'+(SETTINGS_INFO.updated?('Dernière mise à jour partagée : '+esc(SETTINGS_INFO.updated.slice(0,10))):'Aucune mise à jour partagée')+'</span></div>';
  h += '<div class="adm-body"><div class="adm-menu">'+tabs.map(t=>'<div class="'+(settingsTab===t[0]?'on':'')+'" onclick="setSettingsTab(\''+t[0]+'\')">'+t[1]+'</div>').join('')+'</div><div class="adm-main">';

  if(settingsTab==="metiers"){
    const list = CONFIG.corpsDeMetier, cur = list.find(x=>x.id===selId(list,"metiers"));
    h += '<div class="adm-cols">'+listCol("corpsDeMetier", list, "metiers", x=>x.nom)+'<div class="adm-form">';
    if(cur){
      const q = "'"+cur.id+"'";
      h += admField('Nom','<input type="text" value="'+esc(cur.nom)+'" oninput="updateMetierField('+q+',\'nom\',this.value)">');
      h += admField('Nature des travaux','<textarea rows="2" oninput="updateMetierField('+q+',\'nature\',this.value)">'+esc(cur.nature)+'</textarea>');
      h += admField('Matériel utilisé (une ligne par élément)','<textarea rows="5" oninput="updateMetierField('+q+',\'utilises\',this.value)">'+esc(cur.utilises||"")+'</textarea>');
      h += admField('Étapes (une par ligne)','<textarea rows="5" oninput="updateMetierField('+q+',\'etapes\',this.value)">'+esc((cur.etapes||[]).join("\n"))+'</textarea>');
      h += admField('Risques et consignes (## titre, - consigne)','<textarea rows="8" oninput="updateMetierField('+q+',\'risquesTexte\',this.value)">'+esc(cur.risquesTexte||"")+'</textarea>');
      h += admField('Produits dangereux (séparés par des virgules)','<textarea rows="2" oninput="updateMetierField('+q+',\'produits\',this.value)">'+esc(cur.produits)+'</textarea>');
      h += admField('Outils dangereux (séparés par des virgules)','<textarea rows="2" oninput="updateMetierField('+q+',\'outillage\',this.value)">'+esc(cur.outillage)+'</textarea>');
      h += admField('EPI du métier (noms, virgules)','<textarea rows="2" oninput="updateMetierField('+q+',\'epi\',this.value)">'+esc(idsToNames(cur.epi,CONFIG.epi))+'</textarea>');
      h += admField('Risques liés (noms, virgules)','<textarea rows="2" oninput="updateMetierField('+q+',\'risques\',this.value)">'+esc(idsToNames(cur.risques,CONFIG.risques))+'</textarea>');
    }
    h += '<div><button class="btn secondary" onclick="addMetierRow()">Ajouter un métier</button> <button class="btn ghost" onclick="deleteMetierRow(\''+(cur?cur.id:'')+'\')">Retirer ce métier</button></div></div></div>';
  }
  if(settingsTab==="risques"){
    const list = CONFIG.risques, cur = list.find(x=>x.id===selId(list,"risques"));
    h += '<div class="adm-cols">'+listCol("risques", list, "risques", x=>x.nom)+'<div class="adm-form">';
    if(cur){
      const q = "'"+cur.id+"'";
      h += admField('Nom','<input type="text" value="'+esc(cur.nom)+'" oninput="updateRisqueField('+q+',\'nom\',this.value)">');
      h += admField('Se déclenche si','<textarea rows="2" oninput="updateRisqueField('+q+',\'declencheSi\',this.value)">'+esc(cur.declencheSi)+'</textarea>');
      h += admField('Consignes (une par ligne)','<textarea rows="5" oninput="updateRisqueField('+q+',\'consignes\',this.value)">'+esc(cur.consignes)+'</textarea>');
      h += admField('EPI ajoutés (noms, virgules)','<textarea rows="2" oninput="updateRisqueField('+q+',\'epi\',this.value)">'+esc(idsToNames(cur.epi,CONFIG.epi))+'</textarea>');
      h += admField('Équipements','<input type="text" value="'+esc(cur.equipements)+'" oninput="updateRisqueField('+q+',\'equipements\',this.value)">');
    }
    h += '<div><button class="btn secondary" onclick="addRisqueRow()">Ajouter un risque</button> <button class="btn ghost" onclick="deleteRisqueRow(\''+(cur?cur.id:'')+'\')">Retirer ce risque</button></div></div></div>';
  }
  if(settingsTab==="epi"){
    h += '<table class="cfg"><tr><th>Nom</th><th>Statut</th><th></th></tr>';
    CONFIG.epi.forEach(e=>{
      h += '<tr>'+td('<input type="text" value="'+esc(e.nom)+'" oninput="updateEpiField(\''+e.id+'\',\'nom\',this.value)">')+
        td('<select onchange="updateEpiField(\''+e.id+'\',\'statut\',this.value)"><option value="systematique" '+(e.statut==="systematique"?"selected":"")+'>Systématique</option><option value="conditionnel" '+(e.statut==="conditionnel"?"selected":"")+'>Conditionnel</option></select>')+
        td('<button class="btn ghost" onclick="deleteEpiRow(\''+e.id+'\')">✕</button>')+'</tr>';
    });
    h += '</table><button class="btn secondary" onclick="addEpiRow()">Ajouter un EPI</button>';
  }
  if(settingsTab==="qh"){
    const items = QH_GROUPS.map((g,i)=>({id:"g"+i, nom:"Groupe "+(i+1)+" — "+g.nom, kind:"g", i:i}))
      .concat(Object.keys(QH_SPECIAUX).map(k=>({id:"s_"+k, nom:"Spécial — "+QH_SPECIAUX[k].label, kind:"s", k:k})));
    const cur = items.find(x=>x.id===settingsSel.qh) || items[0];
    h += '<div class="adm-cols"><div class="adm-list">'+items.map(x=>'<div class="'+(x.id===cur.id?'on':'')+'" onclick="setSel(\'qh\',\''+x.id+'\')">'+esc(x.nom)+(qhModified(x)?' <span class="mod">modifié</span>':'')+'</div>').join('')+'</div><div class="adm-form">';
    const obj = cur.kind==="g" ? QH_GROUPS[cur.i] : QH_SPECIAUX[cur.k];
    h += admField(cur.kind==="g"?'Nom du groupe':'Nom du risque spécial','<input type="text" value="'+esc(cur.kind==="g"?obj.nom:obj.label)+'" oninput="updateQh(\''+cur.id+'\',\'nom\',this.value)">');
    h += admField('Phrases (## titre, - phrase)','<textarea rows="14" oninput="updateQh(\''+cur.id+'\',\'lines\',this.value)">'+esc(obj.lines.join("\n"))+'</textarea>');
    h += '</div></div>';
  }
  if(settingsTab==="textes"){
    h += admField('Contraintes de site (une par ligne ; [variable] = code d\'accès du chantier)','<textarea rows="8" oninput="updateTexteFixe(\'contraintesSite\',this.value)">'+esc(CONFIG.textes.contraintesSite)+'</textarea>');
    h += admField('Précautions générales (une par ligne)','<textarea rows="5" oninput="updateTexteFixe(\'precautions\',this.value)">'+esc(CONFIG.textes.precautions)+'</textarea>');
    h += admField('Texte d\'attestation','<textarea rows="3" oninput="updateTexteFixe(\'attestation\',this.value)">'+esc(CONFIG.textes.attestation)+'</textarea>');
    h += admField('Socle fixe du 1/4h sécurité (un thème par ligne)','<textarea rows="5" oninput="updateSocle(this.value)">'+esc(CONFIG.socleQuartHeure.join("\n"))+'</textarea>');
  }
  if(settingsTab==="code"){
    h += admField('Code d\'accès à l\'application','<input type="text" style="max-width:220px" value="'+esc(CONFIG.accessCode)+'" oninput="updateAccessCode(this.value)">');
    h += admField('Nouveau code administrateur (laisser vide pour ne pas changer)','<input type="password" style="max-width:220px" placeholder="••••" onchange="updateAdminCode(this.value)" autocomplete="off">');
    h += '<p class="hint">Le code administrateur protège l\'écran Réglages. Pour publier pour tout le monde, il faut en plus la clé d\'accès GitHub, demandée une seule fois sur cet appareil.</p>';
    h += '<div><button class="btn ghost" onclick="forgetGithubToken()">Oublier la clé GitHub de cet appareil</button></div>';
  }
  h += '</div></div>';
  if(settingsMsg) h += '<div class="'+(settingsMsg.type==="error"?"error-msg":"success-msg")+'" style="margin:10px 0;">'+esc(settingsMsg.text)+'</div>';
  h += '<div class="row-actions adm-bar"><button class="btn secondary" onclick="closeSettings()">Fermer</button>'+
       '<button class="btn secondary" onclick="resetSettingsTab()">Revenir au réglage d\'origine (cet onglet)</button>'+
       '<button class="btn" onclick="saveShared()">Enregistrer pour tout le monde</button></div>';
  h += '</div>';
  return h;
}
function render(){
  const app = document.getElementById("app");
  if(!CONFIG){ app.innerHTML = "Chargement…"; return; }
  const reader = unlocked && currentStep==="pdf" && pdfMode==="sign" && !signedDone;
  let html = reader ? "" : renderTopbar();
  if(!unlocked){
    html += renderGate();
  } else if(settingsOpen){
    html += '<main>'+renderSettings()+'</main>';
  } else {
    html += '<main>'+(reader?'<button class="backfab" onclick="pdfMode=null;render()">←</button>':renderStepper());
    if(currentStep==="select") html += renderStepSelect();
    if(currentStep==="chantier") html += renderStep1();
    if(currentStep==="sous-traitants") html += renderStep2();
    if(currentStep==="apercu") html += renderStep3();
    if(currentStep==="pdf") html += renderStep4();
    html += '</main>';
    if(!reader) html += '<div class="footer-note">Paris Ouest Construction — outil interne SAV créé par Jean Bourdel. Ne pas diffuser en dehors de l\'entreprise.<br>Version '+SAV_VERSION+'</div>';
  }
  app.className = reader ? "reader" : "";
  app.innerHTML = html;
  autosizeAll();
  if(unlocked && currentStep==="pdf" && (pdfMode || signedDone)) showPdf();
  if(unlocked && currentStep==="pdf" && pdfMode==="sign" && !signedDone) { if(dossier.docs.fiche) dossier.sousTraitants.forEach(st=>st.compagnons.forEach((c,i)=>initSig(st.id,i))); if(dossier.docs.quartHeure) dossier.quartHeure.participants.forEach((c,i)=>initSig("QH",i)); }
}

/* =========================================================================
   INSTALLATION "APP" (icône sur écran d'accueil, PWA) — réutilise le logo
   déjà chargé en JS (LOGO_B64) au lieu de le dupliquer dans le HTML.
   ========================================================================= */
function setupPWATags(){
  try{
    const iconDataUrl = "data:image/png;base64,"+SITE_ICON_B64;
    const manifest = {
      name: "SAV — Fiche de suivi d'intervention",
      short_name: "SAV",
      start_url: ".",
      display: "standalone",
      background_color: "#FAF9F7",
      theme_color: "#1E5EA8",
      icons: [{ src: iconDataUrl, sizes: "512x512", type: "image/png", purpose: "any maskable" }]
    };
    const manifestUrl = "data:application/manifest+json," + encodeURIComponent(JSON.stringify(manifest));
    const addLink = (rel, href)=>{ const l=document.createElement("link"); l.rel=rel; l.href=href; document.head.appendChild(l); };
    const addMeta = (name, content)=>{ const m=document.createElement("meta"); m.name=name; m.content=content; document.head.appendChild(m); };
    addLink("manifest", manifestUrl);
    addLink("apple-touch-icon", iconDataUrl);
    addLink("icon", iconDataUrl);
    addMeta("theme-color", "#1E5EA8");
    addMeta("mobile-web-app-capable", "yes");
    addMeta("apple-mobile-web-app-capable", "yes");
    addMeta("apple-mobile-web-app-title", "SAV");
    addMeta("apple-mobile-web-app-status-bar-style", "black-translucent");
  }catch(e){ console.error("PWA tags error", e); }
}

/* =========================================================================
   INITIALISATION
   ========================================================================= */
window.onerror = function(msg, src, line){
  const app = document.getElementById("app");
  if(app) app.innerHTML = '<div class="err-banner" style="margin:20px;">Erreur : '+esc(msg)+' (ligne '+line+')</div>'+app.innerHTML;
};

function init(){
  setupPWATags();
  snapshotDefaults();
  render();
  loadSharedSettings();
}
