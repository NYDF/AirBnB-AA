// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/Spot/SpotsIndex";
import SpotShow from "./components/Spot/SpotShow";
import CreateSpotPage from "./components/Spot/CreateSpotPage";
import CurrentUserSpots from "./components/Spot/CurrentUserSpots";
import EditSpotPage from "./components/Spot/EditSpotPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route path={"/spotss/:spotId/edit"} exact>
            <EditSpotPage />
          </Route>

          <Route path={"/spotss/current"} exact>
            <CurrentUserSpots />
          </Route>

          <Route path={"/spots/new"} exact>
            <CreateSpotPage />
          </Route>

          <Route path={'/spots/:spotId'} exact>
            <SpotShow />
          </Route>

          <Route path={'/'} exact>
            <SpotsIndex />
          </Route>

          <Route path={'/spots'} exact>
            <SpotsIndex />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          {/* <Route>Page Not Found</Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
