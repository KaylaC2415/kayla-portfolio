const mobileGallery = matchMedia('(max-width: 700px)');
const root=document.documentElement;
const gallery=document.querySelector('.gallery');
const toggle=document.querySelector('.mode-switch');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let stops=[];
const getStops=()=>root.dataset.mode==='product'?[...document.querySelectorAll('.light-intro,.light-project,.light-playground,.light-closing')]:[...document.querySelectorAll('.dark-intro,.dark-project,.dark-playground,.dark-closing')];
let switchTotal=0;
try{switchTotal=Number(sessionStorage.getItem('kayla-switch-total'))||0}catch{}
document.querySelector('#switch-total').textContent=switchTotal;
function resizeExhibition(){root.style.setProperty('--exhibit-scale',String(innerHeight/982));const contentWidth = Math.max(1, innerWidth - 40);
 root.style.setProperty('--product-intro-zoom', String(contentWidth / 426));
 root.style.setProperty('--games-intro-zoom', String(contentWidth / 383));
 root.style.setProperty('--games-playground-zoom', String(Math.min(1, contentWidth / 360)));
 root.style.setProperty('--games-closing-zoom', String(Math.min(1, contentWidth / 425)));
 root.style.setProperty('--mobile-scale',String(Math.min(innerWidth/402,innerHeight/874)));}
resizeExhibition();
let current=0;
let returnFrame=0,transitionTimer=0;
function cancelModeReturn(){cancelAnimationFrame(returnFrame);clearTimeout(transitionTimer)}
function setMode(mode,writeURL=true,transition=false){
 cancelModeReturn();const previousLeft=gallery.scrollLeft;
 const game=mode==='games';root.dataset.mode=game?'games':'product';
 document.querySelector('#mode-name').textContent=game?'Game & Interaction':'Product Design';
 toggle.setAttribute('aria-checked',String(game));
 document.querySelector('meta[name="theme-color"]').content=game?'#05040f':'#fef9f5';
 document.querySelector('#switch-hint').textContent=game?'Switch to Product Design':'Switch to Game & Interaction';
 document.querySelector('.light-piece-next').setAttribute('aria-label',game?'Scroll to next game project':'Scroll to next product project');
 stops=getStops();
 document.querySelector('#announcement').textContent=game?'Interactive and game design gallery.':'Product design gallery.';
 if(writeURL){const url=new URL(location.href);url.searchParams.set('mode',root.dataset.mode);history.pushState({},'',url)}
 gallery.scrollTo({top:0,left:transition?Math.min(previousLeft,gallery.scrollWidth-gallery.clientWidth):0,behavior:'instant'});updateIndex();
 if(transition&&!reduced.matches&&!mobileGallery.matches){
  gallery.animate([{opacity:.35},{opacity:1}],{duration:240,easing:'ease-out'});
  transitionTimer=setTimeout(()=>{const from=gallery.scrollLeft,start=performance.now();const duration=Math.min(1500,Math.max(700,from*.4));function frame(now){const t=Math.min(1,(now-start)/duration);const ease=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;gallery.scrollLeft=from*(1-ease);if(t<1)returnFrame=requestAnimationFrame(frame)}returnFrame=requestAnimationFrame(frame)},220);
 }else if(transition)gallery.scrollTo({left:0,behavior:'instant'});
}
toggle.addEventListener('click',()=>{switchTotal++;document.querySelector('#switch-total').textContent=switchTotal;try{sessionStorage.setItem('kayla-switch-total',String(switchTotal))}catch{}playSwitchClick();setMode(root.dataset.mode==='games'?'product':'games',true,true)});
addEventListener('popstate',()=>setMode(new URLSearchParams(location.search).get('mode'),false));
function scrollToPiece(piece, left, behavior) {
 if (mobileGallery.matches) {
  const top = piece.getBoundingClientRect().top - gallery.getBoundingClientRect().top + gallery.scrollTop;
  gallery.scrollTo({top: Math.max(0, top - 60), behavior});
 } else {
  gallery.scrollTo({left, behavior});
 }
}
function stopLeft(stop){return stop.getBoundingClientRect().left-gallery.getBoundingClientRect().left+gallery.scrollLeft}
function move(step){const target=Math.max(0,Math.min(stops.length-1,current+step));const inset=innerWidth<=700?24*Math.min(innerWidth/402,innerHeight/874):(root.dataset.mode==='games'?96:98)*innerHeight/982;scrollToPiece(stops[target],Math.max(0,stopLeft(stops[target])-inset),reduced.matches?'instant':'smooth')}
document.querySelector('.scroll-sign').addEventListener('click',()=>move(1));
document.querySelector('.light-piece-next').addEventListener('click',()=>move(1));

