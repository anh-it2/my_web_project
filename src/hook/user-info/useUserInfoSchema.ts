// userProfile.schema.ts
import { z } from "zod";

export const UserProfileSchema = z.object({
  // account (readonly nhưng vẫn validate)
  email: z.string().email("Email không hợp lệ"),


  // profile
  fullName: z.string().min(1, "Họ và tên là bắt buộc"),
  phone: z
    .string()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),
  bio: z.string().min(1, "Giới thiệu là bắt buộc"),
  avatarUrl: z.string().optional(),
  github: z.string().optional(),
  facebook: z.string().optional(),
  birthday: z.date()
});

export type UserProfileFormValues = z.infer<typeof UserProfileSchema>;
