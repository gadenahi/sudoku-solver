const textArea = document.getElementById('text-input');
const sudokuInputs = document.getElementsByClassName('soduku-input')
// import { puzzlesAndSolutions } from './puzzle-strings.js';


const initGrid = values => {
    document.getElementById('error-msg').innerText = ""
    const cells = document.querySelectorAll('.sudoku-input')
    const listValues = values.split('')
    cells.forEach((cell, i) => {
      if (checkInput(listValues[i])) {
        cell.value = listValues[i]
      } else{
        cell.value = ""
      }
    })
    return listValues
}

const checkInput = value => {
    const intValue = parseInt(value);
    if (intValue >= 1 && intValue <= 9) {
      return true && value
    } else {
      return false
    }  
}

const updateGrid = value => {
    const cells = document.querySelectorAll('.sudoku-input')
    var tmp = ""
    if (value >= 1 && value <= 9) {
      cells.forEach((cell, i) => {
        if (cell.value == "") {
          tmp += "."     
        }
        else {
          tmp += String(cell.value)     
        }
      })
      textArea.value = tmp
      return true
    }
}

const clearGrid = () => {
    textArea.value = ''
    const cells = document.querySelectorAll('.sudoku-input')
    cells.forEach((cell, i) => {
      cell.value = ""
    })
}

const checkLength = values => {
  if (values.length != 81) {
    document.getElementById('error-msg').innerText = "Error: Expected puzzle to be 81 characters long."
    return false
  } else {
    return true
  }
}

const validPuzzle = values => {
  if (checkLength(values) == false) {
    return false
  }

  var listValues = values.split('')

  const checkRow = arr => {
    for (var i = 0; i < 9; i++) {
      var tmp = arr.slice(9 * i, 9 * i + 9)
      if (isVaild(tmp) == false) {
        return false
      }
    }
    return true
  }

  const checkCol = arr => {
    for (var i = 0; i < 9; i++) {
      var tmp = [arr[9 * i], arr[9 * i + 1], arr[9 * i + 2], arr[9 * i + 3], arr[9 * i + 4], arr[9 * i + 5], arr[9 * i + 6], arr[9 * i + 7], arr[9 * i + 8]]
      if (isVaild(tmp) == false) {
        return false
      }
    }
    return true
  }

  const checkSquare = arr => {
    for (var i = 0; i < 9; i++) {
      var j0 = Math.floor(i / 3) * 27 + 3 * (i % 3)
      var j1 = Math.floor(i / 3) * 27 + 3 * (i % 3) + 1
      var j2 = Math.floor(i / 3) * 27  + 3 * (i % 3) + 2
      var j3 = Math.floor(i / 3) * 27  + 3 * (i % 3) + 9
      var j4 = Math.floor(i / 3) * 27  + 3 * (i % 3) + 10
      var j5 = Math.floor(i / 3) * 27  + 3 * (i % 3) + 11
      var j6 = Math.floor(i / 3) * 27  + 3 * (i % 3) + 18
      var j7 = Math.floor(i / 3) * 27  + 3 * (i % 3) + 19
      var j8 = Math.floor(i / 3) * 27  + 3 * (i % 3) + 20
      var tmp = [arr[j0], arr[j1], arr[j2], arr[j3], arr[j4], arr[j5], arr[j6], arr[j7], arr[j8]]
      if (isVaild(tmp) == false) {
        return false
      }
    }
    return true
  }

  const compareFunc = (a, b) => {
    return a - b
  }

  const isVaild = arr => {
    var output = [ '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
    var sortArr = arr.sort(compareFunc)
    if (JSON.stringify(sortArr) == JSON.stringify(output)) {
      return true
    } else {
      return false
    }
  }

  if (checkCol(listValues) && checkRow(listValues) && checkSquare(listValues)) {
    return true
  } else {
    return false
 }
}


const createBoard = values => {
  var matrix = []
  for (var i = 0; i < 9; i++) {
    var tmp = []
    for (var j = 0; j < 9; j++) {
      tmp.push(values[9*i + j])
    }
    matrix.push(tmp)
  }
  return matrix
}

const createArray = matrix => {
  var array = ""
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      array += matrix[i][j]
    }
  }
  return array
}

var board

const solveSudoku = () => {
  board = createBoard(textArea.value)
  if (solve() == false) {
    return false
  } else {
    return board
  }
}

const findUnassigned = () => {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] == ".") {
        return [i, j]
      }
    }
  }
  return [-1, -1]
}

const solve = () => {
  var [row, col] = findUnassigned()
  if (row == -1 && col == -1) {
    return true
  }
  var ref = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
  for (var i = 0; i < 9; i++) {
    if (isCheckValue(row, col, ref[i])) {
      board[row][col] = ref[i]
      if (solve()) {
        return true
      }
      board[row][col] = "."
    }
  }
  return false
}

const isCheckValue = (row, col, val) => {
  var sqrow = row - row % 3
  var sqcol = col - col % 3
  if (checkrow(row, val) && checkcol(col, val) && checksq(sqrow, sqcol, val)) {
    return true
  } else {
    return false
  }  
}

const checkrow = (row, val) => {
  for (var col = 0; col < 9; col++) {
    if (board[row][col] == val) {
      return false
    }
  }
  return true
}

const checkcol = (col, val) => {
  for (var row = 0; row < 9; row++) {
    if (board[row][col] == val) {
      return false
    }
  }
  return true
}

const checksq = (row, col, val) => {
  for (var r = row; r < row + 3; r++) {
    for (var c = col; c < col + 3; c++) {
      if (board[r][c] == val) {
        return false
      }
    }
  } 
  return true
}

const solveGrid = () => {
  if (checkLength(textArea.value) == true) {
    var result = solveSudoku()
    var array = createArray(result)
    var valid_result = validPuzzle(array)
    if (result && valid_result) {
      initGrid(array)
      textArea.value = array
      return array      
    } else {
      document.getElementById('error-msg').innerText = "Error: Input number is wrong, Please input again."
      return false
    }
  }
}

// LEAVE THIS IN BOILERPLATE! (Except for the `setGrid` line)
document.addEventListener('DOMContentLoaded', () => {
  // Set text area with a simple puzzle
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';  
  initGrid(textArea.value)

  document.getElementById('sudoku-grid').addEventListener('input', function(e) {
    updateGrid(e.target.value)
  })
  
    textArea.addEventListener('input', function(e) {
    initGrid(textArea.value)
  })
  
  document.getElementById('clear-button').addEventListener('click', function(e) {
    clearGrid()
  })

  document.getElementById('solve-button').addEventListener('click', function(e) {
    solveGrid()
  })  
  
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    initGrid,
    clearGrid,
    solveGrid,
    checkInput,
    validPuzzle,
    updateGrid,
    checkLength
  }
} catch (e) {}
