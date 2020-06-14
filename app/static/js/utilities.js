class utilities {

    static changeSpeed() {
        speed = slider.value;
        pauseDuration = highlightDuration = 500 * (speed / 50);
        moveDuration = 1000 * (speed / 50);
    }

    static makeNavUnclickable() {
        $(".navbar-nav").prop("style", "pointer-events: none");
        $(".continue-anim").prop("style", "pointer-events: auto");
    }

    static makeNavClickable() {
        $(".navbar-nav").prop("style", "pointer-events: auto");
    }

    static swap(array, i1, i2) {
        var temp = array[i1];
        array[i1] = array[i2];
        array[i2] = temp;
    }

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    static async colorSorted() {
        for (var i = 0; i < arr.length; i++) {
            if (highlightDuration > 100) {
                await highlightSorted(i, "blue", 100);
            }
            else {
                await highlightSorted(i);
            }
        }
    }
}