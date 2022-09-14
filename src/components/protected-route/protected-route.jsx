import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { Preloader } from "../preloader/preloader";

export function ProtectedRoute({ notAuthOnly = false, children, ...rest }) {
  const { email, name } = useSelector((state) => state.auth.user);
  const isAuthCheked = useSelector((state) => state.auth);
  const location = useLocation();

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
