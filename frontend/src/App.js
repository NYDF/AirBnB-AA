// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/Spot/SpotsIndex";
import SpotShow from "./components/Spot/SpotShow";

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
          <Route path={'/'} exact>
          </Route>

          <Route path={'/spots/:spotId'}>
          <SpotShow />
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
