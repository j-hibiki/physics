/*
 * 参考文献： ActionScript3.0アニメーション　Keith Peter著　永井勝則訳　ボーンデジタル社 Chapter11 ビリヤードの物理
 */
window.addEventListener("load", init, false);
  
function init()
{
    var offsetX = 0,
    offsetY = 0,
    ctx,
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

    var satellite = new Object();
    var jupitar = new Object();

    //フォームから入力できるようにしたい部分
    var satellitex0 = 0;
    var satellitey0 = 475;
    var satellitevx0 = 2;
    var satellitevy0 = -2;
    var jupitarx = 0;
    var jupitary = 0;
    var satelliteRadius = 10;

    satellite.x  = satellitex0;
    satellite.y  = satellitey0;
    satellite.vx = satellitevx0;
    satellite.vy = satellitevy0;
    satellite.radius = satelliteRadius;
    
    setSatelliteAnimation();
     
    function setSatelliteAnimation()
    {
        animation();
        requestAnimationFrame(setSatelliteAnimation);
    }
     
    function animation()
    {
        ctx.clearRect(0, 0, 500, 500);
        // 木星の描画
        ctx.arc(250, 250, 20, 0, Math.PI*2, true);
        ctx.fillStyle = "rgb(80,32,32)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(satellite.x, satellite.y, satellite.radius, 0, Math.PI*2, true);
        ctx.fillStyle = "rgb(222,222,222)";
        ctx.fill();
        ctx.stroke();
        move(satellite);
    }
     
    // ボールの運動
    function move(satellite)
    {
        satellite.x += satellite.vx;
        satellite.y += satellite.vy;
        //checkWall(satellite);
        addGravity(satellite);
    }

    function addGravity(satellite)
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