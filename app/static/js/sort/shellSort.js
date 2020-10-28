// in place & memory efficient & can use different gap sizes to reduce time complexity
async function shellSort() {
    utilities.makeNavUnclickable();

    var n = arr.length;
    $("#counting-sort-box").html("");
    $("#counting-sort-box").css("display", "none");

    // at first, we sort elements that are gap distance apart
    // as the gap gets smaller, we basically use insertion sort to sort all the elements
    for (var gap = parseInt(n / 2); gap > 0; gap = parseInt(gap / 2)) {

        // compare all elements to the right of the gap - since we are going backwards basically
        for (var i = gap; i < n; i++) {

            var temp = arr[i];

            // the elements that are compared
            if (arr[i - gap] <= temp) {
                await compareElement(i-gap, i);
            }

            // in the end, it becomes insertion sort
            // move larger elements to the back of the array & check until the start of the gap group
            var j;
            for (j = i; j >= gap && arr[j - gap] > temp; j = j - gap) {
                arr[j] = arr[j - gap];
                await swapElement(j, (j - gap), false);
            }
            // put temp (the original a[i]) in its correct location 
            arr[j] = temp;
        }
    }

    await utilities.colorSorted();

    utilities.makeNavClickable();
}