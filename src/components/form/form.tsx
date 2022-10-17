import {FC, FormEvent, ReactNode } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./form.module.css";

type TForm = {
  formName: string;
  buttonText: string;
  children: ReactNode;
  onSubmit?: (e: FormEvent) => void
  disabled?: boolean
};

export const Form:FC<TForm> = ({ formName, buttonText, onSubmit, children, disabled }) => {
  return (
    <form className={`${style.form} pb-20`} onSubmit={onSubmit}>
      <h2 className={`text text_type_main-medium ${style.text}`}>{formName}</h2>
      <div className={style.input}>{children}</div>
      <Button size={"medium"} disabled={disabled} >{buttonText}</Button>
    </form>
  );
}