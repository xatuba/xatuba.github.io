// ==UserScript==
// @name       BFC Crash Farm - Click
// @author     Xtb
// @match      https://blockfarm.club/farm/*
// @require    http://code.jquery.com/jquery-latest.js
// @require    https://xatuba.github.io/bfc_click.js
// @downloadURL https://xatuba.github.io/bfc_click.js
// @updateURL https://xatuba.github.io/bfc_click.js
// ==/UserScript==

function run25FuncAsync(func){
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
    setTimeout(function(){try{eval(func)}catch(e){}}, 0);
}

$(document).ready(function() {
  let onClick = $('#modalPlant').find('button:eq(1)').attr('onClick');
  $('#modalPlant').find('button:eq(1)').attr('onClick','');
  
  $('#modalPlant').find('button:eq(1)').on('click', function(){
    //run25FuncAsync(onClick);
        
      for(let i = 0; i < 50; i++){
          callPlantSeed();
      }
  });
});
