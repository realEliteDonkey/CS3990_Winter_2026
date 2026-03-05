function getAnimalImage() {
    let animal = prompt("Pick an animal from the following:\nCat, Frog, Mouse, Dog\nEnter Animal: ").toUpperCase();
    let image = document.getElementById("animal_image");
    switch (animal) {
        case "CAT":
            image.src = "images/cat.jpg";
            break;
        case "DOG":
            image.src = "images/dog.jpg";
            break;
        case "FROG":
            image.src = "images/frog.jpg";
            break;
        case "MOUSE":
            image.src = "images/mouse.jpg";
            break;
        default:
            image.src = "";
            break;
    }
    return image;
}

function login_1() {
    alert("Language Abbreviations:\nEng, Fr, De, Spa");
    let input = prompt("Enter your language abbreviation: ");

    switch (input.toUpperCase()) {
        case "ENG":
            alert("Hello.");
            break;
        case "FR":
            alert("Bonjour.");
            break;
        case "DE":
            alert("Hallo.");
            break;
        case "SPA":
            alert("Hola.");
            break;
        default:
            alert("I do not speak your language.");
    }

    let birth_year = parseInt(prompt("Enter your year of birth: "));
    let current_year = 2026;
    let age = current_year - birth_year;
    if (age >= 18) {
        let image = document.getElementById("cs_image");
        image.style.display = "inline-block";
    } else {
        alert("Content is not available due to age restrictions.");
        return;
    }

    if (age < 55) {
        let animal_image = getAnimalImage();
        animal_image.style.display = "inline-block";
    } else {
        let paragraph = document.getElementById("old_timer_paragraph");
        paragraph.style.display = "block";
    }
}

