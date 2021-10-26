let lands_wmap = [12760, 5705, 12336, 4969, 6060, 67781, 3300];
let lands_sun = [3569, 78545, 3328, 5487, 6729, 3883, 5801, 5956];
let lands_moon = [3089, 4251, 6689, 3816, 5407, 5364, 4388];

function reloadPage(delay = 0/*MS*/){
    setTimeout(function(){window.location.reload()}, delay);
}

function simulateClick(item) {
  $(item).click();
  
  return true;
  
  item.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true}));
  item.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
  item.dispatchEvent(new PointerEvent('pointerup', {bubbles: true}));
  item.dispatchEvent(new MouseEvent('mouseup', {bubbles: true}));
  item.dispatchEvent(new MouseEvent('mouseout', {bubbles: true}));
  item.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  item.dispatchEvent(new Event('change', {bubbles: true}));

  return true;
}

function formatText(obj, daily = false){
  let text = obj.text();
  let clean_text = text.replace(/[\n]/g, '');
  
  if(daily && clean_text.indexOf(' / ') > 0){
    clean_text = clean_text.split(' / ')[0];
  }
  
  return clean_text;
}

function isDay(hour){
  if(hour == 'Night') return false;
  return true;
}

function getNextLandArray(land_array){
    let pathname = window.location.pathname;
    let pathname_split = pathname.split('/');
  
    let land_id = parseInt(pathname_split[pathname_split.length-1]);
  
    let land_array_location = land_array.indexOf(land_id);
    if(land_array_location >= land_array.length-1){
      land_array_location = 0;
    }
  
    return land_array[land_array_location+1];
}

let tries_modal = 0;
function modalAwait(btn = false){
    if(btn){
      simulateClick(btn);
    }
    
    let modal = $('#modal');

    setTimeout(function(){
      if(tries_modal >= 5){
        reloadPage(0);
      }     
      
      if(modal.hasClass('scale-100')){
        let modal_status = $('#ModalTransactionStatus');
        let modal_status_text = formatText(modal_status);
        
        if(modal_status_text == 'Starting Action...'){
          tries_modal++;
          modalAwait(btn);
        }else{
          reloadPage(0);
        }
      }else{
        reloadPage(0);
      }
    }, 1000);
}

function runHarvest(isGodLand){
  let check_daily = false;
  
  let plants = $('div.grid.grid-cols-4.gap-4.py-2.px-1').children();
  
  if(isGodLand){
    plants = $('div.grid.grid-cols-6.gap-4.py-1.px-1').children().eq(1).children().eq(0).children();
  }
  
  for(let i = 0; i < plants.length; i++){
    let item = plants.eq(i);
    
    let btn_harvest = item.find('button');
    let text = formatText(btn_harvest);
    
    if(text == 'Interact'){
      modalAwait(btn_harvest);
      
      check_daily = true;
      break; 
    }
  }
  
  if(!check_daily){
    checkDailys(true);
  }
}

function runDailyWMap(){
  if(!window.location.pathname.includes('farm/mapview/world-map')){
    window.location.href = '/farm/mapview/world-map/' + lands_wmap[Math.floor(Math.random()*lands_wmap.length)];
  }else{
    runHarvest();
  }
}

function runDailySun(){
  if(!window.location.pathname.includes('farm/mapview/sun-map')){
    window.location.href = '/farm/mapview/sun-map/' + lands_sun[Math.floor(Math.random()*lands_sun.length)];
  }else{
    runHarvest(true);
  }
}

function runDailyMoon(){
  if(!window.location.pathname.includes('farm/mapview/moon-map')){
    window.location.href = '/farm/mapview/moon-map/' + lands_moon[Math.floor(Math.random()*lands_moon.length)];
  }else{
    runHarvest(true);
  }
}

function checkDailys(isAllHarvest = false){
  let objs = $('div.col-span-6.py-2.px-2.bg-gray-800.rounded-sm.border-b-4.border-gray-900 div.grid.grid-cols-6.gap-2').children();

  let daily_wmap = objs.eq(0).children().eq(1);
  let text_wmap = formatText(daily_wmap, true);
  //let daily_ant = objs.eq(1).children().eq(1);
  //let text_ant = formatText(daily_ant, true);
  let daily_sun = objs.eq(2).children().eq(1);
  let text_sun = formatText(daily_sun, true);
  let daily_moon = objs.eq(3).children().eq(1);
  let text_moon = formatText(daily_moon, true);
  
  let ingame_hour = objs.eq(4).children().eq(1);
  let hour = ingame_hour.children().eq(1).text();
  
  let check_wmap = false;
  //let check_ant = false;
  let check_sun = false;
  let check_moon = false;
  
  if(!isNaN(text_wmap)){
    check_wmap = true;
    
    if(isAllHarvest && window.location.pathname.includes('farm/mapview/world-map')){
      window.location.href = '/farm/mapview/world-map/' + getNextLandArray(lands_wmap);
      return;
    }
  }else if(text_wmap == 'Redeem reward'){
    modalAwait(daily_wmap);
    return;
  }
  
  /*if(!isNaN(text_ant)){
  }else{
  }*/
  
  if(!isNaN(text_sun)){
    check_sun = true;
    
    if(isAllHarvest && window.location.pathname.includes('farm/mapview/sun-map')){
      window.location.href = '/farm/mapview/sun-map/' + getNextLandArray(lands_sun);
      return;
    }
  }else if(text_sun == 'Redeem reward'){
    modalAwait(daily_sun);
    return;
  }
  
  if(!isNaN(text_moon)){
    check_moon = true;
    
    if(isAllHarvest && window.location.pathname.includes('farm/mapview/moon-map')){
      window.location.href = '/farm/mapview/moon-map/' + getNextLandArray(lands_moon);
      return;
    }
  }else if(text_moon == 'Redeem reward'){
    modalAwait(daily_moon);
    return;
  }
  
  if(isDay(hour)){
    if(check_moon){
      runDailyMoon();
    }else if(check_sun){
      runDailySun();
    }else if(check_wmap){
      runDailyWMap();
    }else{
      alert('Você completou todas as Dailys!!\nDe F5 após as 21hrs (utc-3) para rodar o script novamente.');
    }
  }else{
    if(check_sun){
      runDailySun();
    }else if(check_moon){
      runDailyMoon();
    }else if(check_wmap){
      runDailyWMap();
    }else{
      alert('Você completou todas as Dailys!!\nDe F5 após as 21hrs (utc-3) para rodar o script novamente.');
    }
  }
}

let rerun_tries = 0;
function tryRun(delay = 0/*MS*/){
    setTimeout(function(){
      try{
        /*let pathname = window.location.pathname;
        if(pathname.includes('farm/mapview/world-map')){
          runDailyWMap();
        }else if(pathname.includes('farm/mapview/sun-map')){
          runDailySun();
        }else if(pathname.includes('farm/mapview/moon-map')){
          runDailyMoon();
        }else{
          checkDailys();
        }*/
        checkDailys();
        rerun_tries = 0;
      }catch(e){
        console.log(e);
        if(rerun_tries >= 5){
          reloadPage(0);
        }else{
          tryRun(1000);
        }
        rerun_tries++;
      }
    }, delay);
}


$(document).ready(function() {
  tryRun(1000);
});
