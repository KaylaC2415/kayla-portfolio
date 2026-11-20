// Return to the same gallery entry, including when this article was opened in a new tab.
const caseParams=new URLSearchParams(location.search);
const returnId=caseParams.get('return');
const galleryURL=new URL('./',location.href);
galleryURL.searchParams.set('mode',document.documentElement.dataset.mode==='games'?'games':'product');
galleryURL.searchParams.set('project',document.documentElement.dataset.project||'event-content-workspace');
if(returnId)galleryURL.searchParams.set('return',returnId);
document.querySelectorAll('[data-gallery-return]').forEach(link=>link.href=galleryURL.href);
const chapterLinks=[...document.querySelectorAll('.case-outline a')];
const chapterObserver=new IntersectionObserver(entries=>{
 const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
 if(!visible.length)return;
 const id=visible[0].target.id;
 chapterLinks.forEach(link=>{if(link.hash==='#'+id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
},{rootMargin:'-100px 0px -60% 0px',threshold:0});
document.querySelectorAll('.case-section').forEach(section=>chapterObserver.observe(section));

function resizeCaseNavigation(){document.documentElement.style.setProperty('--scale',String(innerHeight/982));document.documentElement.style.setProperty('--mobile-scale',String(Math.min(innerWidth/402,innerHeight/874)));}
resizeCaseNavigation();addEventListener('resize',resizeCaseNavigation);
const imageViewer=document.querySelector('.case-lightbox');
const expandedImage=imageViewer.querySelector('.lightbox-image');
document.querySelectorAll('.case-image-trigger').forEach(button=>button.addEventListener('click',()=>{const image=button.querySelector('img');expandedImage.src=button.dataset.imageSrc;expandedImage.alt=image.alt;imageViewer.showModal();}));
imageViewer.querySelector('.lightbox-close').addEventListener('click',()=>imageViewer.close());
imageViewer.addEventListener('click',event=>{if(event.target===imageViewer||event.target===expandedImage)imageViewer.close();});
