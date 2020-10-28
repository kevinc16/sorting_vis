// $.getScript("../main.js", function() {
//     alert("Main script loaded but not necessarily executed.");
//  });

// add another color for temporaily sorted elements***

async function insertionSort() {
    utilities.makeNavUnclickable();
    $("#counting-sort-box").html("");
    $("#counting-sort-box").css("display", "none");

    for (var i = 0; i < barNum; i++) {

        // highlighting the sub array thats sorted
        for (var a = 0; a <= i; a++) {
            if (a != (i-1)) {
                highlightSorted(a, "green");
            }
            else {
                highlightSorted(a, "purple");
            }
        }

        key = arr[i]; // keep the value we are looking at right now

        // move all elements in the sub array up till correct position
        j = i-1;
        while (j >= 0 && key < arr[j]) { // while key is less than the prev element, we swap
            arr[j + 1] = arr[j];
            await swapElement((j+1), j, false);
            j -= 1;
        }
        arr[j + 1] = key; // this is the correct place for the value
    }
    for (var a = 0; a <= i; a++) {
        highlightSorted(a, "green");
    }
    await utilities.sleep(500);

    // finish
    await utilities.colorSorted();
    
    utilities.makeNavClickable();
}