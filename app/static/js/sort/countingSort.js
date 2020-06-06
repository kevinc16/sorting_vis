// also used for radix sort
class countingSort {
    static arrX = 0;
    static arrY = 0;

    static async countingSort(array=arr) {
        d3.select("#counting-sort-box").html("");
        var svg = d3.select("#counting-sort-box").append("svg").style("width", (14 * 40 + 45)).style("height", "inherit").style("background-color", "inherit");

        this.arrX = 2;
        this.arrY = $("#counting-sort-box").height() / 2;

        // count the numbers
        var largest = Math.max.apply(null, array);
        var cArr = new Array(largest+1).fill(0);

        $("#counting-sort-box").css("display", "block");


        for (var i = 0; i <= array.length; i++) {
            cArr[arr[i]] += 1;

            await swapElement(i, i, false);

            this.addToArray(svg, i);
        }

        var count = 0;
        for (var i = 0; i < cArr.length; i++) {
            while (cArr[i] > 0) {
                await this.replace(count, i);

                arr[count] = i;
                cArr[i] -= 1;

                count++;
            }
        }
        console.log(arr);
    }

    static async replace(index, hValue) {
        var group = d3.select("#i" + index);

        return new Promise((resolve) => {
            setTimeout(() => {
                // remove all children first
                group.html("");

                group.append("rect")
                    .attr("x", 0)
                    .attr("y", -y)
                    .attr("transform", "scale(1, -1)")
                    .attr("fill", "red")
                    .attr("width", width)
                    .transition()
                    .attr("height", hValue)
                    .duration(moveDuration);

                group.append("text")
                    .attr("x", width / 2)
                    .attr("y", y - 10)
                    .transition()
                    .attr("dy", ".35em")
                    .attr("class", "arrText")
                    .text(hValue)
                    .duration(moveDuration);;

                resolve("done");
            }, moveDuration)
        })
    }

    static addToArray(svg, count) {
        var height = 40;
        var width = 40;
        var group = svg.append("g").attr("id", "cArrGroup" + count);

        group.append("rect")
            .attr("x", this.arrX)
            .attr("y", this.arrY)
            .attr("width", 40)
            .attr("height", height)
            .style("fill", "white")
            .style("stroke", "black");

        group.append("text")
            .attr("x", this.arrX + width/2)
            .attr("y", this.arrY - 10)
            .attr("dy", ".35em")
            .attr("class", "arrText")
            .text(count);

        this.arrX += width;
    }
}