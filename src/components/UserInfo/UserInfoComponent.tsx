import useLoadingStore from "@/app/store/loadingStore";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Form, Spin, Tag } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import RHFInput from "../form/RHFInput";
import PublishButton from "../shared/Button/FormHeader/PublishButton";
import { UserProfileFormValues, UserProfileSchema } from "./constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      type: "spring" as const,
      stiffness: 200,
    },
  },
};

const loadingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

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

  const stopLoading = useLoadingStore((state) => state.stopLoading);
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

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
      <motion.div
        key="loading"
        className="flex items-center justify-center h-screen"
        variants={loadingVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Spin size="large" />
      </motion.div>
    );
  }

  return (
    <motion.div
      key="content"
      className="min-h-screen bg-gray-100 flex items-center justify-center p-6 w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="w-full">
        <Card className="w-full max-w-3xl rounded-2xl shadow-lg mx-auto">
          {/* Header */}
          <motion.div
            className="flex items-center gap-6 mb-8"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Avatar size={96} icon={<UserOutlined />} />
            </motion.div>
            <div>
              <motion.h1
                className="text-2xl font-semibold"
                variants={itemVariants}
              >
                {user?.fullName}
              </motion.h1>
              <motion.p className="text-gray-500" variants={itemVariants}>
                @{user?.username}
              </motion.p>
              <motion.div
                className="mt-2 flex gap-2"
                variants={headerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={tagVariants}>
                  <Tag color="green">{user?.role.toUpperCase()}</Tag>
                </motion.div>
                <motion.div variants={tagVariants}>
                  <Tag color="blue">{user?.status}</Tag>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Form */}
          <FormProvider {...methods}>
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <RHFInput
                    name="username"
                    label="Username"
                    readOnly={true}
                    placeholder="Username"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <RHFInput
                    name="fullName"
                    label="Họ và tên"
                    required
                    placeholder="Nhập họ tên"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <RHFInput
                    name="email"
                    label="Email"
                    placeholder="Email"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <RHFInput
                    name="phone"
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </motion.div>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <RHFInput name="status" label="Trạng thái" readOnly={true} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <RHFInput name="role" label="Role" readOnly={true} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <RHFInput
                    name="address"
                    label="Địa chỉ"
                    placeholder="Nhập địa chỉ"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <RHFInput
                    name="bio"
                    label="Giới thiệu"
                    placeholder="Mô tả ngắn về bạn"
                    required
                  />
                </motion.div>

                <motion.div
                  className="flex justify-end mt-6"
                  variants={itemVariants}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PublishButton title="Cập nhật hồ sơ" isSubmit={true} />
                  </motion.div>
                </motion.div>
              </motion.div>
            </Form>
          </FormProvider>
        </Card>
      </motion.div>
    </motion.div>
  );
}
