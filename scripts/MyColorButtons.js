import {Button} from "./MyButtons.js"

export class ColorButton extends Button {
    constructor(btnText, btnBgColor, btnTitle, fColor) {
        super(btnText, btnBgColor, btnTitle);
        this.fColor = fColor;
    }

    show() {
        const contents = '<button style="background-color: ' + this.btnBgColor + '; color: ' + this.fColor + '" ' + 
                    'title="' + this.btnTitle + '" >' + 
                    this.btnText + '</button>';
        console.log("Contents: ", contents);
        document.getElementById("task_1").innerHTML += contents;
    }
}