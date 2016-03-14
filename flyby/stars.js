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
    numsatellites = 15,
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

        satellite.red = Math.floor(Math.random() * 256);
        satellite.green = Math.floor(Math.random() * 256);
        satellite.blue = Math.floor(Math.random() * 256);
        satellite.x = 250 + Math.random() * 30 - 15;
        satellite.y = 250 + Math.random() * 30 - 15;
        satellite.vx = Math.random() * 6 - 3;
        satellite.vy = Math.random() * 6 - 3;
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
        checkWall(satellite);
    }
     
    /*
     * 壁の衝突、跳ね返り
     */
    function checkWall(satellite)
    {
        if(satellite.x > 500)
        {
            satellite.x = satellite.x - 500
            // offsetX - satellite.radius;
            // satellite.vx *= bounce;
        }
        else
        if(satellite.x < 0)
        {
            satellite.x = satellite.x + 500
            // satellite.x = satellite.radius;
            // satellite.vx *= bounce;
        }
        else
        if(satellite.y > 500)
        {
            satellite.y = satellite.y - 500
            // satellite.y = offsetY - satellite.radius;
            // satellite.vy *= bounce;
        }
        else
        if(satellite.y < 0)
        {
            satellite.y += 500
            // satellite.y = satellite.radius;
            // satellite.vy *= bounce;
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