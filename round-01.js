const root=document.documentElement;
const gallery=document.querySelector('.gallery');
const toggle=document.querySelector('.mode-switch');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const stops=[...document.querySelectorAll('.intro,.piece,.outro')];
const fields={product:['Product<br>design world.','Thoughtful products.<br>A little unexpected delight.','Digital experiences','Product design','Making room for clarity','Tools & systems','Small everyday rituals','Mobile experiences'],games:['Interactive<br>& game world.','A playful mind.<br>A different kind of experience.','Play in your pocket','Game design','Beyond the screen','Interactive installations','Worlds worth exploring','Games & visual design']};
let current=0;
function setMode(mode,writeURL=true){
 const game=mode==='games';root.dataset.mode=game?'games':'product';
 const copy=fields[root.dataset.mode];
 ['headline','intro-copy','first-title','first-type','second-title','second-type','third-title','third-type'].forEach((id,i)=>document.getElementById(id).innerHTML=copy[i]);
 toggle.setAttribute('aria-checked',String(game));
 document.querySelector('meta[name="theme-color"]').content=game?'#100d1c':'#faf9f5';
 document.querySelector('#announcement').textContent=game?'Interactive and game design gallery.':'Product design gallery.';
 if(writeURL){const url=new URL(location.href);url.searchParams.set('mode',root.dataset.mode);history.pushState({},'',url)}
 gallery.scrollTo({left:0,behavior:'instant'});updateIndex();
}
toggle.addEventListener('click',()=>setMode(root.dataset.mode==='games'?'product':'games'));
addEventListener('popstate',()=>setMode(new URLSearchParams(location.search).get('mode'),false));
function move(step){const target=Math.max(0,Math.min(stops.length-1,current+step));gallery.scrollTo({left:Math.max(0,stops[target].offsetLeft-parseFloat(getComputedStyle(document.querySelector('.wall')).paddingLeft)),behavior:reduced.matches?'instant':'smooth'})}
document.querySelector('#prev').addEventListener('click',()=>move(-1));document.querySelector('#next').addEventListener('click',()=>move(1));document.querySelector('.next').addEventListener('click',()=>move(1));
gallery.addEventListener('wheel',e=>{if(e.ctrlKey||e.shiftKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?gallery.clientWidth:1);if(delta){e.preventDefault();gallery.scrollLeft+=delta}},{passive:false});
gallery.addEventListener('keydown',e=>{if(e.target!==gallery)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}if(e.key==='Home'){e.preventDefault();gallery.scrollTo({left:0})}if(e.key==='End'){e.preventDefault();gallery.scrollTo({left:gallery.scrollWidth})}});
function updateIndex(){const point=gallery.scrollLeft+gallery.clientWidth*.4;let nearest=0;let distance=Infinity;stops.forEach((stop,i)=>{const d=Math.abs(stop.offsetLeft+stop.offsetWidth/2-point);if(d<distance){nearest=i;distance=d}});if(gallery.scrollLeft<20)nearest=0;if(gallery.scrollLeft>=gallery.scrollWidth-gallery.clientWidth-5)nearest=stops.length-1;current=nearest;document.querySelector('#piece-index').textContent=`Piece ${String(current+1).padStart(2,'0')} / 05`;document.querySelector('#prev').disabled=current===0;document.querySelector('#next').disabled=current===stops.length-1}
let queued=false;gallery.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{updateIndex();queued=false})}},{passive:true});addEventListener('resize',updateIndex);
const dialog=document.querySelector('dialog');document.querySelector('.playground').addEventListener('click',()=>dialog.showModal());document.querySelector('.close').addEventListener('click',()=>dialog.close());document.querySelector('.try-mode').addEventListener('click',()=>{dialog.close();setMode(root.dataset.mode==='games'?'product':'games');toggle.focus()});
setMode(new URLSearchParams(location.search).get('mode'),false);
