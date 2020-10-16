var score = 0;
var cross = true;

var audio = new Audio('music.mp3');
var audiogo = new Audio('gameover.mp3');
var hs = 0;
setTimeout(() => {
    audio.play();
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is : ", e.keyCode)
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}
setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    console.log(offsetX, offsetY);

    if (offsetX < 150 && offsetY < 52) {
        gameOver.style.visibility = "visible";
        gameOver.innerHTML = "Game over - Reload to play again";
        obstacle.classList.remove('obstacleAni');
        setTimeout(() => {
            audio.pause();
        }, 1000);
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
        }, 1000);
    }
    else if (offsetX < 150 && cross) {
        score += 10;
        console.log(score);
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            console.log(aniDur);
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur);
        }, 1000);
    } 
}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score : " + score
}

