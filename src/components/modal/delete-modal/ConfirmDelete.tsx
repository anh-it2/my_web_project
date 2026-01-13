import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useTranslations } from "use-intl";

type ConfirmDeleteProps = {
  open: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  onConfirm: (problem: any) => void;
  onCancel: () => void;
};

const t = useTranslations("modal");
export default function ConfirmDelete({
  open,
  title = t("deleteTitle"),
  description = t("deleteDescription"),
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDeleteProps) {
  return (
    <Modal
      open={open}
      footer={null}
      onCancel={onCancel}
      centered
      width={420}
      className="confirm-delete-modal"
    >
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-50">
          <DeleteOutlined className="text-red-500 text-4xl" />
        </div>

        {/* Content */}
        <h3 className="mt-4 text-2xl font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-2 text-base text-gray-700 max-w-sm">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-6 flex w-full gap-3">
          <Button
            block
            onClick={onCancel}
            disabled={loading}
            className="!rounded-lg"
          >
            {t("cancel")}
          </Button>

          <Button
            danger
            type="primary"
            block
            loading={loading}
            onClick={onConfirm}
            className="!rounded-lg"
          >
            {t("delete")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
