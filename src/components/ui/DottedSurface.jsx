import React from "react";

export function DottedSurface({ className = "", children, ...props }) {
  return (
    <div className={`dotted-surface-container ${className}`} {...props}>
      <div className="dotted-surface-bg" />
      <div aria-hidden="true" className="dotted-surface-glow" />
      <div className="dotted-surface-content">{children}</div>
    </div>
  );
}
