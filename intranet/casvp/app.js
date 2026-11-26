function defaultConfig(){
  return {
    accessCode: "2104",
    epi: [
      {id:"chaussures", nom:"Chaussures de sécurité", statut:"systematique"},
      {id:"gants", nom:"Gants", statut:"conditionnel"},
      {id:"casque", nom:"Casque", statut:"conditionnel"},
      {id:"lunettes", nom:"Lunettes", statut:"conditionnel"},
      {id:"masque", nom:"Masque anti-poussière", statut:"conditionnel"},
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
      {id:"protection", nom:"Protection de début de chantier",
       nature:"Poser la signalisation et les protections avant travaux : sols, accès, parties communes.",
       produits:"",
       outillage:"Cutter",
       risquesTexte:"## Risque de chute\n- Fixer les bâches avec de l'adhésif. Une bâche qui bouge fait tomber.\n- Rien dans le passage : ni câble, ni rouleau.\n## Cutter\n- Couper en éloignant le cutter du corps. Le ranger après chaque usage.",
       etapes:["Poser la signalisation","Repérer les zones à protéger","Poser les bâches et protections"],
       epi:["gants"], risques:["coactivite"]},
      {id:"desamiantage", nom:"Déplombage / désamiantage",
       nature:"Retirer ou encapsuler les matériaux contenant du plomb ou de l'amiante, selon la procédure réglementaire.",
       produits:"Produits et matériel du mode opératoire",
       outillage:"Aspirateur à filtre spécial et matériel de confinement (selon les modes opératoires)",
       risquesTexte:"## Poussières de plomb ou d'amiante\n- Entreprise certifiée uniquement, avec son mode opératoire.\n- Fermer et baliser la zone. Ne jamais balayer à sec.\n- Combinaison, masque et gants selon le mode opératoire.\n## Déchets\n- Fermer, étiqueter et stocker dans une zone balisée. L'entreprise certifiée les évacue.",
       etapes:["Suivre le plan de retrait déposé."],
       epi:["masque","gants"], risques:["amiante","plomb"]},
      {id:"curage", nom:"Curage / dépose",
       nature:"Déposer et évacuer l'existant : sanitaires, revêtements, cloisons non conservées, appareillages électriques. Curage complet avant travaux.",
       produits:"",
       outillage:"Disqueuse, perforateur, masse",
       risquesTexte:"## Poussières\n- Humidifier ou aspirer à la source. Ne jamais balayer à sec.\n- Masque FFP2 minimum.\n## Disqueuse et perforateur\n- Capot de la disqueuse toujours en place.\n- Débrancher avant de changer le disque. Changer le disque dès que sa limite est atteinte. Choisir les disques adaptés aux matériaux.\n## Bruit\n- Casque anti-bruit dès qu'on doit hausser la voix pour se faire entendre.\n## Réseaux cachés\n- Avant de casser : repérer l'eau, l'électricité et le gaz. Doute : arrêter et prévenir.\n## Chute d'objets\n- Casque obligatoire. Mettre les gravats en sac au fur et à mesure.",
       etapes:["Protéger les zones voisines","Déposer","Mettre en sac","Évacuer en benne ou déchetterie"],
       epi:["casque","gants","masque","lunettes","auditives"], risques:["poussiere","coactivite"]},
      {id:"plomberie", nom:"Plomberie",
       nature:"Déposer les appareils sanitaires. Poser les réseaux. Poser les appareils et raccorder l'eau et l'évacuation.",
       produits:"Colle et décapant PVC, produit de brasage",
       outillage:"Chalumeau (brasage), sertisseuse, disqueuse",
       risquesTexte:"## Colles et solvants\n- Fenêtre ouverte pendant tout le travail. Gants et lunettes.\n- Refermer le pot après chaque usage. Pas de flamme à côté.\n## Chalumeau (brasage)\n- Protéger le mur avec une plaque. Éloigner ce qui peut brûler.\n- Extincteur à portée de main. Surveiller la zone 1 heure après la fin. Revérifier 3 heures plus tard.\n- Gaz en service : pas de chalumeau près des tuyaux.\n## Eau\n- Couper l'eau. Bouchonner systématiquement. Prévenir les autres entreprises avant de démonter.\n- Sol mouillé : essuyer.",
       etapes:["Couper l'eau","Déposer les anciens appareillages sanitaires","Poser les réseaux","Poser les appareils sanitaires","Tester l'étanchéité"],
       epi:["gants","lunettes"], risques:["chimique","coactivite"]},
      {id:"electricite", nom:"Électricité",
       nature:"Refaire et mettre aux normes : tableau, circuits, prises, éclairage.",
       produits:"",
       outillage:"Perforateur, rainureuse, tournevis isolés, détecteur de tension",
       risquesTexte:"## Courant électrique\n- Couper. Cadenasser. Vérifier l'absence de courant. Électricien habilité uniquement.\n- Outils isolés. Rallonges en bon état.\n## Perçage et rainure dans le mur\n- Avant de percer ou de casser : repérer les fils et les tuyaux.\n## Poussières\n- Aspirer à la source. Masque pour rainurer.",
       etapes:["Couper le courant et cadenasser","Déposer les anciens appareillages","Tirer les câbles de terre","Poser le nouvel appareillage","Tester et mettre en service"],
       epi:["gants","casque","lunettes"], risques:["electrique","coactivite"]},
      {id:"platrerie", nom:"Plâtrerie / placo",
       nature:"Poser cloisons, doublages, faux-plafonds et enduits.",
       produits:"Enduit et plâtre, colle",
       outillage:"Ponceuse, scie cloche, malaxeur électrique",
       risquesTexte:"## Poussières\n- Masque FFP2 minimum. Ne pas balayer à sec.\n## Charges lourdes\n- Plaques et sacs de plâtre : porter à deux. Dos droit, genoux fléchis.\n## Travail en hauteur\n- Escabeau **interdit**. Utiliser une gazelle ou un échafaudage roulant.",
       etapes:["Tracer","Poser l'ossature","Poser les plaques","Traiter les joints et enduire","Poncer"],
       epi:["masque","lunettes","gants"], risques:["poussiere"]},
      {id:"carrelage", nom:"Carrelage / Faïence",
       nature:"Poser le carrelage au sol et la faïence au mur : salles de bain, cuisines, sanitaires.",
       produits:"Colle et mortier, joint",
       outillage:"Disqueuse, malaxeur électrique",
       risquesTexte:"## Poussières\n- Couper à l'eau ou avec un aspirateur à la source. Masque FFP2 minimum.\n## Disqueuse\n- Capot toujours en place. Lunettes, gants, casque anti-bruit.\n- Vérifier que le disque n'est pas fendu. Vérifier que c'est un disque pour carrelage et son état d'usure.\n## Colle et mortier\n- Irritant pour la peau et les yeux. Gants et lunettes.\n- Produit dans l'œil : rincer à l'eau 15 minutes minimum. Puis voir un médecin.\n## Charges lourdes\n- Sacs de colle : porter à deux.",
       etapes:["Préparer et nettoyer le support","Poser la colle et les carreaux","Faire les joints","Nettoyer à l'éponge"],
       epi:["gants","lunettes","masque"], risques:["poussiere"]},
      {id:"peinture", nom:"Peinture",
       nature:"Préparer les supports : reboucher, poncer léger. Peindre les logements.",
       produits:"Peinture, impression, enduit de rebouchage, solvants",
       outillage:"Ponceuse",
       risquesTexte:"## Produits\n- Fenêtre ouverte pendant tout le travail. Gants. Masque si solvant.\n- Pas de flamme ni d'étincelle près des solvants.\n## Poussières de ponçage\n- Brancher l'aspirateur sur la ponceuse. Masque FFP2 minimum.\n## Travail en hauteur\n- Escabeau **interdit**. Utiliser une gazelle ou un échafaudage roulant.\n## Glissade\n- Vérifier la fixation des bâches (scotch).",
       etapes:["Protéger sols et mobilier","Reboucher et poncer léger","Appliquer l'impression","Appliquer la peinture de finition","Nettoyer le matériel"],
       epi:["gants","masque"], risques:[]},
      {id:"serrurerie", nom:"Serrurerie",
       nature:"Déposer et poser serrures, béquilles et butées.",
       produits:"",
       outillage:"Disqueuse, perceuse, poste de soudure",
       risquesTexte:"## Soudure et étincelles\n- Éloigner ou protéger ce qui peut brûler. Extincteur à portée de main.\n- Gaz en service : pas de soudure près des tuyaux.\n- Surveiller la zone 1 heure après la fin. Revérifier 3 heures plus tard.\n## Disqueuse\n- Capot toujours en place. Lunettes, gants, casque anti-bruit.\n## Perçage\n- Avant de percer : chercher où passent les fils et les tuyaux.",
       etapes:["Déposer l'existant","Poser et ajuster les nouveaux éléments","Régler"],
       epi:["gants","lunettes","casque","auditives"], risques:["poussiere","coactivite"]},
      {id:"nettoyage", nom:"Nettoyage",
       nature:"Nettoyer les logements et les parties communes en fin de chantier.",
       produits:"Produits d'entretien et produits toxiques (vitres, décapants)",
       outillage:"",
       risquesTexte:"## Produits d'entretien\n- Lire l'étiquette. Ne jamais mélanger deux produits.\n- Gants. Fenêtre ouverte pendant tout le travail.\n## Fenêtres\n- Escabeau **interdit**. Utiliser une gazelle. Ne jamais se pencher à l'extérieur. Intérieur des fenêtres : les nettoyer fenêtres fermées.\n## Sol mouillé\n- Poser un panneau « sol glissant ».",
       etapes:["Évacuer les derniers gravats","Nettoyer les surfaces","Nettoyer les parties communes"],
       epi:["gants"], risques:["chimique"]}
    ],
    socleQuartHeure: [],
    textes: {
      contraintesSite:
        "Rien ne doit bloquer l'accès à la résidence.\n"+
        "Code d'accès, porte d'entrée du chantier : [variable].\n"+
        "Aucun stockage dans les parties communes. Stockage limité à la zone de stockage.\n"+
        "Coordination avec les autres entreprises : voir les chefs d'équipe et le conducteur de travaux.\n"+
        "Évacuer les gravats et déchets chaque semaine.",
      precautions:
        "Garder le poste de travail propre. Rien au sol.\n"+
        "Avant chaque usage, vérifier : fil, prise, capot, disque. Outil abîmé : ne pas l'utiliser. Prévenir le chef d'équipe.\n"+
        "Utiliser chaque outil pour son usage prévu, rien d'autre.",
      attestation:
        "En signant, l'entreprise et le conducteur de travaux attestent avoir pris connaissance des consignes de sécurité de cette intervention et les avoir validées."
    }
  };
}

