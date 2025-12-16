import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Form, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import RHFInput from "../form/RHFInput";
import PublishButton from "../shared/Button/FormHeader/PublishButton";
import { UserProfileFormValues, UserProfileSchema } from "./constants";

// mock API
const fetchUserProfile = async (): Promise<UserProfileFormValues> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: "nguyenvana",
        email: "vana@gmail.com",
        role: "user",
        status: "active",
        fullName: "Nguyễn Văn A",
        phone: "0123456789",
        address: "Hà Nội, Việt Nam",
        bio: "Frontend developer | React | Tailwind",
      });
    }, 600);
  });
};

export default function UserInfoComponent() {
  const methods = useForm({
    defaultValues: {
      username: "",
      email: "",
      fullName: "",
      phone: "",
      address: "",
      bio: "",
      role: "",
      status: "",
    },
  });

  const { reset, handleSubmit } = methods;
  const [user, setUser] = useState<UserProfileFormValues>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile().then((data) => {
      setUser(data);
      reset({
        ...data,
      });
      setLoading(false);
    });
  }, [reset]);

  const onSubmit = (values: z.infer<typeof UserProfileSchema>) => {
    const payload = {
      profile: {
        fullName: values.fullName,
        phone: values.phone,
        address: values.address,
        bio: values.bio,
      },
    };
    console.log("Submit payload:", payload);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <Avatar size={96} icon={<UserOutlined />} />
          <div>
            <h1 className="text-2xl font-semibold">{user?.fullName}</h1>
            <p className="text-gray-500">@{user?.username}</p>
            <div className="mt-2 flex gap-2">
              <Tag color="green">{user?.role.toUpperCase()}</Tag>
              <Tag color="blue">{user?.status}</Tag>
            </div>
          </div>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RHFInput
                name="username"
                label="Username"
                readOnly={true}
                placeholder="Username"
              />

              <RHFInput
                name="fullName"
                label="Họ và tên"
                required
                placeholder="Nhập họ tên"
              />

              <RHFInput
                name="email"
                label="Email"
                placeholder="Email"
                required
              />

              <RHFInput
                name="phone"
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <RHFInput name="status" label="Trạng thái" readOnly={true} />
            <RHFInput name="role" label="Role" readOnly={true} />
            <RHFInput
              name="address"
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
              required
            />

            <RHFInput
              name="bio"
              label="Giới thiệu"
              placeholder="Mô tả ngắn về bạn"
              required
            />

            <div className="flex justify-end mt-6">
              <PublishButton title="Cập nhật hồ sơ" isSubmit={true} />
            </div>
          </Form>
        </FormProvider>
      </Card>
    </div>
  );
}
