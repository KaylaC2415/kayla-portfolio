const root=document.documentElement;
const exhibit=document.querySelector('.exhibit-scroll');
const canvas=document.querySelector('.play-canvas');
const projects=JSON.parse(document.querySelector('#project-data').textContent);
const mobilePlayground=matchMedia('(max-width: 700px)');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const categoryLinks=[...document.querySelectorAll('[data-category-link]')];
const anchors=[...document.querySelectorAll('[data-category-anchor]')];
const categoryNames={'ui-ux':'UI/UX',visuals:'Visuals',games:'Games',motions:'Motions'};
const artworkNodes=[...document.querySelectorAll('.play-work')];
const categoryHeading=document.querySelector('.current-section-title');
const headingTexts=[...document.querySelectorAll('[data-heading-category]')];
function resizeRoom(){root.style.setProperty('--scale',String(innerHeight/982));root.style.setProperty('--mobile-scale',String(Math.min(innerWidth/402,innerHeight/874)));}
resizeRoom();
function anchorLeft(anchor){return anchor.getBoundingClientRect().left-exhibit.getBoundingClientRect().left+exhibit.scrollLeft;}
function goToCategory(id,animate=true){
 const anchor=anchors.find(item=>item.id===id);
 if(!anchor)return;
 const behavior=animate&&!reduced.matches?'smooth':'instant';
 if(mobilePlayground.matches){
  const artwork=artworkNodes.find(item=>item.dataset.category===id);
  if(!artwork)return;
  const inset=parseFloat(getComputedStyle(exhibit).scrollPaddingTop)||0;
  const top=exhibit.scrollTop+artwork.getBoundingClientRect().top-exhibit.getBoundingClientRect().top-inset;
  exhibit.scrollTo({top,behavior});
 }else{
  exhibit.scrollTo({left:anchorLeft(anchor),behavior});
 }
}
let activeCategory='';
function updateCategory(){
 const viewportCenter=exhibit.clientWidth/2;
 let active=anchors[0].id,nearestDistance=Infinity;
 if(mobilePlayground.matches){
  const inset=parseFloat(getComputedStyle(exhibit).scrollPaddingTop)||0;
  const readingLine=exhibit.getBoundingClientRect().top+inset+8;
  for(const artwork of artworkNodes){
   if(artwork.getBoundingClientRect().top>readingLine)break;
   active=artwork.dataset.category;
  }
  if(exhibit.scrollTop+exhibit.clientHeight>=exhibit.scrollHeight-2){
   active=artworkNodes.at(-1).dataset.category;
  }
 }else{
  for(const artwork of artworkNodes){
   const rect=artwork.getBoundingClientRect();
   const distance=Math.abs(rect.left+rect.width/2-viewportCenter);
   if(distance<nearestDistance){nearestDistance=distance;active=artwork.dataset.category}
  }
  categoryHeading.style.left=((exhibit.scrollLeft+viewportCenter)/(innerHeight/982))+'px';
 }
 if(active===activeCategory)return;
 activeCategory=active;
 categoryLinks.forEach(link=>{
  const selected=link.dataset.categoryLink===active;
  if(selected)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
  const img=link.querySelector('.category-art img');
  const source=link.querySelector('.category-art source');
  const category=link.dataset.categoryLink;
  const asset=category==='visuals'?'category-orange':category==='games'?'imgHouse2':category==='motions'?'imgHouse3':'imgHouse';
  img.src='assets/playground/'+(category==='visuals'?asset+'.svg':'desktop-'+asset+'.svg');
  img.width=43;img.height=142;
  source.srcset='assets/playground/'+(category==='visuals'?'category-orange-mobile.svg':'mobile-'+asset+'.svg');
 });
 headingTexts.forEach(text=>{const selected=text.dataset.headingCategory===active;text.classList.toggle('is-active',selected);if(selected)text.removeAttribute('aria-hidden');else text.setAttribute('aria-hidden','true')});
 document.querySelector('.current-category').textContent=categoryNames[active];
 document.querySelector('#category-status').textContent=categoryNames[active]+' section';
}
categoryLinks.forEach(link=>link.addEventListener('click',event=>{if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();const id=link.dataset.categoryLink;history.pushState({...history.state},'',new URL('#'+id,location.href));goToCategory(id);}));
let queued=false;exhibit.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{updateCategory();queued=false})}},{passive:true});
exhibit.addEventListener('wheel',event=>{if(mobilePlayground.matches||event.ctrlKey||event.shiftKey||Math.abs(event.deltaX)>Math.abs(event.deltaY))return;const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?exhibit.clientWidth:1);if(delta){event.preventDefault();exhibit.scrollLeft+=delta}},{passive:false});
exhibit.addEventListener('keydown',event=>{if(event.target!==exhibit||mobilePlayground.matches)return;let left;if(event.key==='ArrowRight')left=exhibit.scrollLeft+innerWidth*.8;if(event.key==='ArrowLeft')left=exhibit.scrollLeft-innerWidth*.8;if(event.key==='Home')left=0;if(event.key==='End')left=exhibit.scrollWidth;if(left!==undefined){event.preventDefault();exhibit.scrollTo({left,behavior:reduced.matches?'instant':'smooth'})}});
addEventListener('resize',()=>{resizeRoom();updateCategory()});
addEventListener('popstate',()=>goToCategory(location.hash.slice(1)||'ui-ux',false));
requestAnimationFrame(()=>{goToCategory(location.hash.slice(1)||'ui-ux',false);updateCategory()});
document.fonts.ready.then(updateCategory);
// Both gallery modes use the same page; the return token identifies the entry to restore.
const params=new URLSearchParams(location.search);
const originMode=params.get('from')==='games'?'games':'product';
const galleryURL=new URL('./',location.href);galleryURL.searchParams.set('mode',originMode);
if(params.get('return'))galleryURL.searchParams.set('return',params.get('return'));
document.querySelector('[data-gallery-return]').href=galleryURL.href;
// Freeze the original GIF artwork on a canvas in the exhibition. Motion is opt-in in the viewer.
document.querySelectorAll('.animated-image').forEach(img=>{const still=img.parentElement.querySelector('canvas');const freeze=()=>{still.width=img.naturalWidth;still.height=img.naturalHeight;still.getContext('2d').drawImage(img,0,0)};if(img.complete&&img.naturalWidth)freeze();else img.addEventListener('load',freeze,{once:true});img.addEventListener('error',()=>{img.style.opacity='1';still.hidden=true},{once:true});});
const viewer=document.querySelector('#project-viewer');
const viewerImage=document.querySelector('#viewer-image');
const viewerStill=document.querySelector('#viewer-still');
const animationToggle=document.querySelector('#animation-toggle');
let viewedProject=null,playing=false;
function setAnimation(play){playing=play;viewerImage.style.visibility=(!viewedProject?.animated||play)?'visible':'hidden';viewerStill.hidden=!viewedProject?.animated||play;animationToggle.textContent=play?'Pause animation':'Play animation';animationToggle.setAttribute('aria-pressed',String(play));}
let slideIndex=0;
const viewerVideo=document.querySelector('#viewer-video');
function showSlide(index){
 const slides=viewedProject.media||[{src:viewedProject.src,type:'img'}];
 slideIndex=(index+slides.length)%slides.length;
 document.querySelector('.viewer-controls').hidden=slides.length<2;
 const slide=slides[slideIndex],isVideo=slide.type==='video';
 viewerVideo.pause();viewerVideo.removeAttribute('src');viewerVideo.hidden=!isVideo;
 viewerImage.hidden=isVideo;viewerStill.hidden=true;
 animationToggle.hidden=isVideo||!viewedProject.animated;
 document.querySelector('#viewer-count').textContent=(slideIndex+1)+' / '+slides.length;
 document.querySelector('#viewer-prev').disabled=slides.length<2;document.querySelector('#viewer-next').disabled=slides.length<2;
 if(isVideo){viewerVideo.src=slide.src;viewerVideo.load();if(!reduced.matches)viewerVideo.play().catch(()=>{});}
 else {viewerImage.alt=slide.alt||viewedProject.title;viewerImage.removeAttribute('width');viewerImage.removeAttribute('height');viewerImage.onload=()=>{if(viewedProject.animated){viewerStill.width=viewerImage.naturalWidth;viewerStill.height=viewerImage.naturalHeight;viewerStill.getContext('2d').drawImage(viewerImage,0,0)}};viewerImage.src=slide.src;setAnimation(false);}
}
function openProject(index){viewedProject=projects[index];viewer.dataset.category=viewedProject.category;viewer.style.setProperty('--viewer-accent',{'ui-ux':'#f9c8de',visuals:'#ff7d65',games:'#f5f2d3',motions:'#fae592'}[viewedProject.category]);const site=document.querySelector('#viewer-site');site.hidden=!viewedProject.url;if(viewedProject.url){site.href=viewedProject.url;site.firstChild.textContent=viewedProject.category==='games'?'Play game ':'View site ';}document.querySelector('#viewer-title').textContent=viewedProject.title;document.querySelector('#viewer-meta').textContent=viewedProject.meta;document.querySelector('#viewer-description').textContent=viewedProject.description||'';showSlide(0);viewer.showModal();}
document.querySelector('#viewer-prev').addEventListener('click',()=>showSlide(slideIndex-1));
document.querySelector('#viewer-next').addEventListener('click',()=>showSlide(slideIndex+1));
viewer.addEventListener('keydown',event=>{if(event.target===viewerVideo)return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();showSlide(slideIndex+(event.key==='ArrowRight'?1:-1))}});
viewer.addEventListener('close',()=>{viewerVideo.pause();viewerVideo.removeAttribute('src')});
document.querySelectorAll('[data-view-project]').forEach(button=>button.addEventListener('click',()=>openProject(Number(button.dataset.viewProject))));
animationToggle.addEventListener('click',()=>setAnimation(!playing));
reduced.addEventListener('change',()=>{if(reduced.matches&&viewedProject?.animated)setAnimation(false)});
viewer.addEventListener('close',()=>setAnimation(false));
const visitor=document.querySelector('#visitor-dialog');document.querySelector('.visitor-button').addEventListener('click',()=>visitor.showModal());document.querySelector('.visitor-back').addEventListener('click',()=>visitor.close());
document.querySelectorAll('.dialog-close').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close()}));

