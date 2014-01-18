var oto = {
  osc : null,
  gain : null,
};
oto.play = function() {
  oto.osc.start(0);
  
  return;
};

// 50 ～ 5000
oto.frequency = function(n) {
  console.log( "frequency #",n );
  oto.osc.frequency.value = n;
}

// 0 ～ 1
oto.gain = function(n) {
  console.log( "gain #",n );
  oto.gain.gain.value = n;
}

// 1 ～ 3
oto.type = function(n) {
  console.log( "type #",n );
  oto.osc.type = n;
}

$(document).ready(function(){
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioctx = new AudioContext();

  oto.osc = audioctx.createOscillator();
  oto.osc.connect(audioctx.destination);
  oto.gain = audioctx.createGain();
  oto.osc.connect(oto.gain);
  oto.gain.connect(audioctx.destination);
  
  
  $("#freq").knob({
    'min': 50,      //最小値
    'max':5000,      //最大値
    change: function(v) {
      console.log( "freq #",v );
      Setup();
      gotoMap();
    },
  });
  
  $("#q").knob({
    'min': 0,      //最小値
    'max':50,      //最大値
    change: function(v) {
      console.log( "q #",v );
      Setup();
      gotoMap();
    },
  });
  
  $("#gain").knob({
    'min': 1,      //最小値
    'max':16,      //最大値
    change: function(v) {
      console.log( "gain #",v );
      Setup();
      gotoMap();
    },
  });
  
});

