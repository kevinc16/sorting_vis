var navHeight = $(".navbar")[0].offsetHeight;
var botHeight = $(".footer")[0].offsetHeight;

var cHeight = window.innerHeight - navHeight - botHeight;
var cWidth = window.innerWidth;

var num = 1;

var svg = d3.select("main").append("svg").attr("width", cWidth).attr("height", cHeight);

createArray();

function createArray() {
    svg.selectAll("*").remove();
    var group = svg.append("g");

    var width = 35;
    var x = 600;
    var y = cHeight / 2;

    for (var i = 0; i < 14; i++) {
        var group = svg.append("g").attr("id", "i" + i);

        var height = Math.floor(Math.random() * 300 + 20);  

        group.append("rect")
            // .attr("x", x)
            .attr("y", -y)
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "scale(1, -1)")
            .attr("fill", "red");

        group.append("text")
            .attr("x", width/2)
            .attr("y", y - 10)
            .attr("dy", ".35em")
            .text(height)
            .style("text-anchor", "middle");

        group.transition().attr("transform", `translate(${x}, 0)`).duration(0);
        group.attr("data-x", x);

        x += width + 20;
    }
}

// subtract Y to move up, add X to move right
function moveElement(id, x) {
    return new Promise((resolve, reject) => {
        setTimeout( function() {
            var ele = d3.select("#" + id);
            var eleMove = ele.transition();
            eleMove.attr("transform", `translate(${x}, 0)`).duration(1000);
            var oldX = ele.attr("data-x");
            ele.attr("data-x", parseInt(oldX) + x);
            // var rectX = ele.select("rect").attr("x");
            // console.log("rectx " + rectX);
            // eleMove.attr("transform", `translate(0, 0)`).duration(0);
            // ele.select("rect").attr("x", parseInt(rectX) + x);
            // console.log(parseInt(rectX) + x);
            
            resolve("done");
        }, 500);
    });
    // var ele = d3.select("#" + id);
    // var eleMove = ele.transition();
    // eleMove.attr("transform", `translate(${x}, 0)`).duration(1000);
}

function highlightElement(id, color="yellow") {
    return new Promise((resolve, reject) => { // returns a promise that will be resolved in 500ms
        setTimeout( function() {
            var eleMove = d3.select("#" + id).select("rect").transition();
            eleMove.attr("fill", color).duration(500);
            resolve("done");
        }, 500);
    });
    // var eleMove = d3.select("#" + id).select("rect").transition(num);
    // eleMove.attr("fill", color).duration(500);
}

function revertHightlight(id) {
    var ele = d3.select("#" + id).select("rect");
    var eleMove = ele.transition();
    eleMove.attr("fill", "red").duration(500);
}

async function swapElement(id1, id2) {
    var x1 = d3.select("#" + id1).attr("transform");
    var x2 = d3.select("#" + id2).attr("transform");

    console.log(x1);
    console.log(x2);

    var x1 = d3.select("#" + id1).attr("data-x");
    var x2 = d3.select("#" + id2).attr("data-x");

    console.log(id1 + x1);
    console.log(id2 + x2);

    // let p = new Promise((resolve, reject) => {
    //     setTimeout( function() {
    //         var eleMove = d3.select("#" + id1).select("rect").transition();
    //         eleMove.attr("fill", "yellow").duration(500);
    //         var eleMove2 = d3.select("#" + id2).select("rect").transition();
    //         eleMove2.attr("fill", "yellow").duration(500);
    //         resolve("done");
    //     }, 500);
    // });
    // let x = await p;

    return new Promise((resolve, reject) => { //returns a promise that resolves in 500ms, but it waits for the promises inside to resolve first
        setTimeout( async function() {
            highlightElement(id1);
            await highlightElement(id2);
        
            console.log(1);
        
            moveElement(id1, x2); // if x1 < x2, we move to the right, else left
            await moveElement(id2, x1);
            
            resolve("done");
        }, 500);
    });
}

//some problems
// async function sort() {
//     for (var i = 0; i < 2; i++) {
//         await swapElement("i" + i, "i" + (i+1));
//     }
// }

// sort();

swapElement("i1", "i2");
swapElement("i4", "i3");
