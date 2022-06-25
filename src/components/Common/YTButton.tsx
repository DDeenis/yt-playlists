import React from "react";
import "./styles.css";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const YTButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div className="yt-btn-wrapper">
      <button {...props} className={"yt-btn " + props.className ?? ""}>
        {children}
      </button>
    </div>
  );
};
