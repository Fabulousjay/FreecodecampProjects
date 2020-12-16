import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Settings as CogIcon } from "@material-ui/icons";
import { chunk } from "lodash";
import React from "react";
import { FaToolbox } from "react-icons/fa";
import { Section } from "..";
import { ServiceProps } from "./Service";
import { ServiceGroup } from "./ServiceGroup";

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      padding: "0 25px",
      marginBottom: "calc(100vw * 0.06)",
    },
    wrapper: {
      maxWidth: 1366,
      margin: "0 auto",
      padding: "0 25px",
    },
    title: {
      fontSize: 40,
      textAlign: "left",
      margin: 0,
    },
    subTitle: {
      fontSize: 30,
      maxWidth: 550,
      fontWeight: 300,
      marginBottom: 35,
      textAlign: "left",
    },
    servicesWrapper: {
      display: "flex",
      flexDirection: "column",
    },
  }),
);

const services: ServiceProps[] = [
  {
    icon: FaToolbox,
    title: "Content Management System",
    subTitle: "Customize your content",
    content: "asjhdbakjndas",
  },
  {
    icon: CogIcon,
    title: "Understand your Clients",
    subTitle: "Customize your content",
    content: "asjhdbakjndas",
  },
  {
    icon: CogIcon,
    title: "Improve your Online Presence",
    subTitle: "Customize your content",
    content: "asjhdbakjndas",
  },
  {
    icon: CogIcon,
    title: "Sell Online your Online Presence",
    subTitle: "Customize your content",
    content: "asjhdbakjndas",
  },
];

export const Services = () => {
  const classes = useStyles();

  return (
    <Section>
      <h2 className={classes.title}>Features</h2>
      <div className={classes.subTitle}>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </p>
      </div>
      <div className={classes.servicesWrapper}>
        {chunk(services, 4).map((chunked: any, index: number) => (
          <ServiceGroup key={index} services={chunked} />
        ))}
      </div>
    </Section>
  );
};
