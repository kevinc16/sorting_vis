var navHeight = $(".navbar")[0].offsetHeight;
var botHeight = $(".footer")[0].offsetHeight;

var cHeight = window.innerHeight - navHeight - botHeight - 400;
if (cHeight < 450) {
    cHeight = 450;
}

// global vars
var dataX = "data-x";
var dataXTranslate = "data-x-translate";
var barNum = 14;

// As Y increases, the element in svg moves down
var width = 35;
var x = 35; // start of bar
var y = cHeight / 2 + 200;
var spacing = 20;
var lowest = 20;
var max = 300;

var cWidth = 14 * (spacing + width) + 50;

var arr = [];
// the index of the array represents the position, and the value in the array represents which "bar" (from 'arr') occupies the position
var idArr = [];

var slider = $("#myRange")[0];
var speed = slider.value;

var highlightDuration = 500 * (speed / 50);
var moveDuration = 1000 * (speed / 50);
var pauseDuration = 500 * (speed / 50);

// set dimensions
var svg = d3.select("#svg-div").append("svg").attr("width", cWidth).attr("height", cHeight).attr("id", "main-svg");

$("#counting-sort-box").css("width", cWidth).css("height", (navHeight + botHeight));
$("body").css("height", window.innerHeight);
// make invis for other sorts
$("#counting-sort-box").css("display", "none");


// *** start of page ***
createArray();

function createArray() {
    svg.selectAll("*").remove();
    var group = svg.append("g");

    // clear array
    arr.length = 0;
    idArr.length = 0;
    
    var curX = x;

    for (var i = 0; i < barNum; i++) {
        var group = svg.append("g").attr("id", "i" + i);

        var height = Math.floor(Math.random() * max + lowest);
        arr.push(height);
        idArr.push(i);

        group.append("rect")
            .attr("x", 0)
            .attr("y", -y)
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "scale(1, -1)")
            .attr("fill", "red");

        group.append("text")
            .attr("x", width/2)
            .attr("y", y - 10)
            .attr("dy", ".35em")
            .attr("class", "arrText")
            .text(height);

        group.transition().attr("transform", `translate(${curX}, 0)`).duration(0);
        group.attr(`${dataXTranslate}`, curX);

        curX += width + spacing;
    }
}

// subtract Y to move up, add X to move right
function moveElement(id, xTranslate) {
    return new Promise((resolve, reject) => {
        setTimeout( function() {
            var ele = d3.select("#i" + id);
            var eleMove = ele.transition();

            ele.attr(`${dataXTranslate}`, xTranslate);
            eleMove.attr("transform", `translate(${xTranslate}, 0)`).duration(moveDuration); // add setting for changing speed

            resolve("done");
        }, pauseDuration);
    });
}

function highlightElement(id, color="yellow") {
    return new Promise((resolve) => { // returns a promise that will be resolved in pauseDuration (ms)
        setTimeout( function() {
            var eleMove = d3.select("#i" + id).select("rect").transition();
            eleMove.attr("fill", color).duration(highlightDuration);

            resolve("done");
        }, pauseDuration);
    });
}

function revertHightlight(id, returnColor="red") {
    return new Promise((resolve) => { // returns a promise that will be resolved in pauseDuration * 2
        setTimeout( function() {
            var ele = d3.select("#i" + id).select("rect");
            var eleMove = ele.transition();
            eleMove.attr("fill", returnColor).duration(highlightDuration);

            resolve("done");
        }, pauseDuration * 2);
    });
}
// id from order = true means the index as we see on the screen - if false it means we should refer to the index array
async function swapElement(id1, id2, idFromOrder=true, returnColor="red") {
    if (idFromOrder) {
        // do nothing
    }
    else {
        // swap the positions in the index array
        utilities.swap(idArr, id1, id2);

        id1 = idArr[id1];
        id2 = idArr[id2];
    }
    var x1 = $("#i" + id1).attr(`${dataXTranslate}`);
    var x2 = $("#i" + id2).attr(`${dataXTranslate}`);

    return new Promise((resolve) => { //returns a promise that resolves in 500ms, but it waits for the promises inside to resolve first
        setTimeout( async function() {
            highlightElement(id1);
            await highlightElement(id2);
        
            moveElement(id1, x2); // if x1 < x2, we move to the right, else left
            await moveElement(id2, x1);

            revertHightlight(id1, returnColor);
            await revertHightlight(id2, returnColor);

            resolve("done");
        }, pauseDuration);
    });
}

function highlightSorted(id, color="blue", duration=highlightDuration) {
    return new Promise((resolve) => { // returns a promise that will be resolved in 500ms
        setTimeout(function () {
            // not from order
            id = idArr[id];

            var ele = d3.select("#i" + id).select("rect");
            var eleMove = ele.transition();
            eleMove.attr("fill", color).duration(highlightDuration);

            resolve("done");
        }, duration);
    });
}

async function compareElement(id1, id2, color="yellow", fromOrder=true) {
    if (fromOrder) {
        id1 = idArr[id1];
        id2 = idArr[id2];
    }
    highlightElement(id1, color);
    await highlightElement(id2, color);

    revertHightlight(id1);
    await revertHightlight(id2);
}
