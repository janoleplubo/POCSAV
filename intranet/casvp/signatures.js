/* Signatures sur tablette/téléphone — CASVP.
   Choix à la dernière étape : PDF seul (à imprimer) ou PDF avec signatures. */
let signMode = false;
function sigToday(){ const d=new Date(); return String(d.getDate()).padStart(2,"0")+"/"+String(d.getMonth()+1).padStart(2,"0")+"/"+d.getFullYear(); }

function startSigning(){
  // participants du 1/4h : pré-remplis avec l'effectif de chaque entreprise (une seule fois)
  const qh = dossier.quartHeure; if(!qh.participants) qh.participants = [];
  if(!qh.participants.length){
    dossier.sousTraitants.forEach(st=>{ const n=Math.min(30, parseInt(st.nbOuvriers)||0); for(let i=0;i<n;i++) qh.participants.push({nom:"", entreprise:st.entreprise||"", sig:null}); });
    if(!qh.participants.length) qh.participants.push({nom:"", entreprise:"", sig:null});
  }
  signMode = true; genMessage = null; window.scrollTo(0,0); render();
}
function stopSigning(){ signMode = false; window.scrollTo(0,0); render(); }
function stById(id){ return dossier.sousTraitants.find(s=>s.id===id); }
function sigStSet(id, field, v){ const st=stById(id); if(st) st[field]=v; }
function sigPartSet(i, field, v){ const p=dossier.quartHeure.participants[i]; if(p) p[field]=v; }
function addPart(){ dossier.quartHeure.participants.push({nom:"", entreprise:"", sig:null}); render(); window.scrollTo(0,document.body.scrollHeight); }
function delPart(i){ dossier.quartHeure.participants.splice(i,1); render(); }

function sigBox(id, hasSig, clearCall){
  return '<label>Signature (au doigt)</label><canvas class="sigbox" id="'+id+'"></canvas>'
    + '<div class="sig-actions"><button class="btn ghost" onclick="'+clearCall+'">Effacer</button><span class="signed" id="'+id+'_ok">'+(hasSig?"Signature enregistrée":"")+'</span></div>';
}
function renderSignatures(){
  let h = '<div class="card"><h2>Signatures</h2><p class="hint">Faites signer au doigt. Le PDF sera généré avec les signatures, les noms et la date du jour.</p>';
  if(dossier.docs.fiche){
    h += '<div class="sig-zone"><h3>Fiches de 1ère intervention</h3><p class="hint">'+esc(CONFIG.textes.attestation)+'</p>';
    dossier.sousTraitants.forEach((st,i)=>{
      h += '<div class="st-card"><strong>'+esc(st.entreprise||("Sous-traitant "+(i+1)))+'</strong>'
        + '<div class="field"><label>Prénom et nom du signataire (pour ses compagnons)</label><input type="text" autocomplete="name" value="'+esc(st.sigNom||"")+'" oninput="sigStSet(\''+st.id+'\',\'sigNom\',this.value)"></div>'
        + sigBox("sigst_"+st.id, !!st.sigEnt, "signPadClear('sigst_"+st.id+"',v=>{sigStSet('"+st.id+"','sigEnt',v);document.getElementById('sigst_"+st.id+"_ok').textContent=''})")
        + '</div>';
    });
    h += '<div class="st-card"><strong>Le conducteur de travaux'+(dossier.cdtNom?' — '+esc(dossier.cdtNom):'')+'</strong>'
      + sigBox("sigcdt", !!dossier.sigCdt, "signPadClear('sigcdt',v=>{dossier.sigCdt=v;document.getElementById('sigcdt_ok').textContent=''})")
      + '<p class="small-note">Cette signature sera reprise sur toutes les fiches.</p></div></div>';
  }
  if(dossier.docs.quartHeure){
    h += '<div class="sig-zone"><h3>1/4h sécurité — émargement</h3><p class="hint">Chaque participant écrit son prénom et nom, puis signe au doigt.</p>';
    dossier.quartHeure.participants.forEach((q,i)=>{
      h += '<div class="st-card"><strong>Participant '+(i+1)+'</strong>'
        + '<div class="row2"><div class="field"><label>Prénom et nom</label><input type="text" autocomplete="name" value="'+esc(q.nom)+'" oninput="sigPartSet('+i+',\'nom\',this.value)"></div>'
        + '<div class="field"><label>Entreprise</label><input type="text" value="'+esc(q.entreprise)+'" oninput="sigPartSet('+i+',\'entreprise\',this.value)"></div></div>'
        + sigBox("sigqh_"+i, !!q.sig, "signPadClear('sigqh_"+i+"',v=>{sigPartSet("+i+",'sig',v);document.getElementById('sigqh_"+i+"_ok').textContent=''})")
        + '<button class="btn ghost" onclick="delPart('+i+')">Retirer ce participant</button></div>';
    });
    h += '<button class="btn secondary" onclick="addPart()">Ajouter un participant</button></div>';
  }
  h += '<div class="row-actions" style="margin-top:20px;"><button class="btn secondary" onclick="stopSigning()">← Retour</button><button class="btn" onclick="finishSigning()">Générer le PDF signé</button></div></div>';
  return h;
}
function initSignatures(){
  const ok = id=>{ const s=document.getElementById(id+"_ok"); if(s) s.textContent="Signature enregistrée"; };
  if(dossier.docs.fiche){
    dossier.sousTraitants.forEach(st=>signPadInit("sigst_"+st.id, st.sigEnt, v=>{ st.sigEnt=v; ok("sigst_"+st.id); }));
    signPadInit("sigcdt", dossier.sigCdt, v=>{ dossier.sigCdt=v; ok("sigcdt"); });
  }
  if(dossier.docs.quartHeure) dossier.quartHeure.participants.forEach((q,i)=>signPadInit("sigqh_"+i, q.sig, v=>{ q.sig=v; ok("sigqh_"+i); }));
}
function finishSigning(){
  const manque = [];
  if(dossier.docs.fiche) dossier.sousTraitants.forEach(st=>{ if(!st.sigEnt||!(st.sigNom||"").trim()) manque.push("signataire "+(st.entreprise||"entreprise")); });
  if(dossier.docs.fiche && !dossier.sigCdt) manque.push("conducteur");
  if(dossier.docs.quartHeure) dossier.quartHeure.participants.forEach((q,i)=>{ if(!q.sig||!(q.nom||"").trim()) manque.push("participant "+(i+1)); });
  if(manque.length && !confirm(manque.length+" signature(s) ou nom(s) manquant(s) : "+manque.join(", ")+". Générer quand même ?")) return;
  signMode = false; generatePdf(true);
}
