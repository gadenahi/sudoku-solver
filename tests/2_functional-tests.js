/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chai = require("chai");
const assert = chai.assert;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let Solver;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    Solver = require('../public/sudoku-solver.js');
  });
  
  suite('Text area and sudoku grid update automatically', () => {
    // Entering a valid number in the text area populates 
    // the correct cell in the sudoku grid with that number
    test('Valid number in text area populates correct cell in grid', done => {
      const textArea = document.getElementById('text-input');
      textArea.value = '12345'
      var testarr = Solver.initGrid(textArea.value)
      var expected = ["1", "2", "3", "4", "5"]
      assert.deepStrictEqual(testarr, expected)
      done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', done => {
      const textArea = document.getElementById('text-input');
      const cells = Array.from(document.querySelectorAll('.sudoku-input')).map(cell => cell);
      cells[0].value = '5';
      cells[1].value = '4';
      cells[2].value = '3';
      cells[3].value = '2';
      cells[4].value = '1';
      if (Solver.updateGrid(1)) {
      const expected = '54321............................................................................';
      assert.deepStrictEqual(textArea.value, expected)
      done();        
      }
    });
  });
  
  suite('Clear and solve buttons', () => {
    // Pressing the "Clear" button clears the sudoku 
    // grid and the text area
    test('Function clearGrid()', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const textArea = document.getElementById('text-input');
      textArea.value = input
      Solver.initGrid(input)
      Solver.clearGrid()
      const cells = Array.from(document.querySelectorAll('.sudoku-input')).map(cell => cell).filter(cell => cell.value);
      assert.strictEqual(textArea.value, '')
      assert.deepStrictEqual(cells,[])
      done();
    });
    
    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test('Function showSolution(solve(input))', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const textArea = document.getElementById('text-input');
      textArea.value = input      
      Solver.solveGrid()
      var expected = "769235418851496372432178956174569283395842761628713549283657194516924837947381625"
      assert.strictEqual(textArea.value, expected)      
      done();
    });
  });
});

