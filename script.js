const Gameboard = (() => {
  const gameboard = ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'];

  const getGameboard = () => gameboard;

  return { getGameboard };
})();

const DisplayController = (() => {
  const render = (gameboard) => {
    gameboard.forEach((value) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerHTML = value;
      document.querySelector('.gameboard').appendChild(cell);
    });
  };

  return { render };
})();

DisplayController.render(Gameboard.getGameboard());
