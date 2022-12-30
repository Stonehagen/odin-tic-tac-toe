/* eslint-disable func-names */
/* eslint-disable wrap-iife */
const Gameboard = (function () {
  const gameboard = Array(9).fill(' ');

  const createPlayer = (sign, name = 'player') => ({ sign, name });

  const playerX = createPlayer('X');
  const playerO = createPlayer('O');

  let xTurn = true;

  const getGameboard = () => gameboard;

  const setGameboard = (index) => {
    if (gameboard[index] !== ' ') return;
    gameboard[index] = xTurn ? playerX.sign : playerO.sign;
    DisplayController.render(gameboard);
    xTurn = !xTurn;
  };

  const createCell = (value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = index;
    cell.innerHTML = value;
    return cell;
  };

  const addClickEvent = (cells, sign = 'T') => {
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
  };

  return { render };
})();

DisplayController.render(Gameboard.getGameboard());
