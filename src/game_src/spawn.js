import { Target } from "./target";

// Used to generate the answer
const OPERATION_MAP = {
  "+": (a, b) => {
    return a + b;
  },
  "-": (a, b) => {
    return a - b;
  },
  "*": (a, b) => {
    return a * b;
  },
  // Division is a special case where a is used as the answer is not included in the equation
  "/": (a, b) => {
    return a;
  },
};

// Holds the values for each difficulty value
const VALS = {
  easy: {
    maxNumberSize: 10,
    targetCount: 9,
    speed: 8,
    ops: ["+"],
  },

  medium: {
    maxNumberSize: 100,
    targetCount: 16,
    speed: 8,
    ops: ["+", "-"],
  },

  hard: {
    maxNumberSize: 1000,
    targetCount: 25,
    speed: 8,
    ops: ["+", "-", "*", "/"],
  },
};

const MULT_REDUCT = 0.1;
const DIV_REDUCT = 0.1;

export function spawn(difficulty) {
  // Set empty containers to fill
  const targets = [];
  let equation = "";

  // Get a random operator from all possible operators
  const operation =
    VALS[difficulty].ops[
      Math.floor(Math.random() * VALS[difficulty].ops.length)
    ];

  // The special generation of a division equation composed entirely of whole numbers was inspired by waqaslam's answer on stackoverflow
  // https://stackoverflow.com/questions/29962924/making-a-randomly-generated-division-sum-that-always-results-in-a-whole-number

  // Generate the equation
  const a = Math.round(
    Math.random() *
      VALS[difficulty].maxNumberSize *
      (operation == "/" ? DIV_REDUCT : 1) *
      (operation == "*" ? MULT_REDUCT : 1)
  );

  const b = Math.round(
    Math.random() *
      (VALS[difficulty].maxNumberSize -
        (operation == "-" ? VALS[difficulty].maxNumberSize - a : 0)) *
      (operation == "/" ? DIV_REDUCT : 1) *
      (operation == "*" ? MULT_REDUCT : 1)
  );

  const answer = OPERATION_MAP[operation](a, b);

  // Division is a special case where a is used as the answer and the dividend is created by a * b
  // Create the equation string
  equation = `${operation == "/" ? a * b : a} ${operation} ${b}`;

  // Generate a random index for the answer to be generated in the list of targets
  const iOfInsert = Math.floor(Math.random() * VALS[difficulty].targetCount);

  // Generate all the targets
  for (let i = 0; i < VALS[difficulty].targetCount; i++) {
    if (i == iOfInsert) {
      targets.push(new Target(answer, true, VALS[difficulty].speed));
      continue;
    }

    let falseAnswer = answer;
    // Never let a false target be the same value of the answer
    while (falseAnswer == answer) {
      falseAnswer = Math.round(
        Math.random() *
          (VALS[difficulty].maxNumberSize *
            (operation == "+" ? 2 : 1) *
            (operation == "*"
              ? VALS[difficulty].maxNumberSize * MULT_REDUCT ** 2
              : 1))
      );
    }

    targets.push(new Target(falseAnswer, false, VALS[difficulty].speed));
  }

  return { equation: equation, targets: targets };
}
