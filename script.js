(function(){
  var $=function(id){return document.getElementById(id)};
  // Copos de nieve
  var s=$('snow');
  for(var i=0;i<35;i++){var f=document.createElement('div');f.className='flake';f.textContent='❄';
    f.style.left=Math.random()*100+'%';f.style.fontSize=(8+Math.random()*14)+'px';
    f.style.animationDuration=(8+Math.random()*10)+'s';f.style.animationDelay=(-Math.random()*15)+'s';s.appendChild(f);}

  function render(people){
    var max=Math.max.apply(null,people.map(function(p){return +p.count||0}).concat([1]));
    var total=people.reduce(function(a,p){return a+(+p.count||0)},0);
    $('total').textContent=total+' 🧻';
    $('chart').innerHTML=people.map(function(){return '<div class="col"><div class="val"></div><div class="bar" style="height:0"></div></div>'}).join('');
    var cols=$('chart').children;
    people.forEach(function(p,i){
      cols[i].querySelector('.val').textContent=+p.count||0;
      cols[i].querySelector('.bar').dataset.h=((+p.count||0)/max*82);
    });
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      $('chart').querySelectorAll('.bar').forEach(function(b){b.style.height=b.dataset.h+'%'})})});
    $('names').innerHTML='';
    people.forEach(function(p){var d=document.createElement('div');d.textContent=p.name;$('names').appendChild(d)});
    var g=$('gallery');g.innerHTML='';
    people.forEach(function(p){
      var w=document.createElement('div');w.className='person';
      var h=document.createElement('h3');h.textContent=p.name;w.appendChild(h);
      var ph=document.createElement('div');ph.className='photos';
      var fotos=p.photos||[];
      if(!fotos.length){var e=document.createElement('span');e.className='empty';e.textContent='Sin fotos todavía';ph.appendChild(e)}
      fotos.forEach(function(src){
        var im=document.createElement('img');im.src=src;im.alt='Foto de '+p.name;im.loading='lazy';
        im.onclick=function(){$('lb').firstElementChild.src=im.src;$('lb').style.display='flex'};
        ph.appendChild(im)});
      w.appendChild(ph);$('gallery').appendChild(w)});
  }
  $('lb').onclick=function(){$('lb').style.display='none'};

  fetch('data.json?'+Date.now()).then(function(r){return r.json()}).then(function(d){render(d.people)})
    .catch(function(){$('msg').textContent='No se pudo cargar data.json'});
})();
