// also used for radix sort
class countingSort {
    static arrX = 0;
    static arrY = 0;
    static width = 25;
    static height = 30;

    static async countingSort(array=arr) {
        utilities.makeNavUnclickable();

        d3.select("#counting-sort-box").html("");
        var svg = d3.select("#counting-sort-box")
                    .append("svg")
                    .attr("id", "csvg")
                    .style("width", "inherit")
                    .style("height", "inherit")
                    .style("margin", "0 auto")
                    .style("display", "block");

        this.arrX = 2;
        this.arrY = $("#counting-sort-box").height() / 2;

        var largest = Math.max.apply(null, array);
        var cArr = new Array(largest+1).fill(0);

        $("#counting-sort-box").css("display", "block");

        var tempArr = array.slice();
        tempArr.sort(function (a, b) { return a - b });
        tempArr = [...new Set(tempArr)]; // remove duplicates

        // add the frame
        for (var i = 0; i < tempArr.length; i++) {
            this.skip(svg);
            this.addToArray(svg, tempArr[i]);
        }

        // change width based on duplicates
        d3.select("#csvg").style("width", (tempArr.length * this.width * 2) + 25 );

        // animate counting 
        for (var i = 0; i <= array.length; i++) {
            cArr[array[i]] += 1;
            await swapElement(i, i, false);

            var text = d3.select("#cArrText" + array[i]);
            text.transition()
                .text(cArr[array[i]])
                .duration(highlightDuration);
        }

        await utilities.sleep(500);
        // now apply it
        // cArr is the longer array
        var count = 0;
        for (var i = 0; i < cArr.length; i++) {
            while (cArr[i] > 0) {
                await this.replace(count, i);

                array[count] = i;
                cArr[i] -= 1;

                var text = d3.select("#cArrText" + i);
                text.transition()
                    .text(cArr[i])
                    .duration(highlightDuration);

                count++;
            }
        }

        // highlight sorted
        for (var i = 0; i < array.length; i++) {
            if (highlightDuration > 100) {
                await highlightSorted(i, color = "blue", duration = 100);
            }
            else {
                await highlightSorted(i);
            }
        }

        utilities.makeNavClickable();
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
        var group = svg.append("g").attr("id", "cArrGroup" + count);

        group.append("rect")
            .attr("x", this.arrX)
            .attr("y", this.arrY)
            .attr("width", this.width)
            .attr("height", this.height)
            .style("fill", "white")
            .style("stroke", "black");

        group.append("text")
            .attr("x", this.arrX + this.width/2)
            .attr("y", this.arrY - 10)
            .attr("dy", ".35em")
            .attr("class", "arrText")
            .text(count);

        group.append("text")
            .attr("id", "cArrText"+count)
            .attr("x", this.arrX + this.width / 2)
            .attr("y", this.arrY + 15)
            .attr("dy", ".35em")
            .attr("class", "countText")
            .text(0);

        this.arrX += this.width;
    }

    static skip(svg) {
        var group = svg.append("g");

        group.append("text")
            .attr("x", this.arrX + this.width / 2)
            .attr("y", this.arrY)
            .attr("dy", ".35em")
            .attr("class", "arrText")
            .text("...");

        this.arrX += this.width;
    }
}