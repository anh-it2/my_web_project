export type TestCase = {
  id: string;
  problem_id: string;
  input: string;
  output: string; // hashed or plain text depending on visibility
  weight: number; // score / weight
  is_sample: boolean;
  is_visible_to_admin_only: boolean;
};
