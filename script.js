/* eslint-disable no-use-before-define */
/* eslint-disable wrap-iife */
const Gameboard = (function GetGameboard() {
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

  const setPlayerNames = () => {
    if (document.querySelector('#playerX').value === '') {
      document.querySelector('#playerX').value = 'Player X';
    }
    if (document.querySelector('#playerO').value === '') {
      document.querySelector('#playerO').value = 'Player O';
    }
    playerX.name = document.querySelector('#playerX').value;
    playerO.name = document.querySelector('#playerO').value;
  };

  let xTurn = true;

  const checkTie = () => {
    let tie = true;
    gameboard.forEach((cell) => {
      if (cell === ' ') {
        tie = false;
      }
    });
    return tie;
  };

  const getWinner = () => winner;

  const checkWinner = () => {
    let win = false;
    winPattern.forEach((pattern) => {
      if (gameboard[pattern[0]] !== ' ') {
        if (
          gameboard[pattern[0]] === gameboard[pattern[1]] &&
          gameboard[pattern[0]] === gameboard[pattern[2]]
        ) {
          winner =
            playerX.sign === gameboard[pattern[0]]
              ? playerX.name
              : playerO.name;
          win = true;
        }
      }
    });
    if (win) {
      return true;
    }
    if (checkTie()) {
      winner = 'Tie';
      win = true;
    }
    return win;
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

  const addClickEventCell = (cells) => {
    cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        setGameboard(cell.id);
      });
    });
  };

  const addClickEventStart = (button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      restart();
      setPlayerNames();
      DisplayController.render(gameboard);
    });
  };

  return {
    getGameboard,
    setGameboard,
    createCell,
    addClickEventCell,
    addClickEventStart,
    getWinner,
    getWinningText,
    restart,
  };
})();

const DisplayController = (function GetDisplayController() {
  const render = (gameboard) => {
    document.querySelector('.gameboard').innerHTML = '';
    gameboard.forEach((value, index) => {
      const cell = Gameboard.createCell(value, index);
      document.querySelector('.gameboard').appendChild(cell);
    });
    Gameboard.addClickEventCell(document.querySelectorAll('.cell'));
    Gameboard.addClickEventStart(document.querySelector('#start-btn'));
    document.querySelector('.info').innerHTML = Gameboard.getWinningText();
    if (Gameboard.getWinner() !== ' ') {
      Gameboard.restart();
    }
  };

  const renderStart = (gameboard) => {
    document.querySelector('.gameboard').innerHTML = '';
    gameboard.forEach((value, index) => {
      const cell = Gameboard.createCell(value, index);
      document.querySelector('.gameboard').appendChild(cell);
    });
    Gameboard.addClickEventStart(document.querySelector('#start-btn'));
  };

  return {
    render,
    renderStart,
  };
})();

DisplayController.renderStart(Gameboard.getGameboard());
