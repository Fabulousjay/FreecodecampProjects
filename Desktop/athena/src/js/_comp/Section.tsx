import classnames from "classnames";
import React, { FC, HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  classes?: {
    main?: string;
    wrapper?: string;
  };
}

export const Section: FC<SectionProps> = ({ children, classes, ...props }) => (
  <div className={classnames("section", classes?.main)} {...props}>
    <div className={classnames("section__wrapper", classes?.wrapper)}>
      {children}
    </div>
  </div>
);
