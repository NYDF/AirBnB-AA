// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/Spot/SpotsIndex";
import SpotShow from "./components/Spot/SpotShow";
import CreateSpotPage from "./components/Spot/CreateSpotPage";
import CurrentUserSpots from "./components/Spot/CurrentUserSpots";
import EditSpotPage from "./components/Spot/EditSpotPage";
import CurrentUserReviews from "./components/Review/CurrentUserReviews";
import CurrentUserBookings from "./components/Booking/CurrentUserBooking";
import FilterSpots from "./components/Spot/FilterSpots";

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

          <Route path={"/spotss/filter"} exact>
            <FilterSpots />
          </Route>

          <Route path={"/spotss/current"} exact>
            <CurrentUserSpots />
          </Route>

          <Route path={"/bookings/current"} exact>
            <CurrentUserBookings />
          </Route>

          <Route path={"/reviewss/current"} exact>
            <CurrentUserReviews />
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

          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}

          {/* <Route>Page Not Found</Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
