// $.getScript("../main.js", function() {
//     alert("Main script loaded but not necessarily executed.");
//  });

// add another color for temporaily sorted elements***

async function insertionSort() {
    utilities.makeNavUnclickable();

    for (var i = 1; i < barNum; i++) {
  
        key = arr[i]; // keep the value we are looking at right now

        j = i-1;
        while (j >= 0 && key < arr[j]) {
            arr[j + 1] = arr[j];
            await swapElement((j+1), j, false);
            j -= 1;
        }
        arr[j + 1] = key; // this is the correct place for the value
    }

    for (var i = 0; i < barNum; i++) {
        if (highlightDuration > 100) {
            await highlightSorted(i, color="blue", duration=100);
        }
        else {
            await highlightSorted(i);
        }
    }
    
    utilities.makeNavClickable();
}