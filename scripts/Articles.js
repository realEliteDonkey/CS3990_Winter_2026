export class Articles {

    constructor() {
        this.articles = [];
        this.lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    }

    generate_articles(count) {
        let elem = document.querySelector(".news_articles ");
        elem.innerHTML = "";
        this.articles = [];

        for (let i = 0; i < count; i++) {
            let new_element = document.createElement('div');
            new_element.className = "article_item";
            new_element.innerHTML = `
            <h6>Title #${i}</h6>
            <p>${this.lorem}</p>
            <button class="remove-article" data-index="${i}">Remove</button>
            `;
            elem.append(new_element);
            this.articles.push(new_element);
        }
    }

    refresh_articles() {
        let elem = document.querySelector(".news_articles ");
        elem.innerHTML = "";
        for (let i = 0; i < this.articles.length; i++) {
            const removeButton = this.articles[i].querySelector(".remove-article");
            if (removeButton) {
                removeButton.dataset.index = String(i);
            }
            elem.append(this.articles[i]);
        }
    }

    remove_article(id) {
        if (!Number.isInteger(id) || id < 0 || id >= this.articles.length) {
            return;
        }
        this.articles.splice(id, 1);
        this.refresh_articles();
    }

    pop() {
        this.articles.pop();
        this.refresh_articles();
    }

    push() {
        let new_element = document.createElement('div');
        new_element.className = "article_item";
        new_element.innerHTML = `
            <h6>Title #${this.articles.length}</h6>
            <p>${this.lorem}</p>
            <button class="remove-article" data-index="${this.articles.length}">Remove</button>
            `;
        this.articles.push(new_element);
        this.refresh_articles();
    }

}

