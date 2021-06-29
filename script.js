let canvas = document.querySelector("canvas");
    canvas.width = 1536;
    canvas.height = 721;

    let ctx = canvas.getContext("2d");

    let img = document.createElement("img");
    img.src = "https://img.wallpapersafari.com/desktop/1366/768/2/74/E0waFh.jpg";
    img.addEventListener("load", function(){
        ctx.drawImage(img, 300, 0, 1536, 721);
    });
let eatingSound = new Audio("./Music/eat.mp3");
let gameOverSound = new Audio("./Music/gameOver.mp3");
let movementSound = new Audio("./Music/leftright.mp3");
let backMusic = new Audio("./Music/BackgroundMusic.mp3");
let direction = { x: 0, y: 0 };
let lastLoad = 0;
let snakeArr = [
    { x: 12, y: 10 }
];
let foodEle = { x: 10, y: 15 };
let snakeSpeed = 7;
let score = 0;
const a = 2;
const b = 18;
let myHighScore = 0;

backMusic.loop = true;


inc.addEventListener("click",function(e){
    snakeSpeed +=2;
});

dec.addEventListener("click",function(e){
    snakeSpeed -=2;
});

function snakeGame() {
    if (isCollasped(snakeArr)) {
        backMusic.pause();
        gameOverSound.play();
        direction = { x: 0, y: 0 };
        setTimeout(() => {
            alert("Game Over, Press OK to restart");
            backMusic.currentTime = 0
            backMusic.play();
        }, 200);
        snakeArr = [{ x: 12, y: 10 }];
        score = 0;
        scoreContainer.innerHTML = "Score: " + score;
    }


    if (snakeArr[0].x == foodEle.x && snakeArr[0].y == foodEle.y) {
        eatingSound.play();
        score += 1;
        if (score >= myHighScore) {
            myHighScore = score;
            localStorage.setItem("hiScore", JSON.stringify(myHighScore));
            highScoreContainer.innerHTML = "HighScore:" + myHighScore;
        }
        scoreContainer.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y });
        foodEle = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    //Moving Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    //Display Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeBody = document.createElement('div');
        snakeBody.style.gridRowStart = e.y;
        snakeBody.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeBody.classList.add('snake-head');
        } else {
            snakeBody.classList.add('snake');
        }
        board.appendChild(snakeBody);
    });

    //Display food
    food = document.createElement('div');
    food.style.gridRowStart = foodEle.y;
    food.style.gridColumnStart = foodEle.x;
    food.classList.add('food');
    board.appendChild(food);
}

let hiScore = localStorage.getItem("hiScore");
if (hiScore == null) {
    localStorage.setItem("hiScore", JSON.stringify(myHighScore));
} else {
    myHighScore = JSON.parse(hiScore);
    highScoreContainer.innerHTML = "HighScore:" + myHighScore;
}


function main(currtime) {
    window.requestAnimationFrame(main);
    if ((currtime - lastLoad) / 1000 < 1 / snakeSpeed) {
        return;
    }
    lastLoad = currtime;
    snakeGame();
    //console.log(currtime);
}

let board = document.querySelector(".board");


function isCollasped(snakeArr) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x == snakeArr[0].x && snakeArr[i].y == snakeArr[0].y) {
            return true;
        }
    }
    if ((snakeArr[0].x <= 0 || snakeArr[0].x >= 20) || (snakeArr[0].y <= 0 || snakeArr[0].y >= 20)) {
        return true;
    }

}



window.addEventListener('keydown', e => {
    console.log(e.key);
    direction = { x: 0, y: 1 };
    movementSound.play();
    if (e.key == "ArrowUp") {
        console.log("ArrowUp");
        direction.x = 0;
        direction.y = -1;
        return;
    } else if (e.key == "ArrowDown") {
        console.log("ArrowDown");
        direction.x = 0;
        direction.y = 1;
        return;
    } else if (e.key == "ArrowRight") {
        console.log("ArrowRight");
        direction.x = 1;
        direction.y = 0;
        return;
    } else if (e.key == "ArrowLeft") {
        console.log("ArrowLeft");
        direction.x = -1;
        direction.y = 0;
        return;
    }

});
window.requestAnimationFrame(main);
