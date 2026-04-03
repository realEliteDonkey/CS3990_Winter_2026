export class Fruit {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    show() {
        return `
        <li class="${this.color}" style="margin-top: 5px; padding: 5px; background-color: ${this.color}; color: white; display: block;">${this.name}</li>
        `;
    }
}

export class RatedFruit extends Fruit {
    constructor(name, color, rating=0) {
        super(name, color);
        this.rating = rating;
    }

    show() {
        let stars = "";
        for (let i = 1; i <= 5; i++) {
            const color = i <= this.rating ? "orange" : "black";
            stars += `<span class="star" data-value="${i}" style="cursor: pointer; user-select: none; color: ${color}; font-size: 1.5rem;">★</span>`;
        }

        return `
        <div style="display: flex; align-items: center; gap: 10px; font-size: 1.25rem; font-family: Georgia, serif;">
            <span style="font-weight: 700;">Star Rating:</span>
            <span class="stars">${stars}</span>
        </div>
        `;
    }
}

export function injectFruit(fruitArr) {
    let u_list = document.querySelector("#fruits ul");
    if (!u_list) {
        return;
    }
    let list_html = "";

    for (const fruit of fruitArr) {
        list_html += fruit.show();
    }

    u_list.innerHTML += list_html;
}

export function renderRatedFruit() {
    const ratedArea = document.getElementById("rated_fruit_area");
    if (!ratedArea) {
        return;
    }

    const ratedFruit = new RatedFruit("mango", "red", 3);
    ratedArea.innerHTML = ratedFruit.show();
}

export function attachRatingDelegation() {
    $(document).on("click", ".star", function () {
        const current = $(this);
        const container = current.parent();

        container.children(".star").css("color", "black");
        current.css("color", "orange");
        current.prevAll(".star").css("color", "orange");
    });
}

export function generateFruit(fruit_list) {
    let fruitObjects = [];
    for (const fruit of fruit_list) {
        fruitObjects.push(new Fruit(fruit.fruit, fruit.color));
    }

    injectFruit(fruitObjects);
}