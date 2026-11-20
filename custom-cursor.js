(()=>{
const fine=matchMedia('(hover:hover) and (pointer:fine)');if(!fine.matches)return;
const root=document.documentElement,cursor=document.createElement('img');cursor.className='custom-cursor';cursor.alt='';cursor.setAttribute('aria-hidden','true');
let point;try{point=JSON.parse(sessionStorage.getItem('kayla-cursor-position'))}catch{}
let x=point?.x??innerWidth/2,y=point?.y??innerHeight/2,frame=0;
function theme(){const page=root.dataset.cursor;const name=page==='about'?'yellow':page==='playground'?'ice':root.dataset.mode==='games'?'pink':'blue';cursor.src='assets/cursors/'+name+'.svg';cursor.dataset.kind=name==='pink'?'circle':'arrow'}
function paint(){cursor.style.transform='translate3d('+x+'px,'+y+'px,0)';frame=0}
theme();paint();document.body.append(cursor);root.classList.add('custom-cursor-ready');
function save(){try{sessionStorage.setItem('kayla-cursor-position',JSON.stringify({x,y}))}catch{}}
addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;x=e.clientX;y=e.clientY;cursor.hidden=false;if(!frame)frame=requestAnimationFrame(paint);save()},{passive:true});
addEventListener('pointerdown',e=>{x=e.clientX;y=e.clientY;paint();save()},{passive:true});
document.addEventListener('pointerout',e=>{if(!e.relatedTarget)cursor.hidden=true});
addEventListener('pageshow',()=>{cursor.hidden=false;theme();paint()});addEventListener('pagehide',save);
new MutationObserver(theme).observe(root,{attributes:true,attributeFilter:['data-mode']});
// Modal dialogs occupy the browser top layer; keep the cursor in that layer too.
const dialogs=[...document.querySelectorAll('dialog')];const observer=new MutationObserver(()=>{const open=dialogs.filter(d=>d.open).pop();(open||document.body).append(cursor)});dialogs.forEach(d=>observer.observe(d,{attributes:true,attributeFilter:['open']}));
})();
