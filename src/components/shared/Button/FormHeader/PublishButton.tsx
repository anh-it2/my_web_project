import { Button } from "antd";
import "./style.scss";

type Props = {
  title?: string;
  isLoading?: boolean;
  onClick?: () => void;
  Icon?: React.ComponentType<{ className?: string }>;
  isSubmit?: boolean;
  disable?: boolean;
};

export default function PublishButton({
  title,
  isLoading,
  onClick,
  Icon,
  isSubmit,
  disable,
}: Props) {
  return (
    <div className="form__header">
      <Button
        type="primary"
        htmlType={isSubmit ? "submit" : "button"}
        loading={isLoading}
        className="publish__button"
        onClick={onClick}
        icon={Icon && <Icon className="icon" />}
        disabled={disable}
      >
        {title}
      </Button>
    </div>
  );
}
