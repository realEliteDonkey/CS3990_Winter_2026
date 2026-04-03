export class NumberGenerator {
    constructor() {
        this.count = 0;
    }

    refresh() {
        this.count = Math.floor(Math.random() * 100);
    }

    increment() {
        if (this.count == 100) return;
        this.count++;
        console.log(this.count);
    }

    decrement() {
        if (this.count == 0) return;
        this.count--;
        console.log(this.count);
    }
}
