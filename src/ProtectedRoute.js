import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "./UserProvider";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        typeof user !== "undefined" && user !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
