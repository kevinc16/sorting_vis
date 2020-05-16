var navHeight = $(".navbar")[0].offsetHeight;
var botHeight = $(".footer")[0].offsetHeight;

var cHeight = window.innerHeight - navHeight - botHeight;
var cWidth = window.innerWidth;

// global vars
var svg = d3.select("main").append("svg").attr("width", cWidth).attr("height", cHeight);
var dataX = "data-x";
var dataXTranslate = "data-x-translate";
var barNum = 14;

var width = 35;
var x = 600;
var y = cHeight / 2;
var spacing = 20;
var lowest = 20;
var max = 300;

var arr = [];
// var idArr = [];

var slider = $("#myRange")[0];
var speed = slider.value;

var highlightDuration = 500 * (speed / 50);
var moveDuration = 1000 * (speed / 50);
var pauseDuration = 500 * (speed / 50);

createArray(); // start of page

function createArray() {
    svg.selectAll("*").remove();
    var group = svg.append("g");
    arr.length = 0; // clear array
    
    var curX = x;

    for (var i = 0; i < barNum; i++) {
        var group = svg.append("g").attr("id", "i" + i);

        var height = Math.floor(Math.random() * max + lowest);
        arr.push(height);
        // idArr.push(i);

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
            .text(height)

        group.transition().attr("transform", `translate(${curX}, 0)`).duration(0);
        // group.attr(`${dataX}`, curX);
        group.attr(`${dataXTranslate}`, curX);

        curX += width + spacing;
    }
}

// subtract Y to move up, add X to move right
function moveElement(id, xTranslate) {
    return new Promise((resolve, reject) => {
        setTimeout( function() {
            var ele = d3.select("#" + id);
            var eleMove = ele.transition();

            ele.attr(`${dataXTranslate}`, xTranslate);
            eleMove.attr("transform", `translate(${xTranslate}, 0)`).duration(moveDuration); // add setting for changing speed

            resolve("done");
        }, pauseDuration);
    });
}

function highlightElement(id, color="yellow") {
    return new Promise((resolve, reject) => { // returns a promise that will be resolved in 500ms
        setTimeout( function() {
            var eleMove = d3.select("#" + id).select("rect").transition();
            eleMove.attr("fill", color).duration(highlightDuration);

            resolve("done");
        }, pauseDuration);
    });
}

function revertHightlight(id) {
    return new Promise((resolve, reject) => { // returns a promise that will be resolved in 500ms
        setTimeout( function() {
            var ele = d3.select("#" + id).select("rect");
            var eleMove = ele.transition();
            eleMove.attr("fill", "red").duration(highlightDuration);

            resolve("done");
        }, pauseDuration * 2);
    });
}

// id parameter requires "i" + num 
async function swapElement(id1, id2, idFromOrder=true) {
    if (idFromOrder) {
        // do nothing
    }
    else {
        d3.select("#" + id1).attr("id", id2)
        d3.select("#" + id2).attr("id", id1);
    }
    var x1 = d3.select("#" + id1).attr(`${dataXTranslate}`);
    var x2 = d3.select("#" + id2).attr(`${dataXTranslate}`);
    
    return new Promise((resolve, reject) => { //returns a promise that resolves in 500ms, but it waits for the promises inside to resolve first
        setTimeout( async function() {
            highlightElement(id1);
            await highlightElement(id2);
        
            moveElement(id1, x2); // if x1 < x2, we move to the right, else left
            await moveElement(id2, x1);

            revertHightlight(id1);
            await revertHightlight(id2);
            
            resolve("done");
        }, pauseDuration);
    });
}
