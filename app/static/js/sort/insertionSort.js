// $.getScript("../main.js", function() {
//     alert("Main script loaded but not necessarily executed.");
//  });

async function insertionSort() {
    makeNavUnclickable();

    for (var i = 1; i < barNum; i++) {
  
        key = arr[i];

        j = i-1;
        while (j >= 0 && key < arr[j]) {
                arr[j + 1] = arr[j];
                await swapElement("i" + (j+1), "i" + j, false);
                j -= 1;
        }
        arr[j + 1] = key;
    }
    makeNavClickable();
}