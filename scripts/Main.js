import { Articles } from "./Articles.js";
import { NumberGenerator } from "./NumberGenerator.js";
import { PaletteMenu } from "./ColorButton.js";
import { SweetsMenu } from "./SweetsMenu.js";
import { ColorMenu } from "./ColorMenu.js";
import {generateFruit, renderRatedFruit, attachRatingDelegation} from "./Fruit.js";

const number_generator = new NumberGenerator();
const articles = new Articles();

function update_num_display() {
    const num_display_element = document.body.querySelector(".num_gen p");
    if (num_display_element) {
        num_display_element.innerHTML = `${number_generator.count}`;
    }
}

function num_gen_button_action() {
    number_generator.refresh();
    update_num_display();
    articles.generate_articles(number_generator.count);
}

function num_gen_inc() {
    number_generator.increment();
    update_num_display();
    if (articles.articles.length == 0) {
        articles.generate_articles(number_generator.count);
        return;
    }
    articles.push();
}

function num_gen_dec() {
    number_generator.decrement();
    update_num_display();
    articles.pop();
}

function remove_article(id) {
    articles.remove_article(id);
}

function main() {
    const down = document.getElementById("down");
    const up = document.getElementById("up");
    const generate = document.getElementById("generate");
    const newsArticles = document.querySelector(".news_articles");
    if (down) {
        down.addEventListener("click", num_gen_dec);
    }
    if (up) {
        up.addEventListener("click", num_gen_inc);
    }
    if (generate) {
        generate.addEventListener("click", num_gen_button_action);
    }

    if (newsArticles) {
        newsArticles.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof Element)) {
                return;
            }

            const button = target.closest(".remove-article");
            if (!button) {
                return;
            }

            const index = Number(button.getAttribute("data-index"));
            remove_article(index);
        });
    }

    const paletteMenu = new PaletteMenu();
    paletteMenu.init();

    const sweetsMenu = new SweetsMenu();
    sweetsMenu.init();

    update_num_display();

    let fruits = [
        {
            fruit: "apple",
            color: "red"
        },
        {
            fruit: "pear",
            color: "green"
        },
        {
            fruit: "mango",
            color: "red"
        },
        {
            fruit: "plum",
            color: "blue"
        }
    ];

    
    let color_menu = new ColorMenu(["red", "green", "blue"]);
    color_menu.show();

    generateFruit(fruits);
    renderRatedFruit();
    attachRatingDelegation();

}

document.addEventListener("DOMContentLoaded", main);


