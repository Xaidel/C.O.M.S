
interface CourseOutcome {
  id: number;
  statement: string;
  intendedLearningOutcomes: string[];
}

export const courseOutcomes: CourseOutcome[] = [
  {
    id: 1,
    statement: "Identify the Java programming basics and fundamentals",
    intendedLearningOutcomes: [
      "Identify the basic program structure, elements, and control structures of a Java program",
      "Determine how to use pre-defined classes, string object, and wrapper classes",
      "Create program solutions using the Java programming basics and fundamentals",
    ],
  },
  {
    id: 2,
    statement:
      "Distinguish the basic concepts and principles of object-oriented programming and how these are implemented using Java",
    intendedLearningOutcomes: [
      "Identify the basic concepts and principles of object-oriented programming",
      "Determine the rules and procedures of implementing the basic concepts and principles of object-oriented programming in Java",
      "Create Java program solutions applying the basic concepts and principles of object-oriented programming",
    ],
  },
  {
    id: 3,
    statement: "Determine the basic operations on processing a collection of objects",
    intendedLearningOutcomes: [
      "Identify the basic concepts and operations of Java Array and ArrayList",
      "Distinguish the different basic operations in creating and manipulating a collection of objects",
      "Create a Java program solution that processes a collection of objects",
    ],
  },
  {
    id: 4,
    statement: "Create an object-oriented and file-based application",
    intendedLearningOutcomes: [
      "Identify the basic concepts of Java File I/O operations",
      "Determine some techniques in storing and writing an object's data into a file",
      "Create an object-oriented console application that processes information and records data into a file",
    ],
  },
];

