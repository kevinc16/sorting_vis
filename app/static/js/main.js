var navHeight = $(".navbar")[0].offsetHeight;
var botHeight = $(".footer")[0].offsetHeight;

var cHeight = window.innerHeight - navHeight - botHeight;
var cWidth = window.innerWidth;

var svg = d3.select("main").append("svg").attr("width", cWidth).attr("height", cHeight);

// c.setAttribute("width", cWidth);
// c.setAttribute("height", cHeight);

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

        var rectangles = group.append("rect")
                            .attr("x", x)
                            .attr("y", -y)
                            .attr("width", width)
                            .attr("height", height)
                            .attr("transform", "scale(1, -1)")
                            .attr("fill", "red");

        var num = group.append("text").attr("x", x + width/2)
                                    .attr("y", y - 10)
                                    .attr("dy", ".35em")
                                    .text(height)
                                    .style("text-anchor", "middle");

        x += width + 20;
    }
}

// var canvas = document.getElementById("main-canvas");
// var c;
// var barColors = "#FFB4A4";
// var arr = [];

// prepareCanvas();
// createArray();

// function prepareCanvas() {
//     canvas.width = window.innerWidth;

//     var navHeight = $(".navbar")[0].offsetHeight;
//     var botHeight = $(".footer")[0].offsetHeight;

//     canvas.height = window.innerHeight - navHeight - botHeight;

//     c = canvas.getContext("2d");
//     c.transform(1, 0, 0, -1, 0, canvas.height);

//     c.fillStyle = barColors;
// }

// function moveBar(index1, index2) {
//     requestAnimationFrame(moveBar);
// }

// function createArray() {
//     var spacing = 20;
//     var width = 20
//     var xStart = (window.innerWidth - 600) / 2;
//     var yStart = window.innerHeight / 2;
//     var num = 15;
//     c.clearRect(0, 0, canvas.width, canvas.height);
//     for (var i = 0; i < num; i++) {
//         var height = Math.floor(Math.random() * 300 + 10);
//         c.fillRect(xStart, yStart, width, height);
//         xStart += spacing + width;
//     }
//     arr.push(height);
// }

// // line
// // c.beginPath();
// // c.moveTo(500, 100);
// // c.lineTo(100, 100);
// // c.lineTo(100, 400);
// // c.strokeStyle = "red";
// // c.stroke();