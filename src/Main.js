import { kaileFruits } from "./Data.js";

const TAB_DEFAULT_TEXT = "#E0F4F2";
const TAB_HOVER_BG = "#3D8C85";
const TAB_ACTIVE_BG = "#2E6E68";

function tabStyleEventHandler() {
    $("#fruits li").each(function () {
        const $li = $(this);
        if ($li.hasClass("active")) {
            $li.css({
                backgroundColor: TAB_ACTIVE_BG,
                color: "#ffffff"
            });
        } else {
            $li.css({
                backgroundColor: "transparent",
                color: TAB_DEFAULT_TEXT
            });
        }
    });
}

function cleanFruitName(name) {
	// images of fruit must be png's with lowercase name of fruit (non-plural)
	let fruit_image_name = name.toLowerCase();
	fruit_image_name = fruit_image_name.replace(/'s$/, "");
	if (fruit_image_name.endsWith("s")) {
		fruit_image_name = fruit_image_name.slice(0, -1);
	}
	return fruit_image_name;
}

function showFruit(index) {
    const fruit = kaileFruits[index];
    const name = fruit.fruit.charAt(0).toUpperCase() + fruit.fruit.slice(1);

	// remove all actives brute foce
    $("#fruits li").removeClass("active");
    $("#fruits li").eq(index).addClass("active");
    tabStyleEventHandler();

	let image_name = cleanFruitName(name);

    $("#fruitDesc").html(`
        <h2>${image_name.charAt(0).toUpperCase() + fruit.fruit.slice(1)}</h2>
        <div class="fruit-body">
            <img src="./media/${image_name.toLowerCase()}.png" alt="${image_name}" class="fruit-img" />
            <p>${fruit.descr}</p>
        </div>
    `);
}

function initApp() {
    const list = $("#fruits");

    kaileFruits.forEach((item, i) => {
        const li = $("<li>")
            .text(item.fruit.charAt(0).toUpperCase() + item.fruit.slice(1))
            .on("mouseenter", function () {
                if (!$(this).hasClass("active")) {
                    $(this).css("backgroundColor", TAB_HOVER_BG);
                }
            })
            .on("mouseleave", function () {
                if (!$(this).hasClass("active")) {
                    $(this).css("backgroundColor", "transparent");
                    $(this).css("color", TAB_DEFAULT_TEXT);
                }
            })
            .on("click", function () {
                showFruit(i);
            });
        list.append(li);
    });

    showFruit(0);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

