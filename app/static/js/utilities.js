function changeSpeed() {
    speed = slider.value;
    pauseDuration = highlightDuration = 500 * (speed / 50);
    moveDuration = 1000 * (speed / 50);
    console.log(speed)
}

function makeNavUnclickable() {
    $(".navbar-nav").prop("style", "pointer-events: none");
    $(".slidecontainer").prop("style", "pointer-events: auto");
}

function makeNavClickable() {
    $(".navbar-nav").prop("style", "pointer-events: auto");
}

function swap(array, i1, i2) {
    var temp = array[i1];
    array[i1] = array[i2];
    array[i2] = temp;
}