const aboutPanel=document.querySelector('#about-dialog');
document.querySelector('.about-me-button').addEventListener('click',()=>{const url=new URL('about.html',location.href);const params=new URLSearchParams(location.search);url.searchParams.set('from',params.get('from')||'product');if(params.get('return'))url.searchParams.set('return',params.get('return'));url.searchParams.set('origin','playground');url.searchParams.set('category',activeCategory||'ui-ux');location.href=url.href});
document.querySelector('.about-close').addEventListener('click',()=>aboutPanel.close());

// Decode and play only artwork that is currently inside the exhibition viewport.
const galleryVideos=[...document.querySelectorAll('.gallery-video')];
const videoObserver=new IntersectionObserver(entries=>{for(const entry of entries){const video=entry.target;if(entry.isIntersecting&&!reduced.matches&&!viewer.open&&!document.hidden)video.play().catch(()=>{});else video.pause();}},{root:exhibit,threshold:.15});
galleryVideos.forEach(video=>{video.loop=true;video.preload='auto';video.addEventListener('loadeddata',syncGalleryVideos);video.addEventListener('canplay',syncGalleryVideos);videoObserver.observe(video)});
function syncGalleryVideos(){galleryVideos.forEach(video=>{const rect=video.getBoundingClientRect();if(!viewer.open&&!document.hidden&&!reduced.matches&&rect.right>0&&rect.left<innerWidth)video.play().catch(()=>{});else video.pause()})}
viewer.addEventListener('close',syncGalleryVideos);new MutationObserver(syncGalleryVideos).observe(viewer,{attributes:true,attributeFilter:['open']});
document.addEventListener('visibilitychange',syncGalleryVideos);reduced.addEventListener('change',syncGalleryVideos);
