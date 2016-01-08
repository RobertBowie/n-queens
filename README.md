# n-queens
This is a project I completed as a student at [Hack Reactor Remote Beta](http://www.hackreactor.com/remote-beta). This project was completed as part of a pair.  The project attempts to solve the n-queens problem of placing n queens on an n×n chessboard, where solutions exist for all natural numbers n with the exception of n=2 and n=3.

## Structure:

The repository consist of 

- backbone app
- test Spec files.

### BoardViewer - backbone

The boardviewer is backbone app allowing for visualization of an nxn chessboard and interaction with it. The chessboard will detect invalid boards by highlighting the rows, columns and/or diagonals (major or minor) with conflicts.

to run it, simply open `BoardViewer.html` with your browser.

### SpecRunner - mocha

The specrunner contains the tests for the BoardViewer, specifically for the following:

- Empty board
- Board with row conflicts
- Board with column conflicts
- Board with major diagonal conflicts
- Board with minor diagonal conflicts

as well as test for the solvers:

- Finds a valid n-queens solution for n of 0-7
- Finds the number of valid n-queens solutions for n of 0-8

### Testing

Tests were made with the [Mocha](https://github.com/mochajs/mocha) testing framework.
Test are located in the ./spec directory. To run the Just open the spec runner file with chrome.

```
SpecRunner.html
```
