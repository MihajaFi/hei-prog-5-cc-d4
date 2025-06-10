class Point {
  constructor(public x: number, public y: number) {}

  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }
}

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

class FoodFactory {
  static create(snake: Snake): Point {
    while (true) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const food = new Point(x, y);
      if (!snake.isOnBody(food)) return food;
    }
  }
}

class Snake {
  body: Point[];
  direction: Direction;

  constructor(start: Point, direction: Direction) {
    this.body = [start];
    this.direction = direction;
  }

  move(): void {
    const head = this.getNextHead();
    this.body.unshift(head);
    this.body.pop();
  }

  grow(): void {
    const head = this.getNextHead();
    this.body.unshift(head);
  }

  getNextHead(): Point {
    const head = this.body[0];
    switch (this.direction) {
      case Direction.UP: return new Point(head.x, head.y - 1);
      case Direction.DOWN: return new Point(head.x, head.y + 1);
      case Direction.LEFT: return new Point(head.x - 1, head.y);
      case Direction.RIGHT: return new Point(head.x + 1, head.y);
    }
  }

  changeDirection(newDirection: Direction): void {
    this.direction = newDirection;
  }

  isOnBody(point: Point): boolean {
    return this.body.some(p => p.equals(point));
  }

  hitWall(): boolean {
    const head = this.body[0];
    return head.x < 0 || head.y < 0 || head.x >= 10 || head.y >= 10;
  }

  hitSelf(): boolean {
    const [head, ...rest] = this.body;
    return rest.some(p => p.equals(head));
  }
}

class Game {
  snake: Snake;
  food: Point;
  score: number = 0;

  constructor() {
    this.snake = new Snake(new Point(5, 5), Direction.RIGHT);
    this.food = FoodFactory.create(this.snake);
  }

  tick(): void {
    const nextHead = this.snake.getNextHead();
    console.log(`Le serpent avance à [${nextHead.x}, ${nextHead.y}]`);

    if (nextHead.equals(this.food)) {
      this.snake.grow();
      this.food = FoodFactory.create(this.snake);
      this.score++;
      console.log("Miam ! Le serpent a mangé la nourriture.");
    } else {
      this.snake.move();
    }

    if (this.snake.hitWall()) {
      console.log("Boom ! Le serpent a touché un mur.");
      this.gameOver();
    } else if (this.snake.hitSelf()) {
      console.log("Aïe ! Le serpent s'est mordu.");
      this.gameOver();
    } else {
      this.draw();
    }
  }

  draw(): void {
    const grid = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ".")
    );

    grid[this.food.y][this.food.x] = "@";
    for (const part of this.snake.body) {
      grid[part.y][part.x] = "*";
    }

    console.clear();
    console.log(`Score: ${this.score}`);
    for (const row of grid) {
      console.log(row.join(" "));
    }
    console.log("\nUtilise Z (haut), S (bas), Q (gauche), D (droite).");
  }

  gameOver(): void {
    console.clear();
    console.log("💀 GAME OVER !");
    console.log(`Ton score : ${this.score}`);
    process.exit();
  }
}

const readline = require("readline");
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const game = new Game();
game.draw();

process.stdin.on("keypress", (_: any, key: any) => {
  switch (key.name.toUpperCase()) {
    case "Z": game.snake.changeDirection(Direction.UP); break;
    case "S": game.snake.changeDirection(Direction.DOWN); break;
    case "Q": game.snake.changeDirection(Direction.LEFT); break;
    case "D": game.snake.changeDirection(Direction.RIGHT); break;
    case "C": if (key.ctrl) process.exit(); break;
  }
});

setInterval(() => {
  game.tick();
}, 500);
