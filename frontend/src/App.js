// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
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
import SearchedSpots from "./components/Spot/SearchedSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} searchFunc={[searchTerm, setSearchTerm]} />
      {isLoaded && (
        <Switch>

          <Route path={"/spotss/:spotId/edit"} exact>
            <EditSpotPage />
          </Route>

          <Route path={"/spotss/filter"} exact>
            <FilterSpots />
          </Route>

          <Route path={"/spotss/search"} exact>
            <SearchedSpots searchFunc={[searchTerm, setSearchTerm]} />
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

          {/* <Route>Page Not Found</Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
