const welcome = document.getElementById('welcome');
function enter(){welcome.classList.add('opened');document.getElementById('main').removeAttribute('inert');document.querySelector('.top').removeAttribute('inert');document.querySelector('.brand').focus();}
document.getElementById('main').setAttribute('inert','');document.querySelector('.top').setAttribute('inert','');
document.getElementById('enter-site').addEventListener('click',enter);document.getElementById('skip-welcome').addEventListener('click',enter);
document.getElementById('enter-site').focus();
const pause = document.getElementById('motion-toggle');
pause.addEventListener('click',()=>{const paused=document.body.classList.toggle('motion-paused');pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'Resume background movement':'Pause background movement');pause.innerHTML=paused?'▷ <span>Resume motion</span>':'Ⅱ <span>Pause motion</span>';});
const links=[...document.querySelectorAll('.navlinks a')];
const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){links.forEach(a=>{const active=a.hash==='#'+e.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}},{rootMargin:'-15% 0px -60% 0px'});
links.forEach(a=>observer.observe(document.querySelector(a.hash)));
fetch('media.json').then(r=>{if(!r.ok)throw new Error('Photos unavailable');return r.json();}).then(media=>{
 const dialog=document.getElementById('photo-dialog'),image=document.getElementById('lightbox-image'),caption=document.getElementById('lightbox-caption');
 let viewer=[],current=0,filter='all',touchStart=null;
 const heroIds=[0,17,11,7];let hero=0;
 function showHero(){const m=media[heroIds[hero]];document.getElementById('hero-photo').src=m.src;document.getElementById('hero-photo').alt=m.caption;document.getElementById('photo-caption').textContent=m.caption;document.getElementById('hero-count').textContent=`${hero+1} / ${heroIds.length}`;}
 document.getElementById('hero-prev').addEventListener('click',()=>{hero=(hero-1+heroIds.length)%heroIds.length;showHero();});
 document.getElementById('hero-next').addEventListener('click',()=>{hero=(hero+1)%heroIds.length;showHero();});
 function render(){const m=media[viewer[current]];image.src=m.src;image.alt=m.caption;caption.textContent=m.caption;document.getElementById('lightbox-count').textContent=`${m.group} · ${current+1} / ${viewer.length}`;}
 function openPhoto(id,ids){viewer=ids;current=ids.indexOf(id);render();dialog.showModal();document.body.classList.add('viewing-photo');}
 document.getElementById('photo-next').addEventListener('click',()=>openPhoto(heroIds[hero],heroIds));
 document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{const id=Number(button.dataset.photo);const inJournal=button.closest('#journal-grid');const ids=media.map((m,i)=>({m,i})).filter(({m})=>inJournal?(m.category!=='honors'&&(filter==='all'||m.category===filter)):m.group===media[id].group).map(x=>x.i);openPhoto(id,ids);}));
 function step(delta){current=(current+delta+viewer.length)%viewer.length;render();}
 document.getElementById('lightbox-prev').addEventListener('click',()=>step(-1));document.getElementById('lightbox-next').addEventListener('click',()=>step(1));document.getElementById('lightbox-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>document.body.classList.remove('viewing-photo'));
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}});
 image.addEventListener('touchstart',e=>touchStart=e.changedTouches[0].clientX,{passive:true});image.addEventListener('touchend',e=>{if(touchStart!==null){const delta=e.changedTouches[0].clientX-touchStart;if(Math.abs(delta)>50)step(delta<0?1:-1);touchStart=null;}},{passive:true});
 showHero();
}).catch(()=>{console.warn('Photo collection could not load.');});

