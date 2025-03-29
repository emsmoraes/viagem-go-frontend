import React from "react";
import DestinationsAccordion from "./Components/DestinationsAccordion";
import PassengersAccordion from "./Components/PassengersAccordion";
import DayByDayAccordion from "./Components/DayByDayAccordion";

export function Itinerary() {
  return (
    <div className="space-y-3 lg:pr-6">
      <PassengersAccordion />
      <DestinationsAccordion />
      <DayByDayAccordion />
    </div>
  );
}
