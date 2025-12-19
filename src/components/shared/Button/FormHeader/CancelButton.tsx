import { Button } from "antd";
import "./style.scss";

type Props = {
  title?: string;
  isLoading?: boolean;
  onClick?: () => void;
  disable?: boolean;
  onClickWithE?: (e: React.MouseEvent<HTMLElement>) => void;
};

export default function CancelButton({
  title,
  isLoading,
  onClick,
  disable,
  onClickWithE,
}: Props) {
  return (
    <div className="form__header">
      <Button
        type="default"
        className="cancel__button"
        onClick={onClick || onClickWithE}
        loading={isLoading}
        disabled={disable}
      >
        {title}
      </Button>
    </div>
  );
}
