import { QuizGame } from "./Game.js";



function main() {
    console.log("Main");

    const game = new QuizGame();

    const startButton = $("#start_game_button");
    const gameInfoContainer = $(".game_container");

    gameInfoContainer.hide();

    startButton.on('mouseenter', function() {
        $(this).css('background', 'linear-gradient(-90deg, rgb(77, 0, 128), rgb(204, 76, 204))');
        $(this).css('transform', 'scale(1.1)');
    });
    startButton.on('mouseleave', function() {
        $(this).css('background', 'linear-gradient(90deg, rgb(77, 0, 128), rgb(204, 76, 204))');
        $(this).css('transform', 'scale(1)');
    });
    startButton.on('click', function() {
        gameInfoContainer.show();
        game.startGame();
    });  

}

document.addEventListener("DOMContentLoaded", main);


