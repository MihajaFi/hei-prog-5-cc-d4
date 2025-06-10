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
