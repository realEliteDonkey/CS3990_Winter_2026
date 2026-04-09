import {generateData} from "./Data.js"
import {Tile, generateTiles} from "./Tile.js"

export class QuizGame {
    constructor() {
        this.stars = 0;
        this.time = 30;
        this.message = "";
        this.tiles = this.init();
        this.activeQuestionTileId = null;
        this.answeredQuestionTileIds = new Set();
        this.processedAssetTileIds = new Set();
        this.timerIntervalId = null;
    }

    init() {
        const max_questions = 8;
        const min_questions = 6;
        const tiles_content = generateData(min_questions, max_questions);
        return generateTiles(tiles_content);
    }

    startGame() {
        this.activeQuestionTileId = null;
        this.answeredQuestionTileIds = new Set();
        this.processedAssetTileIds = new Set();

        this.renderTiles();
        this.renderStars();
        $("#timer").text(`Time Remaining: ${this.time}`);

        if (this.timerIntervalId) {
            clearInterval(this.timerIntervalId);
        }
        this.timerIntervalId = setInterval(() => this.decTime(), 1000);

        $(".game_content").off("click.gameplay", ".tile").on("click.gameplay", ".tile", (event) => {
            const $clickedTile = $(event.currentTarget);
            const clickedTileId = $clickedTile.attr("id");

            if (this.activeQuestionTileId && clickedTileId !== this.activeQuestionTileId) {
                return;
            }

            $clickedTile.find("*").show();

            const clickedTile = this.getTileById(clickedTileId);
            if (!clickedTile) {
                return;
            }

            const isUnansweredQuestion = clickedTile.type === "question" && !this.answeredQuestionTileIds.has(clickedTileId);
            if (isUnansweredQuestion) {
                this.activeQuestionTileId = clickedTileId;
            }

            if (clickedTile.type === "asset") {
                this.applyAssetEffect(clickedTile, clickedTileId);
            }
        });

        $(".game_content").off("change.gameplay", ".tile input[type='radio']").on("change.gameplay", ".tile input[type='radio']", (event) => {
            const $input = $(event.currentTarget);
            const $tile = $input.closest(".tile");
            const tileId = $tile.attr("id");
            const selectedAnswer = $input.val();
            const tile = this.getTileById(tileId);

            if (!tile || tile.type !== "question") {
                return;
            }

            if (this.answeredQuestionTileIds.has(tileId)) {
                return;
            }

            const isCorrect = selectedAnswer === tile.content.correctAnswer;
            this.message = isCorrect ? "Correct" : "Incorrect";
            this.stars += isCorrect ? 1 : -1;
            this.renderStars();
            const color = isCorrect ? "green" : "red";
            $tile.find(".tile_option_label span").css("color", "");
            $input.closest(".tile_option_label").find("span").css("color", color);
            $("#messages").text(this.message);

            this.answeredQuestionTileIds.add(tileId);
            if (this.activeQuestionTileId === tileId) {
                this.activeQuestionTileId = null;
            }
        });
    }

    renderTiles() {
        const gameContent = document.querySelector(".game_content");
        if (!gameContent) {
            return;
        }

        gameContent.innerHTML = "";
        this.tiles.forEach((tile) => {
            gameContent.appendChild(tile.createElement());
        });
        $(".tile").css('background-color', 'grey');
        $(".tile *").hide();

    }

    renderStars() {
        const scoreElement = document.getElementById("score");
        if (!scoreElement) {
            return;
        }

        if (this.stars >= 0) {
            scoreElement.innerHTML = "Your Score: ";
            for (let i = 0; i < this.stars; i++) {
                scoreElement.innerHTML += "\u2B50 ";
            }
            return;
        }

        scoreElement.textContent = `Your Score: ${this.stars}`;
    }

    getTileById(tileId) {
        return this.tiles.find((tile) => tile.id === tileId);
    }

    applyAssetEffect(tile, tileId) {
        if (this.processedAssetTileIds.has(tileId)) {
            return;
        }

        this.processedAssetTileIds.add(tileId);

        if (tile.content.value === "💎") {
            this.stars += 1;
            this.message = "Diamond found: +1 star";
            this.renderStars();
            $("#messages").text(this.message);
            return;
        }

        if (tile.content.value === "🐻") {
            this.stars -= 1;
            this.message = "Bear found: -1 star";
            this.renderStars();
            $("#messages").text(this.message);
            return;
        }

        if (tile.content.value === "❌") {
            this.time = 0;
            $("#timer").text("Time Remaining: 0");
            this.stopGame("Game over");
        }
    }

    stopGame(finalMessage = "Time is up") {
        if (this.timerIntervalId) {
            clearInterval(this.timerIntervalId);
            this.timerIntervalId = null;
        }

        $(".game_content").off(".gameplay");
        this.activeQuestionTileId = null;
        this.message = finalMessage;
        $("#messages").text(this.message);
    }

    decTime() {
        if (this.time <= 0) {
            return;
        }

        this.time--;
        console.log("Time: ", this.time);
        $("#timer").text(`Time Remaining: ${this.time}`);

        if (this.time === 0) {
            this.stopGame();
        }
    }

}
