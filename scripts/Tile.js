export class Tile {
    constructor(content, index) {
        this.id = `tile-${index + 1}`;
        this.content = content;
        this.type = content.question ? "question" : "asset";
    }

    createElement() {
        const tileDiv = document.createElement("div");
        tileDiv.className = "tile";
        tileDiv.id = this.id;

        if (this.type === "question") {
            const questionText = document.createElement("p");
            questionText.className = "tile_question";
            questionText.textContent = this.content.question;
            tileDiv.appendChild(questionText);

            const options = this.content.options || this.content.option || [];
            const optionsContainer = document.createElement("div");
            optionsContainer.className = "tile_options";

            options.forEach((optionText, optionIndex) => {
                const label = document.createElement("label");
                label.className = "tile_option_label";

                const input = document.createElement("input");
                input.type = "radio";
                input.name = `${this.id}-answer`;
                input.value = optionText;
                input.id = `${this.id}-option-${optionIndex}`;

                const text = document.createElement("span");
                text.textContent = optionText;

                label.appendChild(input);
                label.appendChild(text);
                optionsContainer.appendChild(label);
            });

            tileDiv.appendChild(optionsContainer);
            return tileDiv;
        }

        const value = document.createElement("h4");
        value.className = "tile_asset_value";
        value.textContent = this.content.value || "";

        const description = document.createElement("p");
        description.className = "tile_asset_description";
        description.textContent = this.content.description || "";

        tileDiv.appendChild(value);
        tileDiv.appendChild(description);
        return tileDiv;
    }

}

export function generateTiles(tile_contents) {
    return tile_contents.map((content, index) => new Tile(content, index));
}