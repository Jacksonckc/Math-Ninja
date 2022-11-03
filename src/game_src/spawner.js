class Spawner {
  constructor(difficulty) {
    this.difficulty = difficulty;

  }

  generate() {
    const targets = [];

    switch (this.difficulty) {
      case "easy":
        targets.add(Target())
        break;
      case "medium":
        break;
      case "hard":
        break;
    }

    return {"equation": equation, "targets": targets};
  }
}