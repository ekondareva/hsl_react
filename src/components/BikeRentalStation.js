import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';

const BikeRentalStation = ({station}) => {
  const [bikesAvailable, setBikesAvailable] = useState(0);
  const [spacesAvailable, setSpacesAvailable] = useState(0);

  const [showDetailedInfo, setShowDetailedInfo] = useState(false);

  useEffect(() => {
    if (showDetailedInfo === true) {
      // Fetch single city bike station and its current bike availability details.
      const hslBikesEndpoint = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";
      const hslheaders = {
        "Content-Type": "application/json"
      };
      const hslBikesGraphqlQuery = { "query": `{
        bikeRentalStation(id:"${station.stationId}") {
          name
          stationId
          bikesAvailable
          spacesAvailable
          lat
          lon
          allowDropoff
        }
      }`};

      const res = axios.post(
        hslBikesEndpoint,
        hslBikesGraphqlQuery,
        hslheaders
      );
      res.then(response => {
        setBikesAvailable(response.data.data.bikeRentalStation.bikesAvailable);
        setSpacesAvailable(response.data.data.bikeRentalStation.spacesAvailable)
      })
    }
  }, [showDetailedInfo]);

  function showHideDetails() {
    setShowDetailedInfo(!showDetailedInfo);
  }

  const buttonText = showDetailedInfo ? 'Hide details' : 'Show more details';
  return (
    <li className="my-8">
      <div className="flex gap-x-4">
        <div className="font-semibold text-xl">{station.name}</div>
        <button className="border-solid border-2 border-indigo-600 px-2 py-1 text-sm"
                onClick={() => showHideDetails()}>
          {buttonText}
        </button>
      </div>

      {showDetailedInfo && (
        <div className="flex gap-x-4">
          <div>Bikes available: {bikesAvailable}</div>
          <div>Spaces available: {spacesAvailable}</div>
        </div>
      )}
    </li>
  );
}

export default BikeRentalStation;