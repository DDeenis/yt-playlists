import React from "react";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const YTButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button {...props} className={"fancy-btn " + props.className ?? ""}>
      {children}
    </button>
  );
};
