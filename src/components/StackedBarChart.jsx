import React from "react";
import ReactECharts from "echarts-for-react";
import { useCubeQuery } from "@cubejs-client/react";
import dayjs from "dayjs";
import Loader from "./Loader";
import { Card } from "react-bootstrap";

function StackedBarChart() {
  const { resultSet, isLoading, error, progress } = useCubeQuery({
    measures: ["Orders.count"],
    timeDimensions: [
      {
        dimension: "Orders.createdAt",
        granularity: "month",
      },
    ],
    order: [
      ["Orders.count", "desc"],
      ["Orders.createdAt", "asc"],
    ],
    dimensions: ["Orders.status"],
    filters: [],
  });

  if (error) {
    return <p>{error.toString()}</p>;
  }
  if (isLoading) {
    return (
      <div>
        {(progress && progress.stage && progress.stage.stage) || <Loader />}
      </div>
    );
  }

  if (!resultSet) {
    return null;
  }

  const returnedData = resultSet.loadResponse.results[0].data.sort(
    (first, second) =>
      dayjs(first["Orders.createdAt.month"]).diff(
        dayjs(second["Orders.createdAt.month"])
      )
  );

  const filterOrderStatusBy = (type) =>
    returnedData
      .filter((order) => order["Orders.status"] === type)
      .map((order) => order["Orders.count"]);

  const ordersProcessing = filterOrderStatusBy("processing");
  const ordersCompleted = filterOrderStatusBy("completed");
  const ordersShipped = filterOrderStatusBy("shipped");

  const orderMonths = [
    ...new Set(
      returnedData.map((order) => {
        return dayjs(order["Orders.createdAt.month"]).format("MMM YYYY");
      })
    ),
  ];

  const options = {
    legend: {
      data: [
        "Processing Orders count",
        "Completed Orders count",
        "Shipped Orders count",
      ],
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      data: orderMonths,
    },
    yAxis: {},
    series: [
      {
        name: "Processing Orders count",
        data: ordersProcessing,
        type: "bar",
        stack: "x",
      },
      {
        name: "Completed Orders count",
        data: ordersCompleted,
        type: "bar",
        stack: "x",
      },
      {
        name: "Shipped Orders count",
        data: ordersShipped,
        type: "bar",
        stack: "x",
      },
    ],
  };

  return (
    <Card className="m-4">
      <Card.Body>
        <Card.Title>Orders by Status Over Time</Card.Title>
        <ReactECharts option={options} />
      </Card.Body>
    </Card>
  );
}

export default StackedBarChart;
