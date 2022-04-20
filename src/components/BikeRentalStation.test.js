import React from 'react';
import { render, screen } from '@testing-library/react';
import BikeRentalStation from "../components/BikeRentalStation";

test('BikeRentalStation is rendered', () => {
  let bikeRentalStation = {};
  bikeRentalStation['name'] = 'Majurinkulma';
  bikeRentalStation['stationId'] = '707';

  const { component } = render(
    <BikeRentalStation key={bikeRentalStation.stationId} station={bikeRentalStation}/>
  );

  const hslBikeStationElement = screen.getByText(/Majurinkulma/i);
  expect(hslBikeStationElement).toBeInTheDocument();

  const showMoreButtonElement = screen.getByText(/Show more details/i);
  expect(showMoreButtonElement).toBeInTheDocument();
});