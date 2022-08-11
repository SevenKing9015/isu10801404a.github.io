// Create an instance
var wavesurfer;
window.onload = function() {
    
    wavesurfer = WaveSurfer.create({
        container: document.querySelector('#waveform'),
    });
    wavesurfer.on('error', function(e) {
        console.warn(e);
    });

    // Load audio from URL
    wavesurfer.load('media');
    // Play/pause on button press
    document
        .querySelector('[data-action="play"]')
        .addEventListener('click', wavesurfer.playPause.bind(wavesurfer));
    // Drag'n'drop
    let toggleActive = function(e, toggle) {
        e.preventDefault();
        toggle
            ? e.target.classList.add('wavesurfer-dragover')
            : e.target.classList.remove('wavesurfer-dragover');
    };
    let handlers = {
        // Drop event
        drop: function(e) {
            toggleActive(e, false);
            // Load the file into wavesurfer
            if (e.dataTransfer.files.length) {
                wavesurfer.loadBlob(e.dataTransfer.files[0]);
            } else {
                wavesurfer.fireEvent('error', 'Not a file');
            }
        },
        // Drag-over event
        dragover: function(e) {
            toggleActive(e, true);
        },
        // Drag-leave event
        dragleave: function(e) {
            toggleActive(e, false);
        }
    };
    let dropTarget = document.querySelector('#drop');
    Object.keys(handlers).forEach(function(event) {
        dropTarget.addEventListener(event, handlers[event]);
    });
    var a=document.getElementById("ipt");
        a.onchange=function(){wavesurfer.loadBlob(a.files[0]);}
   
    var audio=new Audio();
    audio.src= 'e.dataTransfer.files[0]'||'a.files[0]';
    var canvas,ctx,source, context, analyser, fbc_array,bars,bar_x,bar_width,bar_height;
    window.addEventListener("load", initmp3player, false);
    function initmp3player(){
    document.getElementById('test').appendChild(audio);
    context=new webkitAudioContext();
    analyser=context.createAnalyser();
    canvas=document.getElementById("fr");
    ctx=canvas.getContext('2d');
    source=context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    frameLooper();}

function frameLooper(){
    window.webkitRequestAnimationFrame(frameLooper);
    fbc_array=new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFreqyencyData(fbc_array);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#00CCFF';
    bars=100;
    for (var i=0; i<bars; i++){
        bar_x=i*3;
        bar_width=2;
        bar_height=-(fbc_array[i]/2);
        ctx.fillRect(bar_x,canvas.height,bar_width,bar_height);
    }}



};
