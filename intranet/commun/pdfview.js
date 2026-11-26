/* Affichage de pages d'un PDF dans la page (pdf.js, chargé depuis cdnjs au premier usage).
   Si pdf.js n'est pas joignable : repli sur le lecteur PDF du navigateur (iframe). */
function loadPdfjs(){ return new Promise((ok,ko)=>{
  if(window.pdfjsLib && window.__pdfWorkerOk) return ok();
  const V="3.11.174", B="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/"+V+"/";
  const go=()=>fetch(B+"pdf.worker.min.js").then(r=>{ if(!r.ok) throw new Error("worker"); return r.text(); })
    .then(txt=>{ pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([txt],{type:"text/javascript"})); window.__pdfWorkerOk=true; ok(); }).catch(ko);
  if(window.pdfjsLib) return go();
  const s=document.createElement("script"); s.src=B+"pdf.min.js"; s.onload=go; s.onerror=ko; document.head.appendChild(s); }); }
/* jobs : [{ boxId, from, to }] — dessine les pages from..to du blob dans l'élément boxId */
async function pdfShowPages(blob, url, jobs){
  try{
    await loadPdfjs();
    const doc = await pdfjsLib.getDocument({data: await blob.arrayBuffer()}).promise;
    for(const j of jobs){
      const box = document.getElementById(j.boxId); if(!box) continue; box.innerHTML = "";
      for(let n=j.from; n<=Math.min(j.to, doc.numPages); n++){
        const pg = await doc.getPage(n), v0 = pg.getViewport({scale:1});
        const sc = Math.min(2.2, (box.clientWidth||360)*Math.max(1,window.devicePixelRatio||1)/v0.width), vp = pg.getViewport({scale:sc});
        const cv = document.createElement("canvas"); cv.width = vp.width; cv.height = vp.height; box.appendChild(cv);
        await pg.render({canvasContext: cv.getContext("2d"), viewport: vp}).promise;
      }
    }
  }catch(e){
    const first = jobs.length && document.getElementById(jobs[0].boxId);
    if(first) first.innerHTML = '<iframe class="pdf" style="width:100%;height:70vh;border:1px solid #ccc" src="'+url+'#view=FitH"></iframe>';
  }
}