gallery.addEventListener('wheel',e=>{if(mobileGallery.matches||e.ctrlKey||e.shiftKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?gallery.clientWidth:1);if(delta){e.preventDefault();gallery.scrollLeft+=delta}},{passive:false});
gallery.addEventListener('keydown',e=>{if(e.target!==gallery||mobileGallery.matches)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}if(e.key==='Home'){e.preventDefault();gallery.scrollTo({left:0})}if(e.key==='End'){e.preventDefault();gallery.scrollTo({left:gallery.scrollWidth})}});
function updateIndex(){if(mobileGallery.matches){const threshold=gallery.getBoundingClientRect().top+gallery.clientHeight*.4;current=0;stops.forEach((stop,i)=>{if(stop.getBoundingClientRect().top<=threshold)current=i});return}const point=gallery.scrollLeft+gallery.clientWidth*.4;let nearest=0;let distance=Infinity;stops.forEach((stop,i)=>{const d=Math.abs(stopLeft(stop)+stop.getBoundingClientRect().width/2-point);if(d<distance){nearest=i;distance=d}});if(gallery.scrollLeft<20)nearest=0;if(gallery.scrollLeft>=gallery.scrollWidth-gallery.clientWidth-5)nearest=stops.length-1;current=nearest;document.querySelector('#light-piece-index').textContent=`${String(Math.max(1,Math.min(root.dataset.mode==='games'?4:3,current))).padStart(2,'0')} / ${root.dataset.mode==='games'?'04':'03'}`;document.querySelector('#piece-index').textContent=`Piece ${String(current+1).padStart(2,'0')} / 05`;document.querySelector('#prev').disabled=current===0;document.querySelector('#next').disabled=current===stops.length-1}
let queued=false;gallery.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{updateIndex();queued=false})}},{passive:true});addEventListener('resize',()=>{resizeExhibition();updateIndex()});
setMode(new URLSearchParams(location.search).get('mode'),false);

const visitorDialog=document.querySelector('#visitor-dialog');
document.querySelector('.visitor-gallery-button').addEventListener('click',()=>visitorDialog.showModal());
document.querySelector('.visitor-close').addEventListener('click',()=>visitorDialog.close());
document.querySelector('.visitor-back').addEventListener('click',()=>visitorDialog.close());

