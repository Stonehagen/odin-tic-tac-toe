const Gameboard = (() => {
  const gameboard = ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'];

  const getGameboard = () => gameboard;

  return { getGameboard };
})();

const DisplayController = (() => {
  const getCell = (value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = index;
    cell.innerHTML = value;
    return cell;
  };

  const render = (gameboard) => {
    gameboard.forEach((value, index) => {
      const cell = getCell(value, index);
      document.querySelector('.gameboard').appendChild(cell);
    });
  };

  return { render };
})();

DisplayController.render(Gameboard.getGameboard());
