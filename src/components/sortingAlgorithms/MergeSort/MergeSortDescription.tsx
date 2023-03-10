import React from 'react';

function MergeSortDescription(): JSX.Element {
  return (
    <div className="description-section">
      <h1>About Merge Sort</h1>
      {/* Got from Wikipedia */}
      {/* Put text in a seperate file and import contnet here */}
      <p className="description">
        In computer science, merge sort (also commonly spelled as mergesort) is
        an efficient, general-purpose, and comparison-based sorting algorithm.
        Most implementations produce a stable sort, which means that the order
        of equal elements is the same in the input and output. Merge sort is a
        divide-and-conquer algorithm that was invented by John von Neumann in
        1945.[2] A detailed description and analysis of bottom-up merge sort
        appeared in a report by Goldstine and von Neumann as early as 1948.
      </p>
      {/* Got from Wikipedia */}
      <h2 className="sub-title">Algorithm Analysis</h2>
      <p className="description">
        Conceptually, a merge sort works as follows: Divide the unsorted list
        into n sublists, each containing one element (a list of one element is
        considered sorted). Repeatedly merge sublists to produce new sorted
        sublists until there is only one sublist remaining. This will be the
        sorted list. In sorting n objects, merge sort has an average and
        worst-case performance of O(n log n). If the running time of merge sort
        for a list of length n is T(n), then the recurrence relation T(n) =
        2T(n/2) + n follows from the definition of the algorithm (apply the
        algorithm to two lists of half the size of the original list, and add
        the n steps taken to merge the resulting two lists).[4] The closed form
        follows from the master theorem for divide-and-conquer recurrences.
      </p>
      <h2 className="sub-title">Runtime Complexity <mark>O(N LOG N)</mark></h2>
      <p className="description">
        The runtime of Merge Sort is O(n log n), where n is the number of
        elements to be sorted. Merge Sort is a divide-and-conquer algorithm that
        works by recursively splitting an input array into halves until only
        single-element subarrays remain. It then merges these subarrays in
        sorted order, resulting in a fully sorted array. The divide-and-conquer
        approach results in a logarithmic number of recursive calls, where each
        recursive call operates on a sublist of size n/2. The merging operation,
        which compares and combines two sorted sublists of size n/2, takes
        linear time O(n). Therefore, the total runtime of Merge Sort is O(n log
        n) as the algorithm requires log n recursive calls, and each call
        performs O(n) work during the merging step. The O(n log n) runtime of
        Merge Sort makes it an efficient sorting algorithm for large data sets,
        and it is often preferred over other sorting algorithms, such as bubble
        sort or selection sort, which have worse worst-case runtime
        complexities.
      </p>
      <h2 className="sub-title">Space Complexity <mark>O(N)</mark></h2>
      <p className="description">
        The space complexity of Merge Sort is O(n), where n is the number of
        elements in the array being sorted. In Merge Sort, the input array is
        repeatedly divided into two halves until each sub-array contains only
        one element. Then, the sub-arrays are merged in sorted order. During the
        merge operation, an additional array is required to hold the merged
        sub-arrays. The size of this auxiliary array is the same as the size of
        the original array being sorted. However, after the merge operation is
        complete, the auxiliary array is no longer needed and can be
        deallocated. Therefore, the maximum amount of additional space required
        by Merge Sort is proportional to the size of the original array, giving
        a space complexity of O(n). Overall, Merge Sort is an efficient
        algorithm with a good balance between time and space complexity.
      </p>
    </div>
  );
}

export default MergeSortDescription;
