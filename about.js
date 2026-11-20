const aboutParams=new URLSearchParams(location.search);
const back=new URL('./',location.href);
back.searchParams.set('mode',aboutParams.get('from')==='games'?'games':'product');
if(aboutParams.get('return'))back.searchParams.set('return',aboutParams.get('return'));
if(aboutParams.get('origin')==='playground'){
 back.pathname=new URL('playground.html',location.href).pathname;
 back.searchParams.delete('mode');back.searchParams.set('from',aboutParams.get('from')==='games'?'games':'product');
 back.hash=aboutParams.get('category')||'ui-ux';
 document.querySelector('#about-back span:last-child').textContent='Back to Playground';
}
document.querySelector('#about-back').href=back.href;
