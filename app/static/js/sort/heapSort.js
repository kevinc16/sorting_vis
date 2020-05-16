async function heapSort() {
    makeNavUnclickable();

    // build max heap - starting from the bottom 
    var heapSize = arr.length;
    for (var i = (heapSize / 2) - 1; i >= 0; i--)
        heapify(arr, heapSize, i);

    // reduce the max heap by one - taking the top element & repeat
    while (heapSize > 0) {
        swap(arr, 0, heapSize-1);
        heapSize--;
        heapify(arr, heapSize, 0);
    }
    console.log(arr);

    makeNavClickable();
}

// heapifies at the startIndex - requires all subtrees to be heaps already
async function heapify(array, eleNum, startIndex) {
    // Find largest among root, left child and right child
    var largest = startIndex;
    var left = 2 * startIndex + 1;
    var right = 2 * startIndex + 2;
  
    if (left < eleNum && array[left] > array[largest])
        largest = left;
  
    if (right < eleNum && array[right] > array[largest])
        largest = right;
  
      // Swap and continue heapifying if root is not largest
    if (largest != startIndex) {
        swap(array, startIndex, largest);

        // await swapElement("i"+startIndex, "i"+largest, false);
        heapify(array, eleNum, largest);
    }
}

