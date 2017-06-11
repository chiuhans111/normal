var leave = false;
var audio = document.querySelector('audio');
var timeSpan = document.querySelector('#time');
var color2 = document.querySelectorAll('.color2');
var colorlist = ['#2196F3', '#E91E63', '#E91E63', '#2196F3'];
var rbpm = 0.465;
var page = document.querySelector('.page');
var canvas = {};
function draw() {

}
try {
    canvas = document.querySelector('canvas') || {};
    ctx = canvas.getContext('2d');
    function draw() {
        var s = Math.pow(1 - beat % 1, 2.5) * 0.2 + 1
        ctx.lineWidth = 2;
        ctx.strokeStyle = colorlist[(id + 1) % 4];
        ctx.beginPath();
        ctx.ellipse(innerWidth / 2, innerHeight / 2,
            Math.pow(Math.abs(Math.sin(beat / 3)), 0.3) * 500 * s, 500 * s,
            audio.currentTime + (Math.sin(beat * 0.7) < 0 ? Math.PI : 0), Math.PI * 0.1, 2 * Math.PI);
        ctx.stroke();

        ctx.lineWidth = 5;

        ctx.strokeStyle = colorlist[(id + 2) % 4];
        ctx.beginPath();
        ctx.ellipse(innerWidth / 2, innerHeight / 2,
            Math.abs(Math.sin(beat / 2 + 1) * 1000 * s), 1000 * s,
            audio.currentTime + 1, Math.PI * 0.1, 2 * Math.PI);
        ctx.stroke();
    }
} catch (e) { }
audio.play();
audio.volume = 0;

function update() {
    beat = audio.currentTime / rbpm;
    id = Math.floor(beat) % 4;

    document.body.style.color = colorlist[id];

    var scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    page.style.transform = `scale(${scale})`;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    draw();
    var time = new Date();
    timeSpan.textContent = time.toLocaleDateString() + ' | ' + time.toLocaleTimeString();

    document.body.style.opacity = audio.volume;
    if (leave) {
        audio.volume *= 0.9;
    } else {
        audio.volume += (1 - audio.volume) * 0.05;
    }

    requestAnimationFrame(update);
}

update();



