const events = {
  events: {},
  on: (eventName, fn) => {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: (eventName, fn) => {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i += 1) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  },
  emit: (eventName, data) => {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => {
        fn(data);
      });
    }
  },
};

const Gameboard = (() => {
  const gameboard = Array(9).fill(' ');

  const getGameboard = () => gameboard;

  const setGameboard = (index, sign) => {
    gameboard[index] = sign;
  };

  const createCell = (value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = index;
    cell.innerHTML = value;
    return cell;
  };

  const setCell = (index, sign) => {
    document.getElementById(index).innerHTML = sign;
  };

  const addClickEvent = (cells, sign = 'T') => {
    cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        setGameboard(cell.id, sign);
        setCell(cell.id, sign);
      });
    });
  };

  return {
    getGameboard,
    setGameboard,
    createCell,
    addClickEvent,
    setCell,
  };
})();

const DisplayController = (() => {
  const render = (gameboard) => {
    gameboard.forEach((value, index) => {
      const cell = Gameboard.createCell(value, index);
      document.querySelector('.gameboard').appendChild(cell);
    });
    Gameboard.addClickEvent(document.querySelectorAll('.cell'));
  };

  return { render };
})();

const createPlayer = (sign, name = 'player') => ({ sign, name });

DisplayController.render(Gameboard.getGameboard());
