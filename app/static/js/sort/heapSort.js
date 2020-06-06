
// add another color after done building the heap

async function heapSort() {
    utilities.makeNavUnclickable();
    $("#counting-sort-box").html("");
    $("#counting-sort-box").css("display", "none");

    for (var i = 0; i < heapSize; i++) {
        highlightSorted(i, "red");
    }

    // build max heap - starting from the bottom 
    var heapSize = arr.length;
    for (var i = 1; i < heapSize; i++) {
        // if child is bigger than parent 
        var parent = Math.floor((i - 1) / 2);
        if (arr[i] > arr[parent]) {
            var j = i;

            // swap child and parent until parent is smaller 
            while (arr[j] > arr[Math.floor((j - 1) / 2)]) {
                var parent = Math.floor((j - 1) / 2);

                utilities.swap(arr, j, parent);
                await swapElement(j, parent, false);
                j = parent;
            }
        }
    }

    for (var i = 0; i < heapSize; i++) {
        highlightSorted(i, "green");
    }
    await utilities.sleep(1000);

    //====================================
    // reduce the max heap by one - taking the top element & repeat
    for (var i = heapSize - 1; i > 0; i--) {

        // swap value of first indexed with last indexed
        utilities.swap(arr, 0, i);
        await swapElement(0, i, false, "green");
        await highlightSorted(i);

        // not max heap anymore
        for (var a = 0; a < i; a++) {
            highlightSorted(a, "red");
        }

        // maintaining heap property after each swapping 
        var j = 0;
        var index = (2 * j + 1);

        // heapify
        do {
            index = (2 * j + 1);

            // if left child is smaller than right child set index variable to right child 
            if (index < (i - 1) && arr[index] < arr[index + 1]) {
                index++;
            }

            // if parent is smaller than child then swapping parent with child having higher value 
            if (index < i && arr[j] < arr[index]) {
                utilities.swap(arr, j, index);
                await swapElement(j, index, false);
            }
            j = index;

        } while (index < i);

        // rebuilt max heap
        for (var a = 0; a < i; a++) {
            highlightSorted(a, "green");
        }
    }
    highlightSorted(0);

    utilities.makeNavClickable();
}

async function buildMaxHeap(arr, heapSize) {
    for (var i = 1; i < heapSize; i++) {
        // if child is bigger than parent 
        var parent = Math.floor((i - 1) / 2);
        if (arr[i] > arr[parent]) {
            var j = i;

            // swap child and parent until parent is smaller 
            while (arr[j] > arr[Math.floor((j - 1) / 2)]) {
                var parent = Math.floor((j - 1) / 2);

                utilities.swap(arr, j, parent);
                await swapElement(j, parent, false);
                j = parent;
            }
        }
    }
}