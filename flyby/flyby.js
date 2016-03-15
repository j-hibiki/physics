/*
 * 参考文献： ActionScript3.0アニメーション　Keith Peter著　永井勝則訳　ボーンデジタル社 Chapter11 ビリヤードの物理
 */
window.addEventListener("load", init, false);
  
function init()
{
    var offsetX = 0,
    offsetY = 0,
    ctx,
    bounce = -1,
    numsatellites = 1,
    theCanvas,
    satellites = [],
    theContents;
     
    theContents = document.getElementById("contents");
    offsetX = (theContents.currentStyle || document.defaultView.getComputedStyle(theContents,'')).width;
    offsetX = Number(offsetX.replace('px', ''));
  
    offsetY = (theContents.currentStyle || document.defaultView.getComputedStyle(theContents,'')).height;
    offsetY = Number(offsetY.replace('px', ''));
     
    ctx = document.getElementById('canvas').getContext("2d");



     
    for(var i = 0; i < numsatellites; i++)
    {
        var satellite = new Object();
        var jupitar = new Object();
        var satellitev0 = 2;

        satellite.red = 221;
        satellite.green = 222;
        satellite.blue = 211;
        satellite.x = 0;
        satellite.y = 475;
        satellite.vx = satellitev0;
        satellite.vy = -satellitev0;
        satellite.radius = 10;
        satellite.mass = satellite.radius;
        satellites[i] = satellite;
    }
     
    setsatelliteAnimation();
     
    function setsatelliteAnimation()
    {
        animation();
        requestAnimationFrame(setsatelliteAnimation);
    }
     
    function animation()
    {
        ctx.clearRect(0, 0, 500, 500);
        // 木星の描画
        ctx.arc(250, 250, 20, 0, Math.PI*2, true);
        ctx.fillStyle = "rgb(80,32,32)";
        ctx.fill();

        for(var i = 0; i < numsatellites; i++)
        {
            ctx.strokeStyle ="rgb(" + satellites[i].red + "," + satellites[i].green + "," + satellites[i].blue + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(satellites[i].x, satellites[i].y, satellites[i].radius, 0, Math.PI * 2, true);
            ctx.fillStyle = "rgb(" + satellites[i].red + "," + satellites[i].green + "," + satellites[i].blue + ")";
            ctx.fill();
            ctx.stroke();
            move(satellites[i]);
            var satelliteA = satellites[i];
            for(var j = i + 1; j < numsatellites; j++)
            {
                var satelliteB = satellites[j];
            }
        }
    }
     
    /*
     * ボールの運動
     */
    function move(satellite)
    {
        satellite.x += satellite.vx;
        satellite.y += satellite.vy;
        //checkWall(satellite);
        checkGravity(satellite);
    }

    function checkGravity(satellite)
    {
        var dist, distx, disty;
        var a,    ax,    ay,arate;

        arate = 5;
        distx = satellite.x - 250;
        disty = satellite.y - 250;
        dist = Math.pow((distx*distx + disty*disty), 0.5) - satellite.radius;
        
        a = arate / dist / dist;
        ax = a * distx / dist;
        ay = a * disty / dist;

        satellite.vx -= ax;
        satellite.vy -= ay;
    }
     
    // 端に来たら反対側から出るようにする
    // 4次元的なノリ
    function checkWall(satellite)
    {
        if(satellite.x > 500)
        {
            satellite.x = satellite.x - 500;
        }
        else
        if(satellite.x < 0)
        {
            satellite.x = satellite.x + 500;
        }
        else
        if(satellite.y > 500)
        {
            satellite.y = satellite.y - 500;
        }
        else
        if(satellite.y < 0)
        {
            satellite.y += 500;
        }
    }
}
 
// 各ブラウザ対応
window.requestAnimationFrame = (function()
{
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback)
    {
        window.setTimeout(callback, 1000/60);
    };
}());