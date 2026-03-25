
import {arrColors, arrTexts} from "./MyArrays.js"
import {Button} from "./MyButtons.js"

export function generateButtons() {
    let buttons = [];
    arrTexts.forEach(function(title, i) {
        let color = arrColors[i];
        let text = title + " is shown on the " + color + " background";

        buttons.push(
            new Button(title, color, text)
        );
    });

    return buttons;
}


export function showButtons(arrButtons) {
    arrButtons.forEach(function(button, i) {
        setTimeout(function() {
            button.show();
        }, (i + 5) * 1000);
    });
}

