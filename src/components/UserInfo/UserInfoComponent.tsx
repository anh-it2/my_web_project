import useLoadingStore from "@/app/store/loadingStore";
import { useUpdateUserInfo } from "@/hook/user-info/useUpdateUserInfo";
import { useUserInfo } from "@/hook/user-info/useUserInfo";
import { UserProfileSchema } from "@/hook/user-info/useUserInfoSchema";
import { useRouter } from "@/libs/routing";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Form, Spin, Tag } from "antd";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import RHFDatePicker from "../form/RHFDatePicker";
import RHFInput from "../form/RHFInput";
import PublishButton from "../shared/Button/FormHeader/PublishButton";

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

export default function UserInfoComponent({
  userName,
  role,
  enableEdit = true,
}: {
  userName: string;
  role: string;
  enableEdit?: boolean;
}) {
  const { userInfo } = useUserInfo(userName);
  const { updateUserInfoAsync } = useUpdateUserInfo();
  const router = useRouter()

  const methods = useForm({
    defaultValues: {
      email: userInfo?.email || "",
      fullName: userInfo?.fullName || "",
      phone: userInfo?.phone || "",
      bio: userInfo?.bio || "",
      avatarUrl: userInfo?.avatarUrl || "",
      github: userInfo?.github || "",
      facebook: userInfo?.facebook || "",
      birthday: userInfo?.birthday || null,
    },
  });

  useEffect(() => {
    methods.reset({
      email: userInfo?.email || "--",
      fullName: userInfo?.fullName || "--",
      phone: userInfo?.phone || "--",
      bio: userInfo?.bio || "--",
      avatarUrl: userInfo?.avatarUrl || "--",
      github: userInfo?.github || "--",
      facebook: userInfo?.facebook || "--",
      birthday: userInfo?.birthday || null,
    });
  }, [userInfo]);

  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  const { handleSubmit } = methods;

  const onSubmit = async (values: z.infer<typeof UserProfileSchema>) => {
    console.log(values);
    startLoading();
    await updateUserInfoAsync(values);
    stopLoading();
  };

  if (!userInfo) {
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
          { <Button
      icon={<ArrowLeftOutlined />}
      type="text"
      className="flex items-center gap-1 text-gray-600 hover:text-blue-600 mb-5"
      onClick={() => router.back()}
    >
      Quay lại
    </Button>}
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
                {userInfo?.fullName}
              </motion.h1>
              <motion.p className="text-gray-500" variants={itemVariants}>
                @{userName}
              </motion.p>
              <motion.div
                className="mt-2 flex gap-2"
                variants={headerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={tagVariants}>
                  <Tag color="green">{role.toUpperCase()}</Tag>
                </motion.div>
                <motion.div variants={tagVariants}>
                  <Tag color="blue">
                    <span className="font-semibold">ACTIVE</span>
                  </Tag>
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
                    name="fullName"
                    label="Họ và tên"
                    required
                    placeholder="Nhập họ tên"
                    readOnly={!enableEdit}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <RHFInput
                    name="email"
                    label="Email"
                    placeholder="Email"
                    required
                    readOnly={!enableEdit}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <RHFInput
                    name="phone"
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    required
                    readOnly={!enableEdit}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <RHFInput
                    name="github"
                    label="Github"
                    placeholder="Nhập github"
                    readOnly={!enableEdit}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <RHFInput
                    name="facebook"
                    label="Facebook"
                    placeholder="Nhập facebook"
                    readOnly={!enableEdit}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <RHFDatePicker
                    name="birthday"
                    label="Ngày sinh (hiện BE đang lỗi)"
                    readOnly={true}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <RHFInput
                    name="bio"
                    label="Giới thiệu"
                    placeholder="Mô tả ngắn về bạn"
                    required
                    readOnly={!enableEdit}
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
                    {enableEdit && <PublishButton title="Cập nhật hồ sơ" isSubmit={true} />}
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
