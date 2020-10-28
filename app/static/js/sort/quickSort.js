async function quickSort() {
    utilities.makeNavUnclickable();
    $("#counting-sort-box").html("");
    $("#counting-sort-box").css("display", "none");

    await quickSortIterative(arr, 0, arr.length-1);

    utilities.makeNavClickable();
}

// This function takes last element as pivot
// we know an element is in the correct position if all elements before are smaller and all elements after are larger
// which is what we try to do
async function partition(arr, low, high) {
    var pivot = arr[high];

    await highlightSorted(high, "purple");

    // index of smaller element 
    var i = (low - 1);
    for (var j = low; j <= high - 1; j++) {

        // If current element is smaller than or equal to pivot, move it to the front of the pivot (which is i)
        if (arr[j] <= pivot) {

            i++;

            // swap arr[i] and arr[j] 
            utilities.swap(arr, i, j);
            await swapElement(i, j, false);
        }
    }

    // swap arr[i+1] the pivot, the correct position
    utilities.swap(arr, i + 1, high);
    await swapElement(i+1, high, false, "red");

    await revertHightlight(high, "red");

    return i + 1; //we return the index of the pivot
}

// we use a stack to mimic recursion
// after each pass we reduce the problem by half in the best case (depending on where the pivot is)
async function quickSortIterative(arr, start, end) {
    var stack = [];
    stack.length = end - start + 1; // n
    stack.fill(0);

    // initialize top of stack 
    var top = -1;

    // push initial values of start and end to stack 
    stack[++top] = start; // stack[0] = 0
    stack[++top] = end; // stack[1] = n

    // Keep popping from stack while is not empty 
    while (top >= 0) {
        // Pop h and l 
        end = stack[top--]; // end = stack[1] = n, 2nd run, end = n
        start = stack[top--]; // start = stack[0] = 0, 2nd run, start = 7 - this way we keep eliminating more elements
        // n = -1

        // Set pivot element at its correct position in sorted array 
        var p = await partition(arr, start, end); // the first time, we start with 0, n

        // If there are elements on left side of pivot, then push left side to stack 
        if (p - 1 > start) { // if the index of the previous pivot - 1 is larger than the first index (for 1st run), then we have a new partition to look at
            stack[++top] = start; // for 2nd run, e.g. stack[0] = 0
            stack[++top] = p - 1; // for 2nd run, e.g. stack[1] = 5
        }

        // If there are elements on right side of pivot, then push right side to stack 
        if (p + 1 < end) { // if the index of the previous pivot + 1 is less than the last index (for 1st run), then we have a new partition to look at
            stack[++top] = p + 1; // for 2nd run, e.g. stack[0] = 7
            stack[++top] = end; // for 2nd run, e.g. stack[0] = n
        }
    }

    await utilities.colorSorted();
}