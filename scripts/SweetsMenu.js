export class SweetsMenu {
    constructor(
        panelSelector = "#sweeties_panel",
        toggleSelector = ".sweeties_toggle",
        listSelector = ".sweeties_list",
        previewSelector = ".sweeties_preview",
        imageSelector = "#sweeties_image"
    ) {
        this.panel = document.querySelector(panelSelector);
        this.toggle = this.panel?.querySelector(toggleSelector) ?? null;
        this.list = this.panel?.querySelector(listSelector) ?? null;
        this.preview = this.panel?.querySelector(previewSelector) ?? null;
        this.image = this.panel?.querySelector(imageSelector) ?? null;
        this.isExpanded = false;

        this.sweets = {
            Cake: "#f3b37b",
            Donut: "#cc7aa3",
            Honey: "#f0bf2f"
        };
    }

    init() {
        if (!this.panel || !this.toggle || !this.list || !this.preview || !this.image) {
            return;
        }

        this.panel.addEventListener("click", this);
        this.collapse();
    }

    handleEvent(event) {
        if (event.type !== "click") {
            return;
        }

        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }

        const toggleButton = target.closest(".sweeties_toggle");
        if (toggleButton) {
            this.toggleMenu();
            return;
        }

        const sweetButton = target.closest(".sweeties_item");
        if (!sweetButton || !this.isExpanded) {
            return;
        }

        const sweetName = sweetButton.getAttribute("data-sweet");
        if (!sweetName) {
            return;
        }

        this.selectSweet(sweetName);
    }

    toggleMenu() {
        if (this.isExpanded) {
            this.collapse();
            return;
        }

        this.expand();
    }

    expand() {
        if (!this.list || !this.toggle) {
            return;
        }

        this.isExpanded = true;
        this.list.hidden = false;
        this.toggle.setAttribute("aria-expanded", "true");
        this.toggle.textContent = "▼ Sweeties (click me)!";
    }

    collapse() {
        if (!this.list || !this.preview || !this.image || !this.toggle) {
            return;
        }

        this.isExpanded = false;
        this.list.hidden = true;
        this.preview.hidden = true;
        this.image.src = "";
        this.image.alt = "";
        this.toggle.setAttribute("aria-expanded", "false");
        this.toggle.textContent = "▶ Sweeties (click me)!";

        const selected = this.list.querySelector(".sweeties_item.is-selected");
        if (selected) {
            selected.classList.remove("is-selected");
        }
    }

    selectSweet(sweetName) {
        if (!this.list || !this.preview || !this.image) {
            return;
        }

        const selected = this.list.querySelector(".sweeties_item.is-selected");
        if (selected) {
            selected.classList.remove("is-selected");
        }

        const next = this.list.querySelector(`.sweeties_item[data-sweet=\"${sweetName}\"]`);
        if (!next) {
            return;
        }

        next.classList.add("is-selected");
        this.image.src = this.createSweetImage(sweetName);
        this.image.alt = `${sweetName} pic`;
        this.preview.hidden = false;
    }

    createSweetImage(sweetName) {
        switch (sweetName.toLowerCase()) {
            case "donut":
                return "../media/donut.jpg";
            case "cake":
                return "../media/cake.jpg";
            case "honey":
                return "../media/honey.jpg";
        }
    }
}
