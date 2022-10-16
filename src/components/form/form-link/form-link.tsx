import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./form-link.module.css";

type TFormLink = {
  formName: string;
  linkName: string;
  link: string;
};

export const FormLink: FC<TFormLink> = ({ formName, linkName, link }) => {
  return (
    <p className={`text text_type_main-default text_color_inactive ${styles.navigation}`}>
      {formName}
      <Link className={`pl-2 ${styles.link}`} to={link}>
        {linkName}
      </Link>
    </p>
  );
};
