/* Fabrication du PDF : classe Doc commune à toutes les applis.
   Chaque appli définit DOC_SPACE (reglages-config.js) : place réservée avant un bloc / un bandeau. */
let pdfWithSigs = false; /* vrai quand on génère le PDF avec les signatures saisies à l'écran */
class Doc{
  constructor(pdf){
    this.pdf = pdf; this.margin = 16; this.pageW = 210; this.pageH = 297;
    this.contentW = this.pageW - this.margin*2; this.pageNum = 0; this.y = this.margin;
  }
  newPage(){
    const p=this.pdf; let keep=null;
    try{ const f=p.getFont(); keep={ name:f.fontName, style:f.fontStyle, size:p.getFontSize(), color:p.getTextColor() }; }catch(e){}
    if(this.pageNum>0) this.pdf.addPage();
    this.pageNum++; this.y = this.margin;
    p.setFillColor(234,79,0); p.rect(0, 0, 3, this.pageH, "F");
    if(this.showFooter!==false) this.footer();
    // le pied de page change police, taille et couleur : on les remet comme avant le saut de page
    if(keep){ try{ p.setFont(keep.name, keep.style); p.setFontSize(keep.size); p.setTextColor(keep.color); }catch(e){} }
  }
  footer(){
    const p=this.pdf;
    p.setFont("helvetica","normal"); p.setFontSize(7); p.setTextColor(130,130,130);
    p.text("SOCIÉTÉ ANONYME AU CAPITAL DE 2.000.000 € - R.C.S. PARIS 542 062 617 B - SIRET 542 062 617 00031 - CODE APE : 452 B", this.margin, this.pageH-14);
    p.text("TVA intracommunautaire : FR 32 542 062 617", this.margin, this.pageH-10);
    p.setFont("helvetica","normal"); p.setFontSize(9); p.setTextColor(90,90,90);
    p.text(String(this.pageNum), this.pageW-this.margin, this.pageH-10.5, {align:"right"});
    p.setTextColor(30,30,30);
  }
  ensureSpace(h){ if(this.y + h > this.pageH - 20){ this.newPage(); } }
  header(title, subtitle){
    const p=this.pdf;
    try{ p.addImage(LOGO_B64, "PNG", this.margin, this.y, 20, 20); }catch(e){}
    p.setFont("helvetica","bold"); p.setFontSize(SZ.title);
    const ex = title.indexOf("ère");
    if(ex>0){
      const a = title.slice(0,ex), z = title.slice(ex+3); let x = this.margin+26;
      p.text(a, x, this.y+9); x += p.getTextWidth(a);
      p.setFontSize(SZ.title*0.58); p.text("ère", x, this.y+9-2.6); x += p.getTextWidth("ère");
      p.setFontSize(SZ.title); p.text(z, x, this.y+9);
    } else p.text(title, this.margin+26, this.y+9);
    if(subtitle){
      p.setFont("helvetica","italic"); p.setFontSize(SZ.subtitle); p.setTextColor(110,110,110);
      const lines = p.splitTextToSize(subtitle, this.contentW-26);
      p.text(lines, this.margin+26, this.y+15.5);
      p.setTextColor(30,30,30);
    }
    this.y += 23;
    p.setDrawColor(234,79,0); p.setLineWidth(0.7);
    p.line(this.margin, this.y, this.pageW-this.margin, this.y);
    p.setLineWidth(0.2);
    this.y += 7;
  }
  subheading(text){
    this.ensureSpace(DOC_SPACE.a); const p=this.pdf;
    if(!this._ab) this.y += 3.5;
    this._ab = false;
    p.setFont("helvetica","bold"); p.setFontSize(SZ.subhead); p.setTextColor(20,20,20);
    p.text(text, this.margin, this.y);
    const w = p.getTextWidth(text);
    p.setDrawColor(20,20,20); p.setLineWidth(0.25); p.line(this.margin, this.y+1.3, this.margin+w, this.y+1.3);
    p.setTextColor(30,30,30);
    this.y += 6.5;
  }
  paragraph(text, opts){
    opts = opts||{};
    const p=this.pdf;
    p.setFont("helvetica", opts.bold?"bold":(opts.italic?"italic":"normal"));
    p.setFontSize(opts.size||SZ.body);
    const lines = p.splitTextToSize(String(text||""), this.contentW);
    lines.forEach(line=>{ this.ensureSpace(6); p.text(line, this.margin, this.y); this.y += (opts.lh||5.4); });
    this.y += (opts.gapAfter!==undefined?opts.gapAfter:2.5);
  }
  bullets(items, opts){
    opts = opts||{};
    const p=this.pdf; const size=opts.size||SZ.body; const lh=opts.lh||5.2;
    p.setFont("helvetica","normal"); p.setFontSize(size);
    (items||[]).forEach(it=>{
      const lines = p.splitTextToSize(String(it), this.contentW-6);
      lines.forEach((line,i)=>{
        this.ensureSpace(lh+0.4);
        p.text((i===0?"•  ":"    ")+line, this.margin, this.y);
        this.y += lh;
      });
    });
    this.y += (opts.gapAfter!==undefined?opts.gapAfter:2.5);
  }
  stepsBlock(text){
    const p=this.pdf;
    const lines = splitLinesArr(text);
    lines.forEach(line=>{
      const isHeading = /:\s*$/.test(line.trim());
      p.setFont("helvetica","normal");
      p.setFontSize(SZ.body);
      if(isHeading){ p.setTextColor(196,67,0); this.y += 1; }
      const wrapped = p.splitTextToSize(line, this.contentW);
      wrapped.forEach(w=>{
        this.ensureSpace(5.8);
        p.text(w, this.margin, this.y);
        this.y += isHeading?5.6:5.2;
      });
      if(isHeading) p.setTextColor(30,30,30);
    });
    this.y += 2.5;
  }
  listBlock(text){
    const p=this.pdf;
    const lines = splitLinesArr(text);
    lines.forEach(line=>{
      const isHeading = /:\s*$/.test(line.trim());
      if(isHeading){
        p.setFont("helvetica","normal"); p.setFontSize(SZ.body); p.setTextColor(196,67,0);
        this.ensureSpace(6); this.y += 1;
        const wrapped = p.splitTextToSize(line, this.contentW);
        wrapped.forEach(w=>{ this.ensureSpace(5.6); p.text(w, this.margin, this.y); this.y += 5.6; });
        p.setTextColor(30,30,30);
      } else {
        this.bullets(splitCommaArr(line).map(t=>t.charAt(0).toUpperCase()+t.slice(1)), {gapAfter:1});
      }
    });
    this.y += 1.5;
  }
  keyValue(label, value){
    const p=this.pdf; this.ensureSpace(6);
    p.setFont("helvetica","bold"); p.setFontSize(SZ.label);
    p.text(label+" :", this.margin, this.y);
    const labelW = p.getTextWidth(label+" :  ");
    p.setFont("helvetica","normal");
    const lines = p.splitTextToSize(String(value===undefined||value===null||value===""?"—":value), this.contentW-labelW-2);
    p.text(lines[0]||"—", this.margin+labelW+2, this.y);
    this.y += 5.4;
    for(let i=1;i<lines.length;i++){ this.ensureSpace(5.4); p.text(lines[i], this.margin+labelW+2, this.y); this.y += 5.4; }
    this.y += 1;
  }
  infoCols(left, right, wl){
    const p=this.pdf; const W=this.contentW, wL=wl||W*0.58, wR=W-wL-6; let yl=this.y, yr=this.y;
    const draw=(items,x,w,right,y0)=>{ let y=y0;
      items.forEach(it=>{
        const lab=it[0]+" : "; const val=String(it[1]===undefined||it[1]===null||it[1]===""?"—":it[1]);
        p.setFont("helvetica","normal"); p.setFontSize(10);
        const ls=p.splitTextToSize(lab+val, w);
        ls.forEach((l,k)=>{
          const lw=p.getTextWidth(l); const x0=right? x+w-lw : x;
          if(k===0 && l.startsWith(lab)){ p.setTextColor(110,110,110); p.text(lab,x0,y); p.setTextColor(30,30,30); p.text(l.slice(lab.length), x0+p.getTextWidth(lab)+0.9, y); }
          else { p.setTextColor(30,30,30); p.text(l,x0,y); }
          y+=5; });
        y+=1.6; });
      return y; };
    yl=draw(left,this.margin,wL,false,this.y);
    yr=draw(right,this.margin+W-wR,wR,true,this.y);
    this.y=Math.max(yl,yr);
  }
  keyValueRow(pairs){
    const p=this.pdf; this.ensureSpace(5.6); const colW = this.contentW/pairs.length;
    pairs.forEach((pair,i)=>{
      const x = this.margin + i*colW;
      p.setFont("helvetica","bold"); p.setFontSize(SZ.label);
      p.text(pair[0]+" :", x, this.y);
      const labelW = p.getTextWidth(pair[0]+" :  ");
      p.setFont("helvetica","normal");
      const val = String(pair[1]===undefined||pair[1]===null||pair[1]===""?"—":pair[1]);
      const lines = p.splitTextToSize(val, colW-labelW-4);
      p.text(lines[0]||"—", x+labelW+2, this.y);
    });
    this.y += 5.6;
  }
  banner(text){
    this.ensureSpace(DOC_SPACE.banner); const p=this.pdf; this._ab = true;
    p.setFillColor(234,79,0); p.rect(this.margin, this.y, this.contentW, 9.5, "F");
    p.setTextColor(255,255,255); p.setFont("helvetica","bold"); p.setFontSize(SZ.banner);
    p.text(text, this.margin+3.5, this.y+6.6);
    p.setTextColor(30,30,30); this.y += 14.5;
  }
  signatureTable(rows){
    const p=this.pdf; const colW=[32,32,50,this.contentW-114]; const rowH=TABLE_ROW_H;
    const totalW = colW.reduce((a,b)=>a+b,0);
    if(pdfWithSigs && dossier.quartHeure.participants) rows=Math.max(rows, dossier.quartHeure.participants.length);
    this.ensureSpace(rowH+9);
    let cx=this.margin;
    const headerLabels = ["Prénom","Nom","Signature","Entreprise"];
    headerLabels.forEach((h,i)=>{
      p.setFillColor(234,79,0);
      p.setDrawColor(234,79,0);
      p.rect(cx,this.y,colW[i],TABLE_HEADER_H,"FD");
      p.setFont("helvetica","bold");
      p.setFontSize(SZ.body);
      p.setTextColor(255,255,255);
      p.text(String(h), cx+3, this.y+5.9);
      cx+=colW[i];
    });
    this.y += TABLE_HEADER_H; p.setTextColor(30,30,30); p.setFont("helvetica","normal"); p.setDrawColor(210,206,199);
    for(let r=0;r<rows;r++){
      this.ensureSpace(rowH);
      cx=this.margin;
      if(r%2===1){ p.setFillColor(250,244,238); p.rect(this.margin,this.y,totalW,rowH,"F"); }
      colW.forEach(w=>{ p.setDrawColor(210,206,199); p.rect(cx,this.y,w,rowH,"S"); cx+=w; });
      const q = pdfWithSigs && dossier.quartHeure.participants && dossier.quartHeure.participants[r];
      if(q){ const nm=splitNom(q.nom); p.setFont("helvetica","normal"); p.setFontSize(SZ.body); p.setTextColor(30,30,30);
        p.text(String(nm.prenom), this.margin+3, this.y+rowH/2+1.4); p.text(String(nm.nom), this.margin+colW[0]+3, this.y+rowH/2+1.4);
        p.text(p.splitTextToSize(String(q.entreprise||""), colW[3]-4)[0]||"", this.margin+colW[0]+colW[1]+colW[2]+3, this.y+rowH/2+1.4);
        if(q.sig) pdfFitImage(p, q.sig, this.margin+colW[0]+colW[1]+2, this.y+0.6, colW[2]-4, rowH-1.2); }
      this.y += rowH;
    }
  }
  // Tableau générique (en-tête + lignes), avec retour à la ligne et pagination automatique.
  // headers: string[] ; rows: string[][] ; colW: number[] (mm, somme <= contentW) ; aligns: ("left"|"right")[] optionnel
  table(headers, rows, colW, aligns){
    const p=this.pdf; const headerH=7.2;
    const totalW = colW.reduce((a,b)=>a+b,0);
    const drawHeader = ()=>{
      this.ensureSpace(headerH+6);
      let cx=this.margin;
      headers.forEach((h,i)=>{
        p.setFillColor(234,79,0); p.setDrawColor(234,79,0);
        p.rect(cx,this.y,colW[i],headerH,"FD");
        p.setFont("helvetica","bold"); p.setFontSize(SZ.body-0.5); p.setTextColor(255,255,255);
        const align = aligns&&aligns[i];
        if(align==="right") p.text(String(h), cx+colW[i]-2.5, this.y+5.0, {align:"right"});
        else p.text(String(h), cx+2.5, this.y+5.0);
        cx+=colW[i];
      });
      this.y += headerH; p.setTextColor(30,30,30); p.setDrawColor(210,206,199);
    };
    drawHeader();
    p.setFont("helvetica","normal"); p.setFontSize(SZ.body-0.5);
    rows.forEach((row,r)=>{
      const wrapped = row.map((cell,i)=> p.splitTextToSize(String(cell===undefined||cell===null?"":cell), colW[i]-5));
      const maxLines = Math.max(1, ...wrapped.map(w=>w.length));
      const rowH = 4.6*maxLines + 2.4;
      if(this.y + rowH > this.pageH - 20){ this.newPage(); drawHeader(); p.setFont("helvetica","normal"); p.setFontSize(SZ.body-0.5); }
      let cx=this.margin;
      if(r%2===1){ p.setFillColor(250,244,238); p.rect(this.margin,this.y,totalW,rowH,"F"); }
      wrapped.forEach((lines,i)=>{
        p.setDrawColor(210,206,199); p.rect(cx,this.y,colW[i],rowH,"S");
        const align = aligns&&aligns[i];
        lines.forEach((line,li)=>{
          const ty = this.y+4.4+li*4.6;
          if(align==="right") p.text(line, cx+colW[i]-2.5, ty, {align:"right"});
          else p.text(line, cx+2.5, ty);
        });
        cx+=colW[i];
      });
      this.y += rowH;
    });
    this.y += 2;
  }
}
