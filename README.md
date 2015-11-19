# conway game of life

This is a simple implementation of [Conway's game of life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) written in javascript. The main rules are re-calculated after every generation:

1. Any live cell with fewer than two live neighbours dies, as if by needs caused by underpopulation.
2. Any live cell with more than three live neighbours dies, as if by overcrowding.
3. Any live cell with two or three live neighbours lives, unchanged, to the next generation.
4. Any dead cell with exactly three live neighbours cells will come to life.

Currently for this version a 20x20 grid is created with each cell randomally assigned an initial "alive" or "dead" state. Every half second a new generation (up to 50) is calculated and printed to the console. Future versions could have a prettier front end via the browser and allow more user input.

### Check it out:

1. Clone the repo down
2. Make make sure you have node installed
3. run 'node lib/Controller.js'

### Run the tests

This was a TDD exercise. To run the tests make sure you have jasmine installed then in the main directory run `jasmine`.
