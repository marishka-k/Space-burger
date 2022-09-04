import { Redirect, Route, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

export const ProtectedRoute = ({ children, ...rest }) => {
  const cookie = getCookie("token");
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={() =>
        cookie ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
