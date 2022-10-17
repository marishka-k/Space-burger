import { FC, ReactNode } from 'react';
import { useSelector } from '../../services/types';
import { Redirect, Route, useLocation } from "react-router-dom";
import { Preloader } from "../preloader/preloader";
import { TLocation } from '../../services/types/data';

interface IProtectedRoute {
  notAuthOnly?: boolean;
	children: ReactNode;
  path: string;	
  exact?: boolean;
} 

export const ProtectedRoute: FC<IProtectedRoute> = ({ notAuthOnly = false, children, ...rest }) => {
  const { email, name } = useSelector((state) => state.auth.user);
  const isAuthCheked = useSelector((state) => state.auth);
  const location = useLocation<TLocation>();

  if (!isAuthCheked) {
    return <Preloader />;
  }

  if (notAuthOnly && isAuthCheked && email !== "" && name !== "") {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }
  if (!notAuthOnly && isAuthCheked && email === "" && name === "" ) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
}
