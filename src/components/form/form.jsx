import style from "./form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export function Form({ formName, buttonText, onSubmit, children }) {
  return (
    <form className={`${style.form} pb-20`} onSubmit={onSubmit}>
      <h2 className={`text text_type_main-medium ${style.text}`}>{formName}</h2>
      <div className={style.input}>{children}</div>
      <Button size={"medium"}>{buttonText}</Button>
    </form>
  );
}

Form.propTypes = {
  formName: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func,
};
