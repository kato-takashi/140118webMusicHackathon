    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioctx = new AudioContext();
    
    var bufsize = 1024;
    var play = 0;
    var data = new Float32Array(bufsize);
    
    var scrproc = audioctx.createScriptProcessor(bufsize);
    var filter = audioctx.createBiquadFilter();
    var osc;
    scrproc.onaudioprocess = Process;
    scrproc.connect(filter);
    
    filter.connect(audioctx.destination);
    filter.type = 0;
    filter.frequency.value = 5000;
    filter.Q.value = 5;
    
    function Setup() {
        filter.type = ["lowpass","highpass","bandpass","lowshelf","highshelf","peaking","notch","allpass"][document.getElementById("type").selectedIndex];
        filter.type = document.getElementById("type").selectedIndex;
        filter.frequency.value = parseFloat(document.getElementById("freq").value);
        filter.Q.value = parseFloat(document.getElementById("q").value);
        filter.gain.value = parseFloat(document.getElementById("gain").value);
    }
    
    function Play() {
        if(play) {
            osc.stop(0);
            play = 0;
        }
        else {
            osc = audioctx.createOscillator();
            osc.connect(scrproc);
            osc.start(0);
            play = 1;
        }
    }
    
    function Process(ev) {
        var buf0 = ev.outputBuffer.getChannelData(0);
        var buf1 = ev.outputBuffer.getChannelData(1);
        for(var i = 0; i < bufsize; ++i) {
            buf0[i] = buf1[i] = (Math.random() - 0.5) * play;
        }
    }
    Setup();
    
    
    /////////////////////////
    var analyzer = audioctx.createAnalyser();
    filter.connect(analyzer);
    setInterval(DrawGraph,100);
    
    function DrawGraph() {
        Analyze();
        var cv = document.getElementById("cvs");
        var ctx = cv.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 512, 256);
        ctx.fillStyle = "#009900";
        for(var i = 0; i < 512; ++i) {
            var f = audioctx.sampleRate * i / 1024;
            y = 128 + (data[i] + 48.16) * 2.56;
            ctx.fillRect(i, 256 - y, 1, y);
        }
        ctx.fillStyle = "#ff8844";
        for(var d = -50; d < 50; d += 10) {
            var y = 128 - (d * 256 / 100) | 0;
            ctx.fillRect(20, y, 512, 1);
            ctx.fillText(d + "dB", 5, y);
        }
        ctx.fillRect(20, 128, 512, 1);
        for(var f = 2000; f < audioctx.sampleRate / 2; f += 2000) {
            var x = (f * 1024 / audioctx.sampleRate) | 0;
            ctx.fillRect(x, 0, 1, 245);
            ctx.fillText(f + "Hz", x - 10, 255);
        }
        
    }
    function Analyze() {
        analyzer.smoothingTimeConstant = 0.7;
        analyzer.fftSize = 1024;
        analyzer.getFloatFrequencyData(data);
    }