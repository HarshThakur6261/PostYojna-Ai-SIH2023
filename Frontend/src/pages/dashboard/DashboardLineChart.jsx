

import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const DashboardBarChart = ({ view, registrationsOverYears }) => {
  if (!registrationsOverYears || registrationsOverYears.length === 0) {
    return <p>No data available</p>;
  }

  // Extract xLabels (years) and corresponding data (registrations)
  const xLabels = registrationsOverYears.map((item) => item.year);
  const data = registrationsOverYears.map((item) => item.registrations);

  return (
    <div>
      <BarChart
        width={500}
        height={300}
        series={[
          {
            data: data,
            label: `Registrations (${view})`, // Label based on selected view (Monthly/Yearly)
            id: "registrationsId",
            color: "#1A237E"
          },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
    </div>
  );
};

export default DashboardBarChart;