/* =========================================================================
   ÉTAT GLOBAL
   ========================================================================= */
function makeSousTraitant(){
  return {
    id: uid("st"), entreprise:"", contactNom:"", contactTel:"", nbOuvriers:"",
    dateDebut:"", dateFin:"", metiers:[], risques:[], amianteNote:"",
    preview:null, customNom:"", customNature:"", customProduits:"", customOutillage:"", customEtapes:""
  };
}

const DEFAULT_SITE_INTERVENTION =
  "Opération « coup de poing » : rénovation d'appartements dans une résidence seniors occupée.\n"+
  "Dans chaque logement, nous déposons tout l'existant (murs, sols, électricité, appareils sanitaires), puis nous remettons tout à neuf.\n"+
  "Objectif : un logement neuf et plus de punaises de lit, grâce à la dépose de tout ce qui est en bois.\n"+
  "Travaux logement par logement. Les résidents sont présents dans l'immeuble : site occupé.";
function makeDossier(){
  return {
    docs:{ fiche:true, quartHeure:true, affichages:true, urgence:true, materiel:false },
    siteIntervention: DEFAULT_SITE_INTERVENTION,
    affaire:"", nomChantier:"", adresse:"", cdtNom:"", codeAcces:"", dateDebut:defaultStartDate(), dateFin:"", nbZones:1,
    sousTraitants:[ makeSousTraitant() ],
    quartHeure:{ presentateur:"", supportPar:"", themesText:"", groupe:"", sig:"", siteLine:"" },
    risquesSpec:{ amiante:false, plomb:false, coactivite:false, chaleur:false, elecNonConsigne:false, gazAlimente:false, siteOccupe:false }
  };
}
const STEP_LABELS = {
  select: "Documents", chantier: "Chantier", "sous-traitants": "Sous-traitants",
  apercu: "Aperçu", pdf: "PDF", materiel: "Matériel"
};
function activeStepKeys(){
  if(dossier.docs.materiel) return ["select","materiel"];
  const keys = ["select","chantier"];
  if(dossier.docs.fiche) keys.push("sous-traitants");
  if(dossier.docs.fiche || dossier.docs.quartHeure) keys.push("apercu");
  keys.push("pdf");
  return keys;
}
function goStep(key){
  if(key==="apercu" && !dossier.quartHeure.presentateur) dossier.quartHeure.presentateur = dossier.cdtNom || "";
  if(key==="apercu"){
    if(dossier.docs.fiche) dossier.sousTraitants.forEach(st=>{ if(!st.preview) st.preview = computePreview(st); });
    ensureThemes();
  }
  currentStep = key; genMessage=null; window.scrollTo(0,0); render();
}
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
  const epiLines = ["Chaussures de sécurité : toujours. Les autres équipements : selon les travaux."];
  metiers.forEach(m=>{
    const names = (m.epi||[]).filter(i=>i!=="chaussures").map(epiNom).filter(Boolean);
    if(names.length) epiLines.push((metiers.length>1 ? m.nom : "Pour vos travaux")+" : "+names.join(", "));
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
    produits: produits || "Aucun produit dangereux.",
    outillage: outillage || "Aucun outil dangereux.",
    etapesText: etapesText || "—",
    epiText: epiText,
    risquesChantierText: risquesChantierText,
    precautionsText: precautionsText || "—",
    risquesMetierText: risquesMetierText,
    risquesNames: risqueObjs.map(r=>r.nom)
  };
}
function renderFicheIntervention(D, st, index){
  if(!st.preview) st.preview = computePreview(st);
  D.newPage();
  D.header("FICHE DE 1ère INTERVENTION SOUS-TRAITANT", "Présentation / validation des modes opératoires et consignes de sécurité");
  D.keyValue("Chantier", dossier.nomChantier);
  D.keyValue("Affaire / Code", dossier.affaire);
  D.keyValue("Adresse du site", dossier.adresse);
  D.keyValue("Conducteur de travaux / Responsable Paris Ouest", dossier.cdtNom);
  D.keyValue("Entreprise sous-traitante", st.entreprise);
  D.keyValue("Contact sur site", (st.contactNom||"—")+"  —  "+(st.contactTel||"—"));
  D.keyValue("Dates d'intervention", (st.dateDebut||dossier.dateDebut||"—")+" au "+(st.dateFin||dossier.dateFin||"—"));
  D.keyValue("Nombre d'ouvriers", st.nbOuvriers || "—");
  D.y += 3;

  // 1. LE CHANTIER ET L'INTERVENTION
  D.banner("1. LE CHANTIER ET L'INTERVENTION");
  D.subheading("Site et intervention");
  { const si = splitLinesArr(dossier.siteIntervention||"");
    if(si.length) drawThemes(D, si.map(l=>"- "+l.replace(/^-\s*/,"")), FICHE_TH); else dottedLines(D, 3);
    D.y += 2; }
  D.subheading("Nature des travaux");
  drawThemes(D, toThemes(st.preview.nature), FICHE_TH); D.y += 2;
  D.subheading("Étapes d'intervention");
  drawThemes(D, toThemes(st.preview.etapesText), FICHE_TH); D.y += 2;

  // 2. LES DANGERS
  D.banner("2. LES DANGERS");
  D.subheading("Risques du chantier");
  drawThemes(D, ["- Amiante dans le logement : " + (st.risques.includes("amiante") ? ("OUI"+(st.amianteNote?(" — "+st.amianteNote):"")) : "Non signalé")], FICHE_TH);
  if((st.preview.risquesChantierText||"").trim()) drawThemes(D, splitLinesArr(st.preview.risquesChantierText), FICHE_TH);
  D.y += 2;
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
  D.subheading("Précautions générales");
  drawThemes(D, toThemes(st.preview.precautionsText), FICHE_TH); D.y += 2;

  // 4. RÈGLES DU CHANTIER
  D.banner("4. RÈGLES DU CHANTIER");
  { const regles = splitLinesArr(CONFIG.textes.contraintesSite.replace("[variable]", dossier.codeAcces||"—"));
    const estStock = l=>/stockage|gravats|déchets/i.test(l);
    D.subheading("Accès et organisation");
    drawThemes(D, regles.filter(l=>!estStock(l)).map(l=>"- "+l), FICHE_TH); D.y += 2;
    const stock = regles.filter(estStock);
    if(stock.length){ D.subheading("Stockage et gravats"); drawThemes(D, stock.map(l=>"- "+l), FICHE_TH); D.y += 2; } }

  D.ensureSpace(92); // bloc validation + signatures toujours d'un seul tenant
  D.banner("5. VALIDATION DES CONSIGNES — COMPAGNONS");
  D.paragraph(CONFIG.textes.attestation);
  D.y += 5;
  { const p = D.pdf, x0 = D.margin, colW = (D.contentW-10)/2, x1 = D.margin+colW+10, y0 = D.y;
    const bloc = (x, titre, lignes, sigImg)=>{
      let y = y0;
      p.setFont("helvetica","bold"); p.setFontSize(SZ.label); p.setTextColor(20,20,20);
      p.text(titre, x, y); p.setDrawColor(20,20,20); p.setLineWidth(0.25); p.line(x, y+1.3, x+p.getTextWidth(titre), y+1.3);
      y += 8;
      lignes.forEach(l=>{
        p.setFont("helvetica","bold"); p.setFontSize(SZ.label); p.text(l[0]+" :", x, y);
        const lw = p.getTextWidth(l[0]+" :  ");
        p.setFont("helvetica","normal");
        if(l[1]) p.text(p.splitTextToSize(l[1], colW-lw)[0], x+lw, y);
        else { let str=""; while(p.getTextWidth(str+".") < colW-lw-1) str += "."; p.text(str, x+lw, y); }
        y += 8;
      });
      y = y0 + 8 + 8*3;
      p.setFont("helvetica","bold"); p.text("Signature :", x, y);
      p.setDrawColor(120,120,120); p.setLineWidth(0.25); p.rect(x, y+2, colW, 24);
      if(pdfWithSigs && sigImg) pdfFitImage(p, sigImg, x+1, y+3, colW-2, 22);
      return y+28;
    };
    const ya = bloc(x0, "L'ENTREPRISE, POUR SES COMPAGNONS", [["Entreprise", st.entreprise||"—"],["Nom", pdfWithSigs?(st.sigNom||""):""],["Date", pdfWithSigs?sigToday():""]], st.sigEnt);
    const yb = bloc(x1, "LE CONDUCTEUR DE TRAVAUX", [["Société", "Paris Ouest Construction"],["Nom", dossier.cdtNom||""],["Date", pdfWithSigs?sigToday():""]], dossier.sigCdt);
    D.y = Math.max(ya,yb);
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

let pdfRanges = { st:{}, qh:null }, lastPdfBlob = null, pdfReady = false;
/* Nom du fichier : « 1-4 dh sécurité 1466-44 JB » (type de document, n° d'affaire, initiales du conducteur) */
function pdfFileName(){
  const d = dossier.docs, nb = [d.fiche,d.quartHeure,d.urgence,d.affichages].filter(Boolean).length;
  const type = nb>1 ? "Démarrage chantier" : d.quartHeure ? "1-4 dh sécurité" : d.fiche ? "Fiche 1ère intervention" : d.urgence ? "Fiche d'urgence" : d.affichages ? "Affichages chantier" : "Démarrage chantier";
  const ref = (dossier.affaire||"").trim() || (dossier.nomChantier||"").trim();
  const ini = (dossier.cdtNom||"").trim().split(/\s+/).filter(Boolean).map(w=>w[0].toUpperCase()).join("");
  const name = [type, ref, ini].filter(Boolean).join(" ") + (pdfWithSigs ? " signé" : "");
  return name.replace(/[\\/:*?"<>|]+/g,"-").replace(/\s+/g," ").trim();
}
async function sharePdf(){
  const name = lastPdfFilename.replace(/\.pdf$/i,"");
  try{
    const file = new File([lastPdfBlob], lastPdfFilename, {type:"application/pdf"});
    if(navigator.canShare && navigator.canShare({files:[file]})){ await navigator.share({files:[file], title:name, text:name}); return; }
  }catch(e){ if(e && e.name==="AbortError") return; }
  dlPdf(); location.href = "mailto:?subject="+encodeURIComponent(name)+"&body="+encodeURIComponent("Bonjour,\n\nVeuillez trouver ci-joint : "+name+" (fichier téléchargé sur votre appareil, à joindre).\n\nCordialement,\n"+(dossier.cdtNom||""));
}
function dlPdf(){ const a=document.createElement("a"); a.href=lastPdfUrl; a.download=lastPdfFilename; document.body.appendChild(a); a.click(); a.remove(); }
function generatePdf(withSigs, previewOnly){
  pdfWithSigs = !!withSigs;
  try{
    if(!window.jspdf){ genMessage = {type:"error", text:"La bibliothèque PDF ne s'est pas chargée (vérifiez la connexion), réessayez."}; render(); return; }
    if(!dossier.docs.fiche && !dossier.docs.quartHeure && !dossier.docs.affichages && !dossier.docs.urgence){
      genMessage = {type:"error", text:"Aucun document sélectionné — retournez à l'étape « Documents » pour en cocher au moins un."};
      render(); return;
    }
    if(dossier.docs.fiche) dossier.sousTraitants.forEach(st => { if(!st.preview) st.preview = computePreview(st); });
    ensureThemes();

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit:"mm", format:"a4" });
    const D = new Doc(pdf);
    pdfRanges = { st:{}, qh:null };
    if(dossier.docs.fiche) dossier.sousTraitants.forEach((st,i)=>{ const a=D.pageNum+1; renderFicheIntervention(D, st, i); pdfRanges.st[st.id]=[a, D.pageNum]; });
    if(dossier.docs.quartHeure){ const a=D.pageNum+1; renderQuartHeure(D); pdfRanges.qh=[a, D.pageNum]; }
    if(dossier.docs.urgence) renderUrgence(D);
    if(dossier.docs.affichages) renderSignagePages(pdf, D.pageNum===0);

    const filename = pdfFileName() + ".pdf";
    const blob = pdf.output("blob");
    if(lastPdfUrl) URL.revokeObjectURL(lastPdfUrl);
    lastPdfUrl = URL.createObjectURL(blob);
    lastPdfBlob = blob;
    lastPdfFilename = filename;
    if(previewOnly) return true;
    pdfReady = true;
    genMessage = {type:"success", text:"PDF prêt : "+filename};
  }catch(e){
    console.error(e);
    genMessage = {type:"error", text:"Une erreur est survenue pendant la génération : "+e.message};
    if(previewOnly) return false;
  }
  render();
}


/* =========================================================================
   ACTIONS UI (exposées en global pour les attributs onclick/oninput)
   ========================================================================= */
function updateDossier(field, value){
  /* le nom du conducteur est saisi une seule fois : il pré-remplit le présentateur du 1/4h (modifiable) */
  if(field==="cdtNom"){ const q=dossier.quartHeure; if(!q.presentateur || q.presentateur===dossier.cdtNom) q.presentateur = value; }
  dossier[field] = value;
}
function renderTopbar(){
  return '<div class="topbar'+(unlocked?'':' gate-top')+'">'+
    '<div class="brand"><img src="data:image/png;base64,'+LOGO_BOX_B64+'" alt="Démarrage de chantier" style="cursor:pointer;height:28px;width:auto;" title="Retour au menu" onclick="goStep(\'select\')">'+
      '<div><div class="brand-text">Démarrage de chantier</div><div class="brand-sub">Paris Ouest Construction</div></div>'+
    '</div>'+
    (unlocked? '<div class="tb-actions" style="display:flex;gap:8px;"><button class="icon-btn" onclick="toggleSettings()">⚙ Réglages</button><button class="icon-btn" onclick="newDossier()">Nouveau dossier</button></div>'+
      '<div class="tb-menu"><button class="menu-btn" onclick="toggleMenu()" aria-label="Menu">⋯</button>'+
      (menuOpen? '<div class="menu-pop"><button onclick="menuOpen=false;toggleSettings()">⚙ Réglages</button><button onclick="menuOpen=false;newDossier()">Nouveau dossier</button></div>' : '')+
      '</div>' : '')+
  '</div>';
}

function renderGate(){
  return '<div class="gate-wrap"><div class="gate-card">'+
    '<div class="hero-band"><span class="logo-chip"><img src="data:image/png;base64,'+LOGO_BOX_B64+'" alt="Démarrage de chantier"></span>'+
      '<div><h2>Démarrage de chantier</h2><p>Paris Ouest Construction</p></div></div>'+
    '<div class="gate-body">'+
      '<div class="gate-hint">Accès réservé à l\'équipe CASVP. Saisissez le code fourni par Paris Ouest.</div>'+
      '<input type="password" placeholder="Code d\'accès" value="'+esc(gateInput)+'" oninput="updateGateInput(this.value)" onkeydown="if(event.key===\'Enter\')submitGate()" autocomplete="off">'+
      (gateError? '<div class="error-msg">'+esc(gateError)+'</div>' : '')+
      '<button class="btn" onclick="submitGate()">Entrer</button>'+
      '<p class="gate-foot">Outil créé par Jean Bourdel pour l\'équipe CASVP. Usage interne.</p>'+
    '</div>'+
  '</div></div>';
}

function renderStepSelect(){
  const tile = (key,label,desc,checked,handler)=>
    '<label class="tile'+(checked?' sel':'')+'"><input type="checkbox" '+(checked?'checked':'')+' onchange="'+handler+'">'+
    '<span class="tile-ico">'+TILE_ICONS[key]+'</span>'+
    '<span class="tile-txt"><b>'+esc(label)+'</b><small>'+esc(desc)+'</small></span><span class="tile-chk"></span></label>';
  let h = '<div class="pick-card"><div class="hero-band"><span class="logo-chip"><img src="data:image/png;base64,'+LOGO_BOX_B64+'" alt="Démarrage de chantier"></span>'+
    '<div><h2>Que faut-il préparer ?</h2><p>Cochez tout pour le dossier complet habituel, ou seulement ce dont vous avez besoin.</p></div></div><div class="pick-body"><div class="tile-grid">';
  h += tile("fiche","Fiche de 1ère intervention","Une fiche par sous-traitant (travaux, EPI, mode opératoire).",dossier.docs.fiche,"toggleDocOther('fiche', this.checked)");
  h += tile("quartHeure","1/4h sécurité","Thèmes et feuille d'émargement, communs au chantier.",dossier.docs.quartHeure,"toggleDocOther('quartHeure', this.checked)");
  h += tile("affichages","Affichages de chantier","Base vie, zone de stockage, et par zone : interdit au public + EPI.",dossier.docs.affichages,"toggleDocOther('affichages', this.checked)");
  h += tile("urgence","Fiche d'urgence","Numéros d'urgence en gros, adresse du chantier, contacts. À afficher à la base vie.",dossier.docs.urgence,"toggleDocOther('urgence', this.checked)");
  h += tile("materiel","Liste de matériel (OPC)","Commande par fournisseur pour une opération coup de poing. Incompatible avec les autres documents.",dossier.docs.materiel,"toggleDocMateriel(this.checked)");
  h += '</div>';
  const noneChecked = !dossier.docs.fiche && !dossier.docs.quartHeure && !dossier.docs.affichages && !dossier.docs.urgence && !dossier.docs.materiel;
  if(noneChecked) h += '<div class="error-msg" style="margin-top:12px;">Cochez au moins un document à générer.</div>';
  h += '<div class="row-actions"><span></span><button class="btn" '+(noneChecked?"disabled":"")+' onclick="goNext()">Continuer →</button></div>';
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

  h += '<div class="row-actions"><button class="btn secondary" onclick="goPrev()">← Retour</button><span></span></div>';
  return h;
}

function renderStep1(){
  let h = '<div class="card"><h2>Informations chantier</h2><p class="hint">Ces informations seront reprises sur les documents du dossier.</p>';
  h += '<div class="grid2">';
  h += field("Nom du chantier", dossier.nomChantier, "nomChantier", "ex. Résidence Les Lilas");
  h += field("Numéro affaire / code", dossier.affaire, "affaire", "ex. 1466-102");
  h += '</div>';
  h += field("Conducteur de travaux (votre nom)", dossier.cdtNom, "cdtNom", "ex. Jean Bourdel");
  if(adresseVisible()){
    h += field("Adresse du site d'intervention", dossier.adresse, "adresse", "ex. 12 rue de la Résidence, 75015 Paris");
  }
  if(dossier.docs.fiche){
    h += '<div class="grid3">';
    h += field("Code d'accès du chantier (porte)", dossier.codeAcces, "codeAcces", "ex. 3B45");
    h += field("Date de début", dossier.dateDebut, "dateDebut", "", "date");
    h += field("Date de fin (estimée)", dossier.dateFin, "dateFin", "", "date");
    h += '</div>';
    h += '<div class="field"><label>Site et intervention (à adapter à ce chantier)</label><textarea rows="5" placeholder="Décrivez le site et ce qui va se passer : type d\'immeuble, habitants, nombre de logements, déroulement…" oninput="dossier.siteIntervention=this.value">'+esc(dossier.siteIntervention||"")+'</textarea><p class="small-note">Texte proposé pour les opérations coup de poing : modifiez-le ou effacez-le. Vide, le PDF imprime des lignes pointillées à remplir à la main.</p></div>';
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
  h += '<div class="row-actions"><button class="btn secondary" onclick="goPrev()">← Retour</button><button class="btn" onclick="goNext()">Continuer →</button></div>';
  h += '</div>';
  return h;
}
function renderStep2(){
  const hint = dossier.docs.fiche
    ? "Ajoutez un bloc par sous-traitant. Une fiche de 1ère intervention sera générée pour chacun."
    : "Ajoutez un bloc par sous-traitant : ces informations servent à déterminer les risques et thèmes du 1/4h sécurité.";
  let h = '<div class="card"><h2>Sous-traitants intervenants</h2><p class="hint">'+hint+'</p>';
  dossier.sousTraitants.forEach((st, idx)=>{
    h += '<div class="st-card">';
    h += '<div class="st-card-head"><strong>Sous-traitant '+(idx+1)+(st.entreprise? " — "+esc(st.entreprise):"")+'</strong>';
    h += dossier.sousTraitants.length>1 ? '<button class="btn ghost" onclick="removeSousTraitant(\''+st.id+'\')">Supprimer</button>' : '';
    h += '</div>';
    h += '<div class="grid2">';
    h += stField(st.id,"Entreprise","entreprise",st.entreprise);
    h += stField(st.id,"Nom du contact","contactNom",st.contactNom);
    h += '</div><div class="grid3">';
    h += stField(st.id,"Téléphone du contact","contactTel",st.contactTel,"tel");
    h += stField(st.id,"Nombre d'ouvriers","nbOuvriers",st.nbOuvriers,"number");
    h += stField(st.id,"Dates (si différentes du chantier)","dateDebut",st.dateDebut,"date");
    h += '</div>';

    h += '<label style="margin-top:6px;">Corps de métier concernés</label><div class="check-grid">';
    CONFIG.corpsDeMetier.forEach(m=>{
      const checked = st.metiers.includes(m.id);
      h += '<label class="check-item"><input type="checkbox" '+(checked?"checked":"")+' onchange="toggleMetier(\''+st.id+'\',\''+m.id+'\',this.checked)">'+esc(m.nom)+(m._custom?'<span class="tag">personnalisé</span>':'')+'</label>';
    });
    h += '</div>';

    h += '<div class="inline-ai">';
    h += '<label>Métier absent de la liste ? Ajoutez-le manuellement :</label>';
    h += '<div class="grid2">';
    h += '<input type="text" placeholder="Nom du métier" value="'+esc(st.customNom||"")+'" oninput="const s=dossier.sousTraitants.find(x=>x.id===\''+st.id+'\'); s.customNom=this.value">';
    h += '<input type="text" placeholder="Nature des travaux" value="'+esc(st.customNature||"")+'" oninput="const s=dossier.sousTraitants.find(x=>x.id===\''+st.id+'\'); s.customNature=this.value">';
    h += '</div><div class="grid2">';
    h += '<input type="text" placeholder="Produits / matériaux" value="'+esc(st.customProduits||"")+'" oninput="const s=dossier.sousTraitants.find(x=>x.id===\''+st.id+'\'); s.customProduits=this.value">';
    h += '<input type="text" placeholder="Outillage / matériel" value="'+esc(st.customOutillage||"")+'" oninput="const s=dossier.sousTraitants.find(x=>x.id===\''+st.id+'\'); s.customOutillage=this.value">';
    h += '</div>';
    h += '<textarea rows="2" placeholder="Étapes d\'intervention (une par ligne)" oninput="const s=dossier.sousTraitants.find(x=>x.id===\''+st.id+'\'); s.customEtapes=this.value">'+esc(st.customEtapes||"")+'</textarea>';
    h += '<button class="btn secondary" style="margin-top:8px;" onclick="addCustomMetier(\''+st.id+'\')">＋ Ajouter ce métier à la fiche</button>';
    h += '<div class="small-note">Il sera coché ci-dessus. Pensez à cocher aussi les EPI/risques concernés dans la liste « Risques spécifiques au chantier » ci-dessous.</div>';
    h += '</div>';


    h += '<label style="margin-top:12px;">Risques spécifiques au chantier</label><div class="check-grid">';
    CONFIG.risques.filter(r=>RISQUES_FICHE.includes(r.id)).forEach(r=>{
      const checked = st.risques.includes(r.id);
      h += '<label class="check-item"><input type="checkbox" '+(checked?"checked":"")+' onchange="toggleRisque(\''+st.id+'\',\''+r.id+'\',this.checked)">'+esc(r.nom)+'</label>';
    });
    h += '</div>';
    if(st.risques.includes("amiante")){
      h += '<div class="field" style="margin-top:8px;"><label>Précision amiante (optionnel)</label><input type="text" value="'+esc(st.amianteNote)+'" placeholder="ex. flocage sous-plafond salle de bain" oninput="updateST(\''+st.id+'\',\'amianteNote\',this.value)"></div>';
    }
    h += '</div>';
  });
  h += '<button class="btn secondary" onclick="addSousTraitant()">＋ Ajouter un sous-traitant</button>';
  h += '<div class="row-actions"><button class="btn secondary" onclick="goPrev()">← Retour</button><button class="btn" onclick="goNext()">Continuer vers l\'aperçu →</button></div>';
  h += '</div>';
  return h;
}
function renderStep3(){
  let h = '<div class="card"><h2>Aperçu et validation des textes</h2><p class="hint">Propositions de textes, à adapter à votre chantier.</p>';
  if(dossier.docs.fiche){
    dossier.sousTraitants.forEach((st,idx)=>{
      if(!st.preview) st.preview = computePreview(st);
      h += '<div class="st-card"><div class="st-card-head"><strong>Fiche — '+esc(st.entreprise||("Sous-traitant "+(idx+1)))+'</strong></div>';
      h += previewField(st.id,"Nature des travaux","nature",st.preview.nature);
      h += previewField(st.id,"Étapes d'intervention","etapesText",st.preview.etapesText);
      h += '<div class="field"><label>Risques du chantier (## = titre, - = consigne)</label><textarea rows="6" oninput="updatePreviewField(\''+st.id+'\',\'risquesChantierText\',this.value)">'+esc(st.preview.risquesChantierText||"")+'</textarea></div>';
      h += '<div class="field"><label>Risques liés aux travaux (## = titre, - = consigne)</label><textarea rows="8" oninput="updatePreviewField(\''+st.id+'\',\'risquesMetierText\',this.value)">'+esc(st.preview.risquesMetierText||"")+'</textarea></div>';
      h += previewField(st.id,"Produits dangereux","produits",st.preview.produits);
      h += previewField(st.id,"Outils et machines dangereux","outillage",st.preview.outillage);
      h += previewField(st.id,"EPI obligatoires","epiText",st.preview.epiText);
      h += previewField(st.id,"Précautions générales","precautionsText",st.preview.precautionsText);
      h += '</div>';
    });
  }
  if(dossier.docs.quartHeure){
    h += '<div class="st-card"><div class="st-card-head"><strong>Quart d\'heure sécurité (commun au chantier)</strong></div>';
    h += '<div class="grid2">';
    h += '<div class="field"><label>Présentateur</label><input type="text" value="'+esc(dossier.quartHeure.presentateur)+'" placeholder="'+esc(dossier.cdtNom||"")+'" oninput="dossier.quartHeure.presentateur=this.value"></div>';
    h += '<div class="field"><label>Support fait par</label><input type="text" value="'+esc(dossier.quartHeure.supportPar)+'" placeholder="'+esc(dossier.cdtNom||"")+'" oninput="dossier.quartHeure.supportPar=this.value"></div>';
    h += '</div>';
    h += '<div class="field"><label>Groupe de la semaine (semaine '+isoWeek(qhDate())+')</label><select onchange="setQhGroupe(this.value)"><option value=""'+(dossier.quartHeure.groupe===""?' selected':'')+'>Automatique : groupe '+(qhAutoGroup()+1)+' - '+esc(QH_GROUPS[qhAutoGroup()].nom)+'</option>'+QH_GROUPS.map((g,i)=>'<option value="'+i+'"'+(dossier.quartHeure.groupe===i?' selected':'')+'>Groupe '+(i+1)+' - '+esc(g.nom)+'</option>').join('')+'</select></div>';
    h += '<div class="field"><label>Thèmes abordés (## = titre en gras, - = tiret)</label><textarea rows="14" oninput="updateThemesText(this.value)">'+esc(dossier.quartHeure.themesText)+'</textarea></div>';
    h += '<div class="field"><label>Particularités du chantier (1 à 2 lignes)</label><textarea rows="2" placeholder="ex. Résidence occupée : prévenir le gardien avant de couper l\'eau." oninput="dossier.quartHeure.siteLine=this.value">'+esc(dossier.quartHeure.siteLine||"")+'</textarea><p class="small-note">Si vous laissez vide, le PDF imprime deux lignes pointillées à remplir à la main.</p></div>';
    h += '</div>';
  }
  h += '<div class="row-actions"><button class="btn secondary" onclick="goPrev()">← Retour</button><button class="btn" onclick="goNext()">Continuer →</button></div>';
  h += '</div>';
  return h;
}
function renderStep4(){
  if(signMode) return renderSignatures();
  let h = '<div class="card"><h2>Génération du PDF</h2>';
  const parts = [];
  if(dossier.docs.fiche) parts.push(dossier.sousTraitants.length+" fiche(s) de 1ère intervention");
  if(dossier.docs.quartHeure) parts.push("le 1/4h sécurité (avec émargement)");
  if(dossier.docs.urgence) parts.push("la fiche d'urgence");
  if(dossier.docs.affichages){
    const nz = Math.max(0, parseInt(dossier.nbZones)||0);
    parts.push("les affichages (base vie, stockage"+(nz>0?", + "+nz+" zone(s) interdit/EPI":"")+")");
  }
  h += '<p class="hint">Le PDF contiendra : '+parts.join(" + ")+'. Il sera prêt à imprimer.</p>';
  if(genMessage){
    h += '<div class="'+(genMessage.type==="error"?"err-banner":"success-banner")+'">'+esc(genMessage.text)+'</div>';
  }
  if(pdfReady && lastPdfBlob){
    h += '<button class="btn" style="width:100%;margin:6px 0 10px;" onclick="sharePdf()">✉ Partager par mail</button>';
    h += '<button class="btn secondary" style="width:100%;" onclick="dlPdf()">⬇ Télécharger le PDF</button>';
    h += '<p class="small-note">« Partager » ouvre le menu du téléphone : choisissez votre messagerie ou Drive, le PDF part en pièce jointe avec son nom.</p>';
    h += '<div id="pvfinal" class="pv" style="margin-top:12px;"></div>';
    h += '<details style="margin-top:12px;"><summary>Refaire le PDF</summary><div class="gen-choice" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px;"><button class="btn secondary" onclick="generatePdf()">⚙ PDF seul (à imprimer)</button><button class="btn secondary" onclick="startSigning()">✍ PDF avec signatures</button></div></details>';
  } else {
    h += '<div class="gen-choice" style="display:flex;gap:10px;flex-wrap:wrap;"><button class="btn" onclick="generatePdf()">⚙ PDF seul (à imprimer)</button><button class="btn secondary" onclick="startSigning()">✍ PDF avec signatures</button></div>';
  }
  h += '<div class="row-actions" style="margin-top:20px;"><button class="btn secondary" onclick="goPrev()">← Retour modifier</button><button class="btn secondary" onclick="newDossier()">Nouveau dossier</button></div>';
  h += '</div>';
  return h;
}

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
      h += admField('Étapes (une par ligne)','<textarea rows="5" oninput="updateMetierField('+q+',\'etapes\',this.value)">'+esc((cur.etapes||[]).join("\n"))+'</textarea>');
      h += admField('Risques et consignes (## titre, - consigne)','<textarea rows="8" oninput="updateMetierField('+q+',\'risquesTexte\',this.value)">'+esc(cur.risquesTexte||"")+'</textarea>');
      h += admField('Produits dangereux (séparés par des virgules)','<textarea rows="2" oninput="updateMetierField('+q+',\'produits\',this.value)">'+esc(cur.produits)+'</textarea>');
      h += admField('Outils dangereux (séparés par des virgules)','<textarea rows="2" oninput="updateMetierField('+q+',\'outillage\',this.value)">'+esc(cur.outillage)+'</textarea>');
      h += admField('EPI du métier (noms, virgules)','<textarea rows="2" oninput="updateMetierField('+q+',\'epi\',this.value)">'+esc(idsToNames(cur.epi,CONFIG.epi))+'</textarea>');
      h += admField('Risques liés (noms, virgules)','<textarea rows="2" oninput="updateMetierField('+q+',\'risques\',this.value)">'+esc(idsToNames(cur.risques,CONFIG.risques))+'</textarea>');
    }
    h += '<div><button class="btn secondary" onclick="addMetierRow()">＋ Ajouter un métier</button> <button class="btn ghost" onclick="deleteMetierRow(\''+(cur?cur.id:'')+'\')">Retirer ce métier</button></div></div></div>';
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
    h += '<div><button class="btn secondary" onclick="addRisqueRow()">＋ Ajouter un risque</button> <button class="btn ghost" onclick="deleteRisqueRow(\''+(cur?cur.id:'')+'\')">Retirer ce risque</button></div></div></div>';
  }
  if(settingsTab==="epi"){
    h += '<table class="cfg"><tr><th>Nom</th><th>Statut</th><th></th></tr>';
    CONFIG.epi.forEach(e=>{
      h += '<tr>'+td('<input type="text" value="'+esc(e.nom)+'" oninput="updateEpiField(\''+e.id+'\',\'nom\',this.value)">')+
        td('<select onchange="updateEpiField(\''+e.id+'\',\'statut\',this.value)"><option value="systematique" '+(e.statut==="systematique"?"selected":"")+'>Systématique</option><option value="conditionnel" '+(e.statut==="conditionnel"?"selected":"")+'>Conditionnel</option></select>')+
        td('<button class="btn ghost" onclick="deleteEpiRow(\''+e.id+'\')">✕</button>')+'</tr>';
    });
    h += '</table><button class="btn secondary" onclick="addEpiRow()">＋ Ajouter un EPI</button>';
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
  let html = renderTopbar();
  if(!unlocked){
    html += renderGate();
  } else if(settingsOpen){
    html += '<main>'+renderSettings()+'</main>';
  } else {
    html += '<main>'+renderStepper();
    if(currentStep==="select") html += renderStepSelect();
    if(currentStep==="chantier") html += renderStep1();
    if(currentStep==="sous-traitants") html += renderStep2();
    if(currentStep==="apercu") html += renderStep3();
    if(currentStep==="pdf") html += renderStep4();
    if(currentStep==="materiel") html += renderStepMateriel();
    html += '</main>';
    html += '<div class="footer-note">Paris Ouest Construction — outil interne créé par Jean Bourdel pour l\'équipe CASVP. Ne pas diffuser en dehors de l\'équipe. <span style="opacity:.7">Version 83 · web et mobile · 12/11/2026</span></div>';
  }
  app.innerHTML = html;
  if(currentStep!=="pdf"){ signMode = false; pdfReady = false; }
  if(currentStep==="pdf" && pdfReady && !signMode && lastPdfBlob) pdfShowPages(lastPdfBlob, lastPdfUrl, [{boxId:"pvfinal", from:1, to:999}]);
  if(signMode && currentStep==="pdf") initSignatures();
}

/* =========================================================================
   INSTALLATION "APP" (icône sur écran d'accueil, PWA) — réutilise le logo
   déjà chargé en JS (LOGO_B64) au lieu de le dupliquer dans le HTML.
   ========================================================================= */
function setupPWATags(){
  try{
    const iconDataUrl = "data:image/png;base64,"+SITE_ICON_B64;
    const manifest = {
      name: "Paris Ouest — Démarrage de chantier",
      short_name: "Chantier PO",
      start_url: ".",
      display: "standalone",
      background_color: "#FAF9F7",
      theme_color: "#EA4F00",
      icons: [{ src: iconDataUrl, sizes: "512x512", type: "image/png", purpose: "any maskable" }]
    };
    const manifestUrl = "data:application/manifest+json," + encodeURIComponent(JSON.stringify(manifest));
    const addLink = (rel, href)=>{ const l=document.createElement("link"); l.rel=rel; l.href=href; document.head.appendChild(l); };
    const addMeta = (name, content)=>{ const m=document.createElement("meta"); m.name=name; m.content=content; document.head.appendChild(m); };
    addLink("manifest", manifestUrl);
    addLink("apple-touch-icon", iconDataUrl);
    addLink("icon", iconDataUrl);
    addMeta("theme-color", "#EA4F00");
    addMeta("mobile-web-app-capable", "yes");
    addMeta("apple-mobile-web-app-capable", "yes");
    addMeta("apple-mobile-web-app-title", "Chantier PO");
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
