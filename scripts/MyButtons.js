
export class Button {
    constructor(btnText, btnBgColor, btnTitle) {
        this.btnText = btnText;
        this.btnBgColor = btnBgColor;
        this.btnTitle = btnTitle;
    }

    show() {
        const contents = '<button style="background-color: ' + this.btnBgColor + '" ' + 
                    'title="' + this.btnTitle + '" >' + 
                    this.btnText + '</button>';
        console.log("Contents: ", contents);
        document.getElementById("task_1").innerHTML += contents;
    }
}



