import { Button } from "antd";
import "./style.scss";

type Props = {
  title?: string;
  isLoading?: boolean;
  onClick?: () => void;
  Icon?: React.ComponentType<{ className?: string }>;
  isSubmit?: boolean;
  disable?: boolean;
  onClickWithE?: (e: React.MouseEvent<HTMLElement>) => void;
};

export default function PublishButton({
  title,
  isLoading,
  onClick,
  Icon,
  isSubmit,
  disable,
  onClickWithE,
}: Props) {
  return (
    <div className="form__header">
      <Button
        type="primary"
        htmlType={isSubmit ? "submit" : "button"}
        loading={isLoading}
        className="publish__button"
        onClick={onClick || onClickWithE}
        icon={Icon && <Icon className="icon" />}
        disabled={disable}
      >
        {title}
      </Button>
    </div>
  );
}
