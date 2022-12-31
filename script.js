/* eslint-disable func-names */
/* eslint-disable wrap-iife */
const Gameboard = (function () {
  let gameboard = Array(9).fill(' ');
  const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let winner = ' ';

  const createPlayer = (sign, name = 'player') => ({ sign, name });

  const playerX = createPlayer('X');
  const playerO = createPlayer('O');

  let xTurn = true;

  const getWinner = () => winner;

  const checkWinner = () => {
    winPattern.forEach((pattern) => {
      if (gameboard[pattern[0]] !== ' ') {
        if (
          gameboard[pattern[0]] === gameboard[pattern[1]] &&
          gameboard[pattern[0]] === gameboard[pattern[2]]
        ) {
          winner = gameboard[pattern[0]];
          return true;
        }
      }
    });
    return false;
  };

  const getWinningText = () => {
    checkWinner();
    if (winner !== ' ') {
      return `Winner: ${winner}`;
    }
    return ' ';
  };

  const getGameboard = () => gameboard;

  const setGameboard = (index) => {
    if (gameboard[index] !== ' ') return;
    gameboard[index] = xTurn ? playerX.sign : playerO.sign;
    xTurn = !xTurn;
    checkWinner();
    DisplayController.render(gameboard);
  };

  const restart = () => {
    gameboard = Array(9).fill(' ');
    winner = ' ';
    xTurn = true;
  };

  const createCell = (value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = index;
    cell.innerHTML = value;
    return cell;
  };

  const addClickEvent = (cells) => {
    cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        setGameboard(cell.id);
      });
    });
  };

  return {
    getGameboard,
    setGameboard,
    createCell,
    addClickEvent,
    getWinner,
    getWinningText,
    restart,
  };
})();

const DisplayController = (function () {
  const render = (gameboard) => {
    document.querySelector('.gameboard').innerHTML = '';
    gameboard.forEach((value, index) => {
      const cell = Gameboard.createCell(value, index);
      document.querySelector('.gameboard').appendChild(cell);
    });
    Gameboard.addClickEvent(document.querySelectorAll('.cell'));
    document.querySelector('.info').innerHTML = Gameboard.getWinningText();
    if (Gameboard.getWinner() !== ' ') {
      Gameboard.restart();
    }
  };

  return { render };
})();

DisplayController.render(Gameboard.getGameboard());
