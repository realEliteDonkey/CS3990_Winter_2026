export class ColorButton {
    constructor(color) {
        this.color = color;
    }

    createElement() {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "color_cell";
        button.dataset.color = this.color;
        button.style.backgroundColor = this.color;
        button.setAttribute("aria-label", `Use ${this.color}`);
        return button;
    }
}

export class PaletteMenu {
    constructor(
        menuSelector = ".color_menu",
        targetSelector = "#palette_text"
    ) {
        this.menu = document.querySelector(menuSelector);
        this.target = document.querySelector(targetSelector);
        this.buttons = generateColorPalette().map((color) => new ColorButton(color));
        this.defaultBackgroundColor = "";
        this.committedBackgroundColor = "";
    }

    init() {
        this.show();

        if (!this.menu) {
            return;
        }

        if (this.target) {
            this.defaultBackgroundColor = window.getComputedStyle(this.target).backgroundColor;
            this.committedBackgroundColor = this.defaultBackgroundColor;
        }

        this.menu.addEventListener("click", this);
        this.menu.addEventListener("mouseover", this);
        this.menu.addEventListener("mouseout", this);
    }

    show() {
        if (!this.menu) {
            return;
        }

        this.menu.innerHTML = "";
        const fragment = document.createDocumentFragment();

        for (const button of this.buttons) {
            fragment.appendChild(button.createElement());
        }

        this.menu.appendChild(fragment);
    }

    handleEvent(event) {
        if (event.type === "click") {
            this.onClick(event);
            return;
        }

        if (event.type === "mouseover") {
            this.onMouseOver(event);
            return;
        }

        if (event.type === "mouseout") {
            this.onMouseOut(event);
        }
    }

    onClick(event) {
        const color = this.extractColor(event);
        if (!color || !this.target) {
            return;
        }

        this.committedBackgroundColor = color;
        this.target.style.backgroundColor = color;
    }

    onMouseOver(event) {
        const color = this.extractColor(event);
        if (!color || !this.target) {
            return;
        }

        this.target.style.backgroundColor = color;
    }

    onMouseOut(event) {
        if (!this.target) {
            return;
        }

        const related = event.relatedTarget;
        if (related instanceof Element && related.closest(".color_cell")) {
            return;
        }

        this.target.style.backgroundColor = this.committedBackgroundColor || this.defaultBackgroundColor;
    }

    extractColor(event) {
        const target = event.target;
        if (!(target instanceof Element)) {
            return null;
        }

        const cell = target.closest(".color_cell");
        if (!cell) {
            return null;
        }

        return cell.getAttribute("data-color");
    }
}

export function generateColorPalette() {
    return [
        "#000000",
        "#505050",
        "#ad1f2d",
        "#ff2e2e",
        "#ffe600",
        "#39bf5c",
        "#00c8c8",
        "#2c6bff",
        "#884cbf",
        "#ffffff",
        "#d9d9d9",
        "#f2a8b5",
        "#f7d7d7",
        "#fff8a6",
        "#b8f59b",
        "#9ceef7",
        "#89addf",
        "#bdb3d9"
    ];
}



