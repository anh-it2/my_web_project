// userProfile.schema.ts
import { z } from "zod";

export const UserProfileSchema = z.object({
  // account (readonly nhưng vẫn validate)
  username: z.string().min(1, "Username là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),

  role: z.string(),
  status: z.string(),

  // profile
  fullName: z.string().min(1, "Họ và tên là bắt buộc"),
  phone: z
    .string()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),
  address: z.string().min(1, "Địa chỉ là bắt buộc"),
  bio: z.string().min(1, "Giới thiệu là bắt buộc"),
});

export type UserProfileFormValues = z.infer<typeof UserProfileSchema>;
