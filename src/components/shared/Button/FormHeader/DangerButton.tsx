import { Button } from "antd";
import React from "react";

type Props = {
  title?: string;
  isLoading?: boolean;
  onClick?: () => void;
  Icon?: React.ComponentType<{ className?: string }>;
  onClickWithE?: (e: React.MouseEvent<HTMLElement>) => void;
};
export default function DangerButton({
  title,
  isLoading,
  onClick,
  Icon,
  onClickWithE,
}: Props) {
  return (
    <div className="form__header">
      <Button
        type="default"
        loading={isLoading}
        onClick={onClick || onClickWithE}
        className="danger__button"
        danger
        icon={Icon && <Icon className="danger__icon" />}
      >
        {title}
      </Button>
    </div>
  );
}
