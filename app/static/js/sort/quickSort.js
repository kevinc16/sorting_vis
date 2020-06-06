async function quickSort() {
    utilities.makeNavUnclickable();
    $("#counting-sort-box").html("");
    $("#counting-sort-box").css("display", "none");

    await quickSortIterative(arr, 0, arr.length-1);

    utilities.makeNavClickable();
}

/* This function takes last element as pivot, 
        places the pivot element at its correct 
        position in sorted array, and places all 
        smaller (smaller than pivot) to left of 
        pivot and all greater elements to right 
        of pivot */
async function partition(arr, low, high) {
    var temp;
    var pivot = arr[high];

    // index of smaller element 
    var i = (low - 1);
    for (var j = low; j <= high - 1; j++) {
        // If current element is smaller 
        // than or equal to pivot 
        if (arr[j] <= pivot) {
            i++;

            // swap arr[i] and arr[j] 
            utilities.swap(arr, i, j);
            await swapElement(i, j, false);
        }
    }

    // swap arr[i+1] and arr[high] 
    // (or pivot) 

    utilities.swap(arr, i + 1, high);
    await swapElement(i+1, high, false);

    return i + 1;
}

/* A[] --> Array to be sorted,
l --> Starting index,
h --> Ending index */
async function quickSortIterative(arr, l, h) {
    // Create an auxiliary stack 
    var stack = [];
    stack.length = h - l + 1;
    stack.fill(0);

    // initialize top of stack 
    var top = -1;

    // push initial values of l and h to 
    // stack 
    stack[++top] = l;
    stack[++top] = h;

    // Keep popping from stack while 
    // is not empty 
    while (top >= 0) {
        // Pop h and l 
        h = stack[top--];
        l = stack[top--];

        // Set pivot element at its 
        // correct position in 
        // sorted array 
        var p = await partition(arr, l, h);

        // If there are elements on 
        // left side of pivot, then 
        // push left side to stack 
        if (p - 1 > l) {
            stack[++top] = l;
            stack[++top] = p - 1;
        }

        // If there are elements on 
        // right side of pivot, then 
        // push right side to stack 
        if (p + 1 < h) {
            stack[++top] = p + 1;
            stack[++top] = h;
        }
    }
}