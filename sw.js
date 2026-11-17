const V='chess-review-v2';
const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','stockfish-19-lite-single.js','stockfish-19-lite-single.wasm',...['move','back','capture','castle','check','promote','mate','start','brilliant','great','mistake','blunder'].map(n=>'sounds/'+n+'.mp3')];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);if(u.origin!==location.origin)return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
    const net=fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));}return res;}).catch(()=>hit);
    return hit||net;
  }));
});