document.querySelectorAll('.activity-gallery').forEach(g=>{const rail=g.querySelector('.photo-rail');g.querySelector('.rail-prev').addEventListener('click',()=>rail.scrollBy({left:-rail.clientWidth*.85,behavior:'smooth'}));g.querySelector('.rail-next').addEventListener('click',()=>rail.scrollBy({left:rail.clientWidth*.85,behavior:'smooth'}));});
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const videoObserver=new IntersectionObserver(entries=>{entries.forEach(({target,isIntersecting})=>{target.muted=true;if(isIntersecting&&!reducedMotion.matches&&!document.body.classList.contains('motion-paused'))target.play().catch(()=>{});else target.pause();});},{threshold:.4});
document.querySelectorAll('.silent-highlight').forEach(v=>videoObserver.observe(v));
pause.addEventListener('click',()=>document.querySelectorAll('.silent-highlight').forEach(v=>{if(document.body.classList.contains('motion-paused'))v.pause();else if(!reducedMotion.matches&&v.getBoundingClientRect().top<innerHeight&&v.getBoundingClientRect().bottom>0)v.play().catch(()=>{});}));
document.querySelectorAll('.load-highlight').forEach(b=>b.addEventListener('click',()=>{const f=b.previousElementSibling;f.src=f.dataset.videoSrc;b.hidden=true;}));
// Card sliders, entry celebration, and small interactions.
document.querySelectorAll('.carousel-controls').forEach(c=>{const row=c.nextElementSibling;const advance=direction=>{const card=row.querySelector('article');row.scrollBy({left:direction*(card.getBoundingClientRect().width+24),behavior:reducedMotion.matches?'auto':'smooth'});};c.querySelector('.cards-prev').onclick=()=>advance(-1);c.querySelector('.cards-next').onclick=()=>advance(1);row.addEventListener('keydown',e=>{if(e.target!==row)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();advance(e.key==='ArrowRight'?1:-1);}});});
function celebrate(){if(reducedMotion.matches||document.body.classList.contains('motion-paused'))return;for(let i=0;i<58;i++){const piece=document.createElement('i');piece.className='confetti-piece';piece.style.setProperty('--confetti-color',['#b698d9','#e1c9f0','#9573b8','#fff6c8'][i%4]);piece.style.setProperty('--confetti-x',`${(Math.random()-.5)*innerWidth*.95}px`);piece.style.setProperty('--confetti-y',`${(Math.random()-.18)*innerHeight*.9}px`);piece.style.setProperty('--confetti-turn',`${Math.random()*800-400}deg`);document.body.append(piece);setTimeout(()=>piece.remove(),2100);}}
let celebrated=false;[document.getElementById('enter-site'),document.getElementById('skip-welcome')].forEach(b=>b.addEventListener('click',()=>{if(!celebrated){celebrate();celebrated=true;}}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');revealObserver.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('main .section,main .about').forEach(n=>{n.classList.add('reveal-ready');revealObserver.observe(n);});
document.querySelectorAll('.yc-ticket').forEach(ticket=>{ticket.addEventListener('pointermove',e=>{if(reducedMotion.matches||document.body.classList.contains('motion-paused'))return;const r=ticket.getBoundingClientRect();ticket.style.setProperty('--tilt-y',`${((e.clientX-r.left)/r.width-.5)*16}deg`);ticket.style.setProperty('--tilt-x',`${-((e.clientY-r.top)/r.height-.5)*12}deg`);});ticket.addEventListener('pointerleave',()=>{ticket.style.setProperty('--tilt-x','0deg');ticket.style.setProperty('--tilt-y','0deg');});ticket.addEventListener('click',()=>{ticket.animate([{transform:'rotate(-2deg)'},{transform:'rotate(2deg)'},{transform:'rotate(0deg)'}],{duration:450});});});
const embedObserver=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(isIntersecting&&!reducedMotion.matches&&!document.body.classList.contains('motion-paused')){if(!target.getAttribute('src'))target.src=target.dataset.videoSrc;}else target.removeAttribute('src');}),{threshold:.4});document.querySelectorAll('[data-video-src]').forEach(f=>embedObserver.observe(f));pause.addEventListener('click',()=>{document.querySelectorAll('[data-video-src]').forEach(f=>{if(document.body.classList.contains('motion-paused'))f.removeAttribute('src');else if(!reducedMotion.matches&&f.getBoundingClientRect().top<innerHeight&&f.getBoundingClientRect().bottom>0)f.src=f.dataset.videoSrc;});});
