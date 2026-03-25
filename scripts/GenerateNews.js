import {arrResources} from "./NewsData.js"
import {News} from "./News.js"

export function generateNews() {
    let article = document.querySelectorAll("#content p");
    article.forEach(function(paragraph, i) {
        let contents = arrResources[i];
        let news = new News(contents.newsTitle, contents.srcImg, contents.newsContent);
        news.show(paragraph);
    });
}

