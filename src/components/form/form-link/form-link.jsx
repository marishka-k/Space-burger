import PropTypes from "prop-types";
import { Link} from "react-router-dom";

import styles from "./form-link.module.css";

export const FormLink = ({ formName, linkName, link }) => {
  return (
    <p className={`text text_type_main-default text_color_inactive ${styles.navigation}`}      >
        {formName}
        <Link className={`pl-2 ${styles.link}`} to={link}>
          {linkName}
        </Link>
      </p>
  );
}

FormLink.propTypes = {
  formName: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkName: PropTypes.string.isRequired
};