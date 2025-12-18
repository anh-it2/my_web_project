import { z } from "zod";

const sampleSchema = z.object({
  input: z.string().min(1, "Input is required"),
  expectedOutput: z.string().min(1, "Expected output is required"),
  orderIndex: z.number().int().nonnegative(),
  score: z.number().nonnegative(),
  isSample: z.boolean(),
});

export const problemFormSchema = z.object({
  title: z.string().min(1, "Title is required"),

  problemCode: z.string().min(1, "Problem code is required"),

  difficulty: z.string().min(1, "Difficulty is required"),

  tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),

  visibility: z.boolean(),

  timeLimit: z.number().positive("Time limit must be greater than 0"),

  memoryLimit: z.number().positive("Memory limit must be greater than 0"),

  description: z.string().min(1, "Description is required"),

  samples: z
    .array(sampleSchema.extend({ isSample: z.literal(true) }))
    .min(1, "At least one sample is required"),

  testCases: z.array(sampleSchema).min(1, "At least one test case is required"),

  constraints: z.string().min(1, "Constraints is required"),
});
