/* eslint-disable operator-linebreak */
/* eslint-disable no-use-before-define */
/* eslint-disable wrap-iife */
const Gameboard = (function GetGameboard() {
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

  let gameboard = Array(9).fill(' ');
  let winner = ' ';
  let aiGame = false;
  let xTurn = true;

  const createPlayer = (sign, name = 'player') => ({ sign, name });

  const playerX = createPlayer('X');
  const playerO = createPlayer('O');

  const setPlayerNames = () => {
    const playerXInput = document.querySelector('#playerX');
    const playerOInput = document.querySelector('#playerO');

    if (playerXInput.value === '') {
      playerXInput.value = 'Player X';
    }
    if (playerOInput.value === '') {
      playerOInput.value = 'Player O';
    }
    if (aiGame) {
      playerOInput.value = 'Computer';
    }
    playerX.name = playerXInput.value;
    playerO.name = playerOInput.value;
  };

  // eslint-disable-next-line arrow-body-style
  const getPlayerName = (sign) => {
    return sign === playerX.sign ? playerX.name : playerO.name;
  };

  const getGameboard = () => gameboard;

  const setGameboard = (index) => {
    if (gameboard[index] !== ' ') return;
    gameboard[index] = xTurn ? playerX.sign : playerO.sign;
    xTurn = !xTurn;
    if (aiGame) {
      if (checkGameEnd(true)) {
        DisplayController.render(gameboard);
        return;
      }
      while (!xTurn) {
        const randomIndex = Math.floor(Math.random() * 10);
        if (gameboard[randomIndex] === ' ') {
          gameboard[randomIndex] = playerO.sign;
          xTurn = !xTurn;
        }
      }
    }
    checkGameEnd(true);
    DisplayController.render(gameboard);
  };

  const restart = () => {
    gameboard = Array(9).fill(' ');
    winner = ' ';
    xTurn = true;
  };

  const getWinner = () => winner;

  const checkWin = (gameboardArray = gameboard) => {
    let winSign;
    winPattern.forEach((pattern) => {
      if (gameboardArray[pattern[0]] !== ' ') {
        if (
          gameboardArray[pattern[0]] === gameboardArray[pattern[1]] &&
          gameboardArray[pattern[0]] === gameboardArray[pattern[2]]
        ) {
          winSign = gameboardArray[pattern[0]];
        }
      }
    });
    return winSign;
  };

  const checkTie = () => {
    let tie = true;
    gameboard.forEach((cell) => {
      if (cell === ' ') {
        tie = false;
      }
    });
    return tie;
  };

  const checkGameEnd = (set) => {
    const winningSign = checkWin();
    if (winningSign) {
      if (set) {
        winner = getPlayerName(winningSign);
      }
      return true;
    }
    if (checkTie()) {
      if (set) {
        winner = 'Tie';
      }
      return true;
    }
    return false;
  };

  const getWinningText = () => {
    if (checkGameEnd(true)) {
      if (winner === 'Tie') {
        return winner;
      }
      return `${winner} Won`;
    }
    return '';
  };

  const getAiMove = () => {
    //
  };

  const addClickEventCell = (cells) => {
    cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        setGameboard(cell.id);
        getAiMove();
      });
    });
  };

  const addClickEventStart = (button, checkbox) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      restart();
      aiGame = checkbox.checked;
      setPlayerNames();
      DisplayController.render(gameboard);
    });
  };

  return {
    getGameboard,
    getWinner,
    getWinningText,
    addClickEventCell,
    addClickEventStart,
  };
})();

const DisplayController = (function GetDisplayController() {
  const createCell = (value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = index;
    cell.innerHTML = value;
    return cell;
  };

  const renderStart = (gameboard) => {
    document.querySelector('.gameboard').innerHTML = '';
    gameboard.forEach((value, index) => {
      const cell = createCell(value, index);
      document.querySelector('.gameboard').appendChild(cell);
    });
    Gameboard.addClickEventStart(
      document.querySelector('#start-btn'),
      document.querySelector('#ai-game'),
    );
  };

  const render = (gameboard) => {
    document.querySelector('.gameboard').innerHTML = '';
    gameboard.forEach((value, index) => {
      const cell = createCell(value, index);
      document.querySelector('.gameboard').appendChild(cell);
    });
    Gameboard.addClickEventCell(document.querySelectorAll('.cell'));
    Gameboard.addClickEventStart(
      document.querySelector('#start-btn'),
      document.querySelector('#ai-game'),
    );
    document.querySelector('.info').innerHTML = Gameboard.getWinningText();
    if (Gameboard.getWinner() !== ' ') {
      renderStart(gameboard);
    }
  };

  return {
    renderStart,
    render,
  };
})();

DisplayController.renderStart(Gameboard.getGameboard());
