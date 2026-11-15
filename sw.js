self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let d={};try{d=e.data.json();}catch(_){}
  e.waitUntil(self.registration.showNotification(d.title||'Nails by Anna',{body:d.body||'',icon:'assets/icon-192.png',badge:'assets/icon-192.png',data:{url:'./#salon'}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const url=new URL('./#salon',self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    for(const c of cs){if('focus' in c){c.navigate(url).catch(()=>{});return c.focus();}}
    return self.clients.openWindow(url);
  }));
});