// Preserve the gallery entry for article links and native browser Back.
const galleryStoragePrefix='kayla-gallery-entry:';
const galleryEntryId=history.state?.galleryEntryId||globalThis.crypto?.randomUUID?.()||String(Date.now());
history.replaceState({...history.state,galleryEntryId},'',location.href);
function rememberGalleryEntry(){
 const state={mode:root.dataset.mode,left:gallery.scrollLeft,top:gallery.scrollTop,viewportWidth:innerWidth};
 history.replaceState({...history.state,galleryEntryId,galleryPosition:state},'',location.href);
 try{sessionStorage.setItem(galleryStoragePrefix+galleryEntryId,JSON.stringify(state))}catch{}
 return state;
}
document.querySelectorAll('.project-cover-link,[data-playground-entry]').forEach(link=>{
 const prepareNavigation=()=>{rememberGalleryEntry();const url=new URL(link.href);url.searchParams.set('return',galleryEntryId);if(link.matches('[data-playground-entry]'))url.searchParams.set('from',root.dataset.mode);link.href=url.href};
 link.addEventListener('pointerdown',prepareNavigation);
 link.addEventListener('click',prepareNavigation);
});
function restoreGalleryEntry(){
 const params=new URLSearchParams(location.search);const returnId=params.get('return');let saved=history.state?.galleryPosition;
 if(returnId){try{saved=JSON.parse(sessionStorage.getItem(galleryStoragePrefix+returnId))||saved}catch{}}
 if(saved&&saved.mode===root.dataset.mode){gallery.scrollTo({left:saved.left,top:saved.top??0,behavior:'instant'});updateIndex()}
 else if(params.get('project')==='eyes-off'&&root.dataset.mode==='games'){const piece=document.querySelector('.dark-project-two');scrollToPiece(piece,Math.max(0,stopLeft(piece)-innerWidth*.15),'instant');updateIndex()}
 else if(params.get('project')==='five-mics-website'&&root.dataset.mode==='games'){const piece=document.querySelector('.dark-project-three');scrollToPiece(piece,Math.max(0,stopLeft(piece)-innerWidth*.15),'instant');updateIndex()}
 else if(params.get('project')==='chilog'&&root.dataset.mode==='product'){const piece=document.querySelector('.light-project-three');scrollToPiece(piece,Math.max(0,stopLeft(piece)-innerWidth*.15),'instant');updateIndex()}
 else if(params.get('project')==='light-it-out'&&root.dataset.mode==='games'){const piece=document.querySelector('.dark-project-four');scrollToPiece(piece,Math.max(0,stopLeft(piece)-innerWidth*.15),'instant');updateIndex()}
 else if(params.get('project')==='five-mics-mobile'&&root.dataset.mode==='games'){const piece=document.querySelector('.dark-project-one');scrollToPiece(piece,Math.max(0,stopLeft(piece)-innerWidth*.15),'instant');updateIndex()}
 else if(['event-content-workspace','five-mics-central'].includes(params.get('project'))&&root.dataset.mode==='product'){const piece=document.querySelector(params.get('project')==='five-mics-central'?'.light-project-one':'.light-project-two');scrollToPiece(piece,Math.max(0,stopLeft(piece)-innerWidth*.15),'instant');updateIndex()}
}
requestAnimationFrame(restoreGalleryEntry);
document.fonts.ready.then(()=>requestAnimationFrame(restoreGalleryEntry));
addEventListener('pageshow',event=>{if(event.persisted)requestAnimationFrame(restoreGalleryEntry)});

// Brief feedback after an intentional mode switch; rapid clicks restart the motion.
const switchCounter=document.querySelector('.switch-counter');
toggle.addEventListener('click',()=>{switchCounter.getAnimations().forEach(animation=>animation.cancel());switchCounter.animate(reduced.matches?[{opacity:0},{opacity:1,offset:.12},{opacity:1,offset:.82},{opacity:0}]:[{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)',offset:.12},{opacity:1,transform:'translateY(0)',offset:.82},{opacity:0,transform:'translateY(-20px)'}],{duration:2400,easing:'ease-out'});});
const aboutDialog=document.querySelector('#about-dialog');
document.querySelector('.about-me-button').addEventListener('click',()=>{rememberGalleryEntry();const url=new URL('about.html',location.href);url.searchParams.set('from',root.dataset.mode);url.searchParams.set('return',galleryEntryId);location.href=url.href});
document.querySelector('.about-close').addEventListener('click',()=>aboutDialog.close());

// User-provided recordings match the destination light state.
const switchSounds={on:new Audio('assets/audio/switch-on.mp3'),off:new Audio('assets/audio/switch-off.mp3')};
Object.values(switchSounds).forEach(sound=>{sound.preload='auto'});
function playSwitchClick(){const next=root.dataset.mode==='product'?'on':'off';Object.values(switchSounds).forEach(sound=>{sound.pause();sound.currentTime=0});switchSounds[next].play().catch(()=>{});}
gallery.addEventListener('wheel',cancelModeReturn,{passive:true});gallery.addEventListener('pointerdown',cancelModeReturn);gallery.addEventListener('keydown',cancelModeReturn);

// Viewport-space flashlight experiment; the wall moves beneath the light.
const spotlight=document.querySelector('.game-spotlight');
let spotlightFrame=0,lightX=innerWidth*.5,lightY=innerHeight*.45;
addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;lightX=event.clientX;lightY=event.clientY;if(!spotlightFrame)spotlightFrame=requestAnimationFrame(()=>{spotlight.style.setProperty('--light-x',lightX+'px');spotlight.style.setProperty('--light-y',lightY+'px');spotlightFrame=0})},{passive:true});
