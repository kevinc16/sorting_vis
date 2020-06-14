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

        // If current element is smaller than or equal to pivot, move it to the front of the pivot
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

    return i + 1;
}

// we use a stack to mimic recursion
// after each pass we reduce the problem by half in the best case (depending on where the pivot is)
async function quickSortIterative(arr, start, end) {
    var stack = [];
    stack.length = end - start + 1;
    stack.fill(0);

    // initialize top of stack 
    var top = -1;

    // push initial values of start and end to stack 
    stack[++top] = start;
    stack[++top] = end;

    // Keep popping from stack while is not empty 
    while (top >= 0) {
        // Pop h and l 
        end = stack[top--];
        start = stack[top--];

        // Set pivot element at its correct position in sorted array 
        var p = await partition(arr, start, end);

        // If there are elements on left side of pivot, then push left side to stack 
        if (p - 1 > start) {
            stack[++top] = start;
            stack[++top] = p - 1;
        }

        // If there are elements on right side of pivot, then push right side to stack 
        if (p + 1 < end) {
            stack[++top] = p + 1;
            stack[++top] = end;
        }
    }

    await utilities.colorSorted();
}