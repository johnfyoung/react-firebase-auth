import { useContext } from "react";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import { UserContext } from "./UserProvider";
import { Helmet } from "react-helmet";

import ProtectedRoute from "./ProtectedRoute";

import Header from "./Header";
import PageHome from "./PageHome";
import PageSignup from "./PageSignup";
import PageAbout from "./PageAbout";
import PageSecret from "./PageSecret";
import PageNotFound from "./PageNotFound";

function Routes() {
  const { user } = useContext(UserContext);

  console.log("---------------- ROUTES: ", user);

  return (
    <>
      {typeof user !== "undefined" ? (
        <>
          <Helmet>
            <title>React Firebase Auth</title>
          </Helmet>
          <Header />
          <Switch>
            <Route exact path="/">
              <PageHome />
            </Route>
            <Route exact path="/signup">
              <PageSignup />
            </Route>
            <Route exact path="/about">
              <PageAbout />
            </Route>
            <ProtectedRoute exact path="/admin" component={PageSecret} />
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </>
      ) : (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      )}
    </>
  );
}

export default Routes;
