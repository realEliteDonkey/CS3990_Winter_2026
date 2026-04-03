class ColorButton {
    constructor(color) {
        this.color = color;
    }

    createElement() {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "color_cell";
        button.dataset.color = this.color;
        button.style.backgroundColor = this.color;
        button.style.height = "2.5vh";
        button.style.width = "5vh";
        button.style.marginRight = "2vh";
        button.setAttribute("aria-label", `Use ${this.color}`);
        return button;
    }

}

function genButtons(color_list) {
    let buttons = [];
    for (const color of color_list) {
        buttons.push(new ColorButton(color.toLowerCase()));
    }
    return buttons;
}

export class ColorMenu {
    constructor(color_list) {
        this.colors = color_list;

        // array of str repr of buttons html
        this.buttons = genButtons(color_list);
        this.handleEvent = this.handleEvent.bind(this);
    }

    show() {
        let div = document.getElementById("colors");
        
        for (const button of this.buttons) {
            div.append(button.createElement());
        }

        div.addEventListener("click", this.handleEvent);
    }

    handleEvent(event) {
        if (event.type === "click") {
            this.onClick(event);
            return;
        }
    }

    onClick(event) {
        let color = this.extractColor(event);
        if (!color) {
            return;
        }

        let elements_to_highlight = document.getElementById("fruits");
        if (!elements_to_highlight) {
            return;
        }

        const matchingElements = elements_to_highlight.querySelectorAll(`.${color}`);
        for (const element of matchingElements) {
            element.style.color = "black";
        }
    }

    extractColor(event) {
        const target = event.target;
        if (!(target instanceof Element)) {
            return null;
        }

        const colorCell = target.closest(".color_cell");
        if (!colorCell) {
            return null;
        }

        return colorCell.getAttribute("data-color");
    }
}

