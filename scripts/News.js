import {Button} from "./MyButtons.js"

export class News {
    static news_count = 0;

    constructor(title, image_src, paragraph) {
        this.title = title;
        this.image_src = image_src;
        this.paragraph = paragraph;
        this.like_counter = 0;
        this.like_button = new Button("Like", "blue", "like");
        this.hide_button = new Button("Hide", "grey", "hide");
        News.news_count += 1;
        this.id = News.news_count;
    }

    render() {
        return `
        <div class="news_item">
            <h3 id="title_${this.id}">${this.title}</h3>
            <div id="stars_${this.id}" class="stars"></div>
            <img id="img_${this.id}" src="${this.image_src}" width="33%" height="auto" />
            <p id="text_${this.id}">${this.paragraph}</p>
            <p>Likes: <span id="like_text_${this.id}">${this.like_counter}</span></p>
            <button id="likebtn_${this.id}">Like</button>
            <button id="hidebtn_${this.id}">Hide</button>
        </div>
        `;
    }

    show(parentElement) {
        parentElement.innerHTML = this.render();

        let like_button = document.getElementById("likebtn_" + this.id);
        let hide_button = document.getElementById("hidebtn_" + this.id);

        like_button.onclick = function() {
            this.incLikes();
        }.bind(this);

        hide_button.onclick = function() {
            this.hide();
        }.bind(this);
    }

    incLikes() {
        this.like_counter += 1;
        let stars = document.getElementById("stars_" + this.id);
        stars.innerHTML = "&#9734;".repeat(this.like_counter);
        let like_text = document.getElementById("like_text_" + this.id);
        like_text.textContent = this.like_counter;
    }

    hide() {
        let image = document.getElementById("img_" + this.id);
        let title = document.getElementById("title_" + this.id);
        let text = document.getElementById("text_" + this.id);
        let likeButton = document.getElementById("likebtn_" + this.id);

        image.style.opacity = "0.5";
        title.style.backgroundColor = "lightgrey"
        text.style.backgroundColor = "lightgrey";
        text.style.color = "darkgrey";
        title.style.color = "darkgrey";
        likeButton.disabled = true;
    }


}