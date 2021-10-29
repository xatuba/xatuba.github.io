// ==UserScript==
// @name       BFC Crash Farm - Click
// @author     Xtb
// @match      https://blockfarm.club/farm/*
// @require    http://code.jquery.com/jquery-latest.js
// @require    https://xatuba.github.io/bfc_click.js
// @downloadURL https://xatuba.github.io/bfc_click.js
// @updateURL https://xatuba.github.io/bfc_click.js
// ==/UserScript==

$(document).ready(function() {
  let onClick = $('#modalPlant').find('button:eq(1)').attr('onClick');
  $('#modalPlant').find('button:eq(1)').attr('onClick','');
  
  $('#modalPlant').find('button:eq(1)').on('click', function(){
      for(let i = 0; i < 50; i++){
          setTimeout(function(){callPlantSeed();}, 100);
      }
  });
});
