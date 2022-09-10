import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";

export function ProtectedRoute({ notAuthOnly = false, children, ...rest }) {
  const { email , name } = useSelector((state) => state.auth.user);
  const location = useLocation();

  if (notAuthOnly && email !== "" && name !== "" ) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }
  if (!notAuthOnly && email === "" && name === "" ) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }
  return <Route {...rest}>{children}</Route>;
}
