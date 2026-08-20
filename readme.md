# Sorting Visualizer

An interactive, browser-based visualization of common sorting algorithms. Watch each algorithm move and compare array values, adjust the animation speed, and generate a new randomized data set at any time.

[View the live demo](https://k9lvn.github.io/sorting_vis/)

## Algorithms

- Quick sort
- Heap sort
- Insertion sort
- Shell sort
- Counting sort

## Using the visualizer

1. Select an algorithm from the navigation bar to start its animation.
2. Move the **Sorting Speed** slider to adjust the animation timing.
3. Select **Generate New Array** to create another randomized data set.

Navigation is temporarily disabled while a sort is running so that animations do not overlap.

## Run locally

The project is a static site and does not require a build step. Clone the repository and serve its root directory with any local web server:

```bash
git clone git@github.com:kevinc16/sorting_vis.git
cd sorting_vis
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

The visualizer loads [D3.js](https://d3js.org/), [Bootstrap](https://getbootstrap.com/), and [jQuery](https://jquery.com/) from public CDNs, so an internet connection is required when running it locally.

## Project structure

```text
.
├── index.html                  # Page structure and third-party dependencies
└── app/static
    ├── css                     # Layout and visual styles
    └── js
        ├── main.js             # Array generation and animation primitives
        ├── utilities.js        # Shared animation and array helpers
        └── sort                # Sorting algorithm implementations
```

## License

This project is available under the [MIT License](LICENSE.md).
