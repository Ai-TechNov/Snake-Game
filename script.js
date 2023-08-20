const config = {
  rows: 20,
  columns: 20,
  snakeInitialLength: 3,
};

let snake = [{ row: 10, col: 10 }];
let food = { row: 15, col: 15 };
let direction = 'right';
let score = 0;

function generateGrid() {
  const container = document.getElementById('game-container');
  container.style.gridTemplateRows = `repeat(${config.rows}, 20px)`;
  container.style.gridTemplateColumns = `repeat(${config.columns}, 20px)`;

  for (let i = 0; i < config.rows * config.columns; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-node');
    container.appendChild(cell);
  }
}

function drawSnake() {
  const container = document.getElementById('game-container');
  container.innerHTML = '';

  for (let segment of snake) {
    const snakeNode = document.createElement('div');
    snakeNode.classList.add('snake-node');
    snakeNode.style.gridColumn = segment.col;
    snakeNode.style.gridRow = segment.row;
    container.appendChild(snakeNode);
  }
}

function drawFood() {
  const container = document.getElementById('game-container');
  const foodNode = document.createElement('div');
  foodNode.classList.add('food-node');
  foodNode.style.gridColumn = food.col;
  foodNode.style.gridRow = food.row;
  container.appendChild(foodNode);
}

function moveSnake() {
  const head = { ...snake[0] };

  switch (direction) {
    case 'up':
      head.row--;
      break;
    case 'down':
      head.row++;
      break;
    case 'left':
      head.col--;
      break;
    case 'right':
      head.col++;
      break;
  }

  snake.unshift(head);

  if (head.row === food.row && head.col === food.col) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }

  if (checkCollision(head) || head.row < 1 || head.col < 1 || head.row > config.rows || head.col > config.columns) {
    clearInterval(gameInterval);
    alert('Game Over! Your score: ' + score);
  }

  drawSnake();
}

function generateFood() {
  food = {
    row: Math.floor(Math.random() * config.rows) + 1,
    col: Math.floor(Math.random() * config.columns) + 1,
  };
}

function checkCollision(position) {
  for (let segment of snake) {
    if (segment.row === position.row && segment.col === position.col) {
      return true;
    }
  }
  return false;
}

function handleKeyPress(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
}

generateGrid();
generateFood();
drawSnake();
const gameInterval = setInterval(moveSnake, 200);

document.addEventListener('keydown', handleKeyPress);
