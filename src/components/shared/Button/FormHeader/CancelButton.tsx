import { Button } from "antd";
import "./style.scss";

type Props = {
  title?: string;
  isLoading?: boolean;
  onClick?: () => void;
  disable?: boolean;
};

export default function CancelButton({
  title,
  isLoading,
  onClick,
  disable,
}: Props) {
  return (
    <div className="form__header">
      <Button
        type="default"
        className="cancel__button"
        onClick={onClick}
        loading={isLoading}
        disabled={disable}
      >
        {title}
      </Button>
    </div>
  );
}
