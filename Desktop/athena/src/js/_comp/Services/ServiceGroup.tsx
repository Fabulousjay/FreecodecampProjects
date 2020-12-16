import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { FC, memo, useCallback, useState } from "react";
import { Service, ServiceProps } from "./Service";

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      width: "100%",
    },
    wrapper: {
      display: "flex",
      flexWrap: "nowrap",
      justifyContent: "center",
      flexDirection: "row",
    },
    service: {
      height: "450px",
      "margin-bottom": "20px",
    },
    serviceDefault: {
      extend: "service",
      width: "25%",
    },
    serviceCondensed: {
      extend: "service",
      width: "10%",
    },
    serviceExpanded: {
      extend: "service",
      display: "flex",
      width: "70%",
      boxShadow: "0 30px 40px -30px rgba(0,0,0,.5), 0 0 10px 0 rgba(0,0,0,.1)",
    },
  }),
);

type ArrayLengthMutationKeys =
  | "splice"
  | "push"
  | "pop"
  | "shift"
  | "unshift"
  | number;

type ArrayItems<T extends any[]> = T extends infer TItems ? TItems : never;

type FixedLengthArray<T extends any[]> = Pick<
  T,
  Exclude<keyof T, ArrayLengthMutationKeys>
> & { [Symbol.iterator]: () => IterableIterator<ArrayItems<T>> };

const getServiceType = (
  selectedIndex: null | number,
  index: number,
): "default" | "condensed" | "expanded" => {
  if (selectedIndex === null) {
    return "default";
  }
  if (selectedIndex === index) {
    return "expanded";
  }
  if (Math.floor(index / 4) === Math.floor(selectedIndex / 4)) {
    return "condensed";
  }
  return "default";
};

interface ServiceGroupProps {
  services: FixedLengthArray<[ServiceProps, ServiceProps, ServiceProps]>;
}

export const ServiceGroup: FC<ServiceGroupProps> = memo(({ services }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  const handleClick = useCallback(
    (index: number) => {
      if (index === selectedIndex) {
        setSelectedIndex(null);
      } else {
        setSelectedIndex(index);
      }
    },
    [selectedIndex],
  );

  return (
    <div className={classes.main}>
      <div className={classes.wrapper}>
        {services.map(({ title, icon, content, subTitle }, index) => {
          const type = getServiceType(selectedIndex, index);

          return (
            <Service
              key={index}
              icon={icon}
              type={type}
              index={index}
              title={title}
              subTitle={subTitle}
              content={content}
              onClick={handleClick}
            />
          );
        })}
      </div>
    </div>
  );
});
