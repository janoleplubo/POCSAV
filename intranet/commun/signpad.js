/* Zone de signature au doigt (canvas) — réutilisable par toute appli.
   signPadInit(id, valeurInitiale, onChange) : branche le dessin sur <canvas id="...">.
   onChange(dataUrl) est appelé à la fin de chaque trait ; signPadClear(id, onChange) efface. */
function signPadInit(id, initial, onChange){
  const cv = document.getElementById(id); if(!cv) return;
  const r = cv.getBoundingClientRect(), dpr = Math.max(1, window.devicePixelRatio||1);
  cv.width = Math.round(r.width*dpr); cv.height = Math.round(r.height*dpr);
  const g = cv.getContext("2d"); g.scale(dpr,dpr); g.lineWidth=2.6; g.lineCap="round"; g.lineJoin="round"; g.strokeStyle="#111";
  if(initial){ const im=new Image(); im.onload=()=>g.drawImage(im,0,0,r.width,r.height); im.src=initial; }
  let drawing=false, last=null;
  const pos = e=>{ const b=cv.getBoundingClientRect(); return {x:e.clientX-b.left, y:e.clientY-b.top}; };
  cv.onpointerdown = e=>{ drawing=true; last=pos(e); cv.setPointerCapture(e.pointerId); g.beginPath(); g.moveTo(last.x,last.y); g.lineTo(last.x+0.1,last.y+0.1); g.stroke(); e.preventDefault(); };
  cv.onpointermove = e=>{ if(!drawing) return; const p=pos(e); g.beginPath(); g.moveTo(last.x,last.y); g.lineTo(p.x,p.y); g.stroke(); last=p; e.preventDefault(); };
  const end = ()=>{ if(!drawing) return; drawing=false;
    const tc=document.createElement("canvas"); tc.width=560; tc.height=Math.round(560*cv.height/cv.width);
    tc.getContext("2d").drawImage(cv,0,0,tc.width,tc.height); onChange(tc.toDataURL("image/png")); };
  cv.onpointerup=end; cv.onpointercancel=end; cv.onpointerleave=end;
}
function signPadClear(id, onChange){
  const cv = document.getElementById(id); if(!cv) return;
  const g = cv.getContext("2d"); g.save(); g.setTransform(1,0,0,1,0,0); g.clearRect(0,0,cv.width,cv.height); g.restore();
  onChange(null);
}
/* Prénom et nom saisis dans une seule case : 1er mot = prénom, le reste = nom */
function splitNom(full){ const t=String(full||"").trim().replace(/\s+/g," "); const i=t.indexOf(" "); return i<0?{prenom:t,nom:""}:{prenom:t.slice(0,i),nom:t.slice(i+1)}; }
/* Dessine une signature (image) dans un cadre sans la déformer */
function pdfFitImage(p, data, x, y, w, h){
  try{ const ip=p.getImageProperties(data); const k=Math.min(w/ip.width,h/ip.height); const iw=ip.width*k, ih=ip.height*k;
    p.addImage(data,"PNG",x+(w-iw)/2,y+(h-ih)/2,iw,ih); }catch(e){}
}
