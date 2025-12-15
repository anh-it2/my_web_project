export const contestTableData = [
  {
    key: "1",
    name: "Programming intermediate (basic data structure & algorithms)",
    status: "Đang diễn ra",
    manager: "Phạm Quang Dũng",
  },
  {
    key: "2",
    name: "Hard Combinatorial Optimization Problems",
    status: "Đang diễn ra",
    manager: "Phạm Quang Dũng",
  },
  {
    key: "3",
    name: "Object-Oriented Programming with Java",
    status: "Đang diễn ra",
    manager: "Phạm Quang Dũng",
  },
  {
    key: "4",
    name: "Programming Advanced (data structures & algorithms)",
    status: "Đang diễn ra",
    manager: "Phạm Quang Dũng",
  },
  {
    key: "5",
    name: "Programming Beginner",
    status: "Đang diễn ra",
    manager: "Phạm Quang Dũng",
  },
  {
    key: "11",
    name: "Programming intermediate (basic data structure & algorithms)",
    status: "Đang diễn ra",
    manager: "Phạm Quang Dũng",
  },
  {
    key: "21",
    name: "Hard Combinatorial Optimization Problems",
    status: "Đang diễn ra",
    manager: "Phạm Quang Dũng",
  },
  {
    key: "31",
    name: "Object-Oriented Programming with Java",
    status: "Đang diễn ra",
    manager: "Phạm Quang Dũng",
  },
  {
    key: "41",
    name: "Programming Advanced (data structures & algorithms)",
    status: "Đang diễn ra",
    manager: "Phạm Quang Dũng",
  },
  {
    key: "51",
    name: "Programming Beginner",
    status: "Đang diễn ra",
    manager: "Phạm Quang Dũng",
  },
];

export type Exercise = {
  key: string;
  title: string;
  code: string;
  level: string;
  score: number;
  maxScore: number;
  completed: string;
};

export const exerciseTableData: Exercise[] = Array.from({ length: 37 }).map(
  (_, i) => ({
    key: String(i + 1),
    title: `Problem ${i + 1}`,
    code: `P__PROBLEM_${i + 1}`,
    level: i % 3 === 0 ? "Khó" : i % 3 === 1 ? "Trung bình" : "Dễ",
    score: 0,
    maxScore: [50, 100, 160][i % 3] || 0,
    completed: i % 2 === 0 ? "Hoàn thành" : "Chưa hoàn thành",
  })
);

export type Submission = {
  id: number;
  status: string;
  score: number | null;
  passed: boolean;
  language: string;
  createdAt: string;
  isFinal: boolean;
};

export const submissions: Submission[] = [
  {
    id: 1,
    status: "Hoàn thành",
    score: 8.5,
    passed: true,
    language: "JavaScript",
    createdAt: "2025-12-14 09:30",
    isFinal: true,
  },
  {
    id: 2,
    status: "Đang chấm",
    score: null,
    passed: false,
    language: "Python",
    createdAt: "2025-12-14 10:15",
    isFinal: false,
  },
  {
    id: 3,
    status: "Hoàn thành",
    score: 6.0,
    passed: true,
    language: "C++",
    createdAt: "2025-12-15 08:00",
    isFinal: false,
  },
];

export const testCases = [
  {
    id: 1,
    score: 20,
    status: "Accepted",
    time: 168,
    memory: 17758,
  },
  {
    id: 2,
    score: 20,
    status: "Accepted",
    time: 173,
    memory: 17723,
  },
  {
    id: 3,
    score: 20,
    status: "Accepted",
    time: 180,
    memory: 17824,
  },
  {
    id: 4,
    score: 20,
    status: "Accepted",
    time: 171,
    memory: 18859,
  },
  {
    id: 5,
    score: 20,
    status: "Accepted",
    time: 171,
    memory: 17754,
  },
];

export const submissionInfo = {
  status: "Accepted",
  passed: "6 / 6 test case",
  totalScore: 120,
  language: "Java 13",
  totalTime: "1,033 (s)",
  createdAt: "07/12/2025 15:32:03",
  problem: "Replace ? To Find Real Expression",
  contest: "BTVN-IT3100-Ky20251-T9-2025",
};

export const difficultyOptions = [
  { label: "Easy", value: "EASY" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Hard", value: "HARD" },
];
