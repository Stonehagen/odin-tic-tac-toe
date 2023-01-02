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
  let startAi = false;

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

  const restart = () => {
    gameboard = Array(9).fill(' ');
    winner = ' ';
    xTurn = true;
    if (aiGame && startAi) {
      gameboard[4] = playerO.sign;
    }
    startAi = !startAi;
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

  const pseudoMove = (aiGameboard, index, sign) => {
    const copyGameboard = [...aiGameboard];
    copyGameboard[index] = sign;
    return copyGameboard;
  };

  const recAiMove = (redGameboard, index, ownMove, depth) => {
    const recDepth = depth;
    const sign = ownMove ? 'O' : 'X';
    if (redGameboard[index] !== ' ') {
      return -Infinity;
    }
    if (checkWin(pseudoMove(redGameboard, index, sign)) === sign) {
      if (recDepth === 0) {
        return 1000;
        // eslint-disable-next-line no-else-return
      } else if (recDepth === 1) {
        return -1000;
      }
      return ownMove ? 10 - recDepth : recDepth - 10;
    }
    // eslint-disable-next-line arrow-body-style
    const nextScores = gameboard.map((move, nextIndex) => {
      return recAiMove(
        pseudoMove(redGameboard, index, sign),
        nextIndex,
        !ownMove,
        depth + 1,
      );
    });
    return nextScores.reduce((ac, cv) => {
      if (cv === -Infinity) {
        return ac;
      }
      return ac + cv;
    }, 0);
  };

  const getAiMove = () => {
    // eslint-disable-next-line arrow-body-style
    const scores = gameboard.map((move, index) => {
      return recAiMove(gameboard, index, true, 0);
    });
    return scores.indexOf(Math.max(...scores));
  };

  const makeMove = (index) => {
    if (gameboard[index] !== ' ') return;
    gameboard[index] = xTurn ? playerX.sign : playerO.sign;
    xTurn = !xTurn;
    if (aiGame && !checkGameEnd(true)) {
      gameboard[getAiMove()] = playerO.sign;
      xTurn = true;
    }
    checkGameEnd(true);
    DisplayController.render(gameboard);
  };

  const addClickEventCell = (cells) => {
    cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        makeMove(cell.id);
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

  const initialRender = (gameboard) => {
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

  const renderStart = (gameboard) => {
    document.querySelector('.gameboard').innerHTML = '';
    gameboard.forEach((value, index) => {
      const cell = createCell(value, index);
      document.querySelector('.gameboard').appendChild(cell);
    });
  };

  const render = (gameboard) => {
    document.querySelector('.gameboard').innerHTML = '';
    gameboard.forEach((value, index) => {
      const cell = createCell(value, index);
      document.querySelector('.gameboard').appendChild(cell);
    });
    Gameboard.addClickEventCell(document.querySelectorAll('.cell'));
    document.querySelector('.info').innerHTML = Gameboard.getWinningText();
    if (Gameboard.getWinner() !== ' ') {
      renderStart(gameboard);
    }
  };

  return {
    initialRender,
    renderStart,
    render,
  };
})();

DisplayController.initialRender(Gameboard.getGameboard());
