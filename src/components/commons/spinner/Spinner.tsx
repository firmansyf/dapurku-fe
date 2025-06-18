import React from "react";

interface SpinnerProps {
  size?: number; // size in pixels
  colorClass?: string; // tailwind color class for the border
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 24,
  colorClass = "border-green-500",
}) => {
  const borderSize = Math.max(Math.floor(size / 8), 2);

  return (
    <div
      className={`animate-spin rounded-full border-2 ${colorClass}`}
      style={{
        width: size,
        height: size,
        borderTopWidth: borderSize,
        borderBottomWidth: borderSize,
      }}
    ></div>
  );
};

export default Spinner;