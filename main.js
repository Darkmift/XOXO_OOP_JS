var cl = console.log.bind(console);
cl("js online");

$(document).ready(function() {
    $(".flex-item").hide(0).delay(500).fadeIn(3000)
});

var ceil = document.getElementsByClassName("game-item"),
    reset = document.getElementById("reset-game"),
    message = document.getElementById("message"),
    stepCount = 0,
    winCombinations = [
        [1, 2, 3],
        [1, 4, 7],
        [1, 5, 9],
        [2, 5, 8],
        [3, 6, 9],
        [3, 5, 7],
        [4, 5, 6],
        [7, 8, 9]
    ],
    dataX = [],
    dataO = [];

function play() {
    var myAudio = document.getElementById("audio");
    if (myAudio.duration > 0 && !myAudio.paused) {
        audio.pause();
        audio.currentTime = 0
    }
    audio.play();
}

class Player {

    constructor(name) {
        this.name = name;
    }
}


class Game {

    constructor() {
        this.playerX = new Player("X");
        this.playerO = new Player("O");
        this.currentPlayer = this.playerX.name;

        console.log(this.currentPlayer);
    }

    addX() {
        for (var i = 0; i < ceil.length; i++) {
            ceil[i].addEventListener("click", currentStep);
        }

        var z = this.currentPlayer;

        function currentStep() {
            play();
            reset.style.display = "inline-block";

            var num = +this.getAttribute("data-ceil");
            if (!this.textContent) {
                this.innerText = z;

                z === "X" ?
                    dataX.push(num) && this.classList.add("x") :
                    dataO.push(num) && this.classList.add("o");
                if (
                    (dataO.length > 2 || dataX.length > 2) &&
                    (checkWin(dataO, num) || checkWin(dataX, num))
                ) {
                    for (var i = 0; i < ceil.length; i++) {
                        ceil[i].removeEventListener("click", currentStep);
                    }
                    return (message.innerText = "Player " + z + " wins!");
                }

                changePlayer();
                stepCount++;
                (stepCount == 9) ? (message.innerText = 'Tie') : (message.innerText = 'Player ' + z + ' turn');
            }
        }

        function changePlayer() {
            z === 'X' ? (z = "O") : (z = "X");
        }


        function checkWin(arr, number) {

            for (var w = 0, wLen = winCombinations.length; w < wLen; w++) {
                var someWinArr = winCombinations[w],
                    count = 0;
                if (someWinArr.indexOf(number) !== -1) {
                    for (var k = 0, kLen = someWinArr.length; k < kLen; k++) {
                        if (arr.indexOf(someWinArr[k]) !== -1) {
                            count++;
                            if (count === 3) {
                                reset.innerText = "Play again?";
                                return true;
                            }
                        }
                    }
                    count = 0;
                }
            }
        }
    }

    reset() {
        reset.addEventListener("click", function() {
            play();
            reset.style.display = "none";
            // reset.innerText = "Reset Board";
            for (var i = 0; i < ceil.length; i++) {
                ceil[i].innerText = "";
            }
            dataO = [];
            dataX = [];
            this.currentPlayer = "X";
            stepCount = 0;
            message.innerText = "Player " + this.currentPlayer + " turn";
            for (var i = 0; i < ceil.length; i++) {
                ceil[i].classList.remove("x", "o");
            }
        });
    }


}

const game = new Game();
game.addX();
game.reset();