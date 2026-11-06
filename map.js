(()=>{
  const host=document.getElementById('fullMap');if(!host)return;
  let map=null,userLocationMarker=null,groups={flood:[],landslide:[],reports:[],gauges:[]},activeFilter='all',activeLayer='all';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function initMap(){
    if(map){setTimeout(()=>map.invalidateSize(true),80);return}
    if(!window.L){host.insertAdjacentHTML('beforeend','<div class="map-unavailable">Map is unavailable. Check your internet connection and try again.</div>');return}
    map=L.map(host,{zoomControl:true,preferCanvas:true,scrollWheelZoom:true,attributionControl:true,fadeAnimation:false}).setView(window.__v33DistrictCenter||[6.94,80.00],10);
    const osm=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(map);
    let fallback=false;osm.on('tileerror',()=>{if(fallback)return;fallback=true;try{map.removeLayer(osm)}catch(_){}L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{maxZoom:19,subdomains:'abcd',attribution:'© OpenStreetMap contributors © CARTO'}).addTo(map)});
    const floodStyle={color:'#df4c53',weight:2,fillColor:'#e94c50',fillOpacity:.34},slideStyle={color:'#d78b20',weight:2,fillColor:'#f4a638',fillOpacity:.4};
    [
      {name:'Colombo · Flood watch',coords:[[6.91,79.84],[6.93,79.87],[6.90,79.89],[6.88,79.86]]},
      {name:(window.__v33RiverName||'Kelani River')+' Basin · Flood watch',coords:[[6.94,79.91],[6.96,79.94],[6.94,79.97],[6.92,79.94]]},
      {name:'Sedawatta · Flood watch',coords:[[6.94,79.88],[6.96,79.90],[6.94,79.92],[6.92,79.90]]},
      {name:'Gampaha · Flood watch',coords:[[7.08,79.98],[7.10,80.01],[7.08,80.03],[7.06,80.01]]},
      {name:'Ratnapura · Flood watch',coords:[[6.67,80.38],[6.69,80.41],[6.67,80.43],[6.65,80.41]]},
      {name:'Galle · Flood watch',coords:[[6.03,80.20],[6.05,80.23],[6.03,80.25],[6.01,80.23]]},
      {name:'Batticaloa · Flood watch',coords:[[7.70,81.67],[7.72,81.70],[7.70,81.72],[7.68,81.70]]}
    ].forEach(z=>groups.flood.push(L.polygon(z.coords,floodStyle).bindPopup(`<b>${esc(z.name)}</b><br>Flood risk · Watch`)));
    [
      {name:'Avissawella · Landslide watch',coords:[[6.94,80.19],[6.96,80.22],[6.93,80.24],[6.91,80.21]]},
      {name:'Hanwella · Landslide watch',coords:[[6.90,80.06],[6.92,80.09],[6.89,80.11],[6.87,80.08]]},
      {name:'Kandy · Landslide watch',coords:[[7.28,80.61],[7.30,80.64],[7.27,80.66],[7.25,80.63]]},
      {name:'Nuwara Eliya · Landslide watch',coords:[[6.95,80.75],[6.97,80.78],[6.94,80.80],[6.92,80.77]]},
      {name:'Badulla · Landslide watch',coords:[[6.98,81.04],[7.00,81.07],[6.97,81.09],[6.95,81.06]]}
    ].forEach(z=>groups.landslide.push(L.polygon(z.coords,slideStyle).bindPopup(`<b>${esc(z.name)}</b><br>Landslide risk · Watch`)));
    [
      {at:[6.9271,79.8612],name:'Colombo · Flood watch',color:'#dc444d',type:'flood'},
      {at:[6.9344,79.9842],name:(window.__v33RiverName||'Local river')+' · River gauge',color:'#147eb1',type:'gauges'},
      {at:[6.9553,80.2117],name:'Avissawella · Landslide watch',color:'#e89b2e',type:'landslide'},
      {at:[6.9461,79.8784],name:'Sedawatta · Community report',color:'#8b5ed0',type:'reports'},
      {at:[7.091,79.999],name:'Gampaha · Flood watch',color:'#dc444d',type:'flood'},
      {at:[6.682,80.399],name:'Ratnapura · Flood watch',color:'#dc444d',type:'flood'},
      {at:[6.027,80.216],name:'Galle · Flood watch',color:'#dc444d',type:'flood'},
      {at:[7.708,81.688],name:'Batticaloa · Flood watch',color:'#dc444d',type:'flood'},
      {at:[7.286,80.633],name:'Kandy · Landslide watch',color:'#e89b2e',type:'landslide'},
      {at:[6.956,80.773],name:'Nuwara Eliya · Landslide watch',color:'#e89b2e',type:'landslide'},
      {at:[6.986,81.056],name:'Badulla · Landslide watch',color:'#e89b2e',type:'landslide'}
    ].forEach(p=>groups[p.type].push(L.circleMarker(p.at,{radius:8,color:'#fff',weight:3,fillColor:p.color,fillOpacity:1}).bindTooltip(p.name,{direction:'top'}).bindPopup(`<b>${esc(p.name)}</b><br>${p.type==='gauges'?'River gauge':p.type==='reports'?'Community report':'Risk watch'}`)));
    [0,120,320,800].forEach(ms=>setTimeout(()=>map&&map.invalidateSize(true),ms));applyFilter(activeFilter);setLayer(activeLayer);
    const pending=window.__lankaAlertPendingUserLocation;if(pending)window.__v27SetUserLocation(pending[0],pending[1]);const shelter=window.__v33PendingShelter;if(shelter)window.__v33ShowShelter(shelter[0],shelter[1]);
  }
  function add(items){items.forEach(x=>x.addTo(map))}function removeAll(){Object.values(groups).flat().forEach(x=>map.removeLayer(x))}
  function applyFilter(filter){if(!map)return;activeFilter=filter;removeAll();const flood=filter==='all'||filter==='flood',slide=filter==='all'||filter==='landslide';if(flood&&activeLayer!=='landslide')add(groups.flood);if(slide&&activeLayer!=='flood')add(groups.landslide);if(filter==='all'||filter==='flood'||filter==='landslide')add(groups.gauges);if(filter==='all'||filter==='reports')add(groups.reports)}
  function setLayer(layer){activeLayer=layer;if(map)applyFilter(activeFilter)}
  window.__v27SetUserLocation=(lat,lng)=>{window.__lankaAlertPendingUserLocation=[lat,lng];if(!map)return;if(userLocationMarker)map.removeLayer(userLocationMarker);userLocationMarker=L.circleMarker([lat,lng],{radius:9,color:'#fff',weight:3,fillColor:'#087db9',fillOpacity:1}).addTo(map).bindPopup('<b>Current GPS location</b>');map.setView([lat,lng],15);};
  window.__v33ShowShelter=(lat,lng)=>{if(!map)return;const origin=window.__v33DistrictCenter||map.getCenter();map.setView([lat,lng],14);L.polyline([origin,[lat,lng]],{color:'#147eb1',weight:4,dashArray:'7 7',opacity:.85}).addTo(map);L.marker([lat,lng]).addTo(map).bindPopup('Safe center · illustrative route · '+(window.__v33ShelterDistance||'—')+' km from the district center').openPopup();};window.__v27ApplyMapFilter=applyFilter;window.__v27SetMapLayer=setLayer;window.__v27ZoomMap=d=>{if(map)d>0?map.zoomIn():map.zoomOut()};window.addEventListener('v27:map-open',initMap);if(document.querySelector('#map.view.active'))initMap();
})();