import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BikeRentalStation from "./components/BikeRentalStation";

function App() {
  const [bikeRentalStations, setBikeRentalStations] = useState([]);

  useEffect(() => {
      const hslBikesEndpoint = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";
      const hslheaders = {
        "Content-Type": "application/json"
      };
      const hslBikesGraphqlQuery = { "query": `{
        bikeRentalStations {
          name
          stationId
        }
      }`};

      const res = axios.post(
        hslBikesEndpoint,
        hslBikesGraphqlQuery,
        hslheaders
      );
      res.then(response => {
        setBikeRentalStations(response.data.data.bikeRentalStations);
      })
    }
  );

  if (bikeRentalStations.length > 0) {
    return (
      <>
        <div className="container font-sans">
          <h2 className="text-2xl font-bold">HSL bikes</h2>
          <ul class="flex-1">
            {bikeRentalStations.map( bikeRentalStation =>
              <BikeRentalStation key={bikeRentalStation.stationId} station={bikeRentalStation}/>
            )}
          </ul>
        </div>
      </>
    );
  }
  else {
    return (
      <>
        <div className="font-sans">
          <h2 className="text-2xl font-bold">HSL bikes</h2>
          <p>No bike rental stations</p>
        </div>
      </>
    );
  }
}

export default App;
