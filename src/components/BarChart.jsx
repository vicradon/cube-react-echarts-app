import React from "react";
import ReactECharts from "echarts-for-react";
import { useCubeQuery } from "@cubejs-client/react";
import Loader from "./Loader";
import { Card } from "react-bootstrap";

function BarChart() {
  const { resultSet, isLoading, error, progress } = useCubeQuery({
    measures: ["Orders.count"],
    timeDimensions: [],
    order: {
      "Orders.count": "desc",
    },
    dimensions: ["ProductCategories.name"],
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

  const workingData = resultSet.loadResponse.results[0].data;
  const productCategoryNames = workingData.map(
    (item) => item["ProductCategories.name"]
  );
  const orderCount = workingData.map((item) => item["Orders.count"]);

  const options = {
    xAxis: {
      type: "category",
      data: productCategoryNames,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: orderCount,
        type: "bar",
      },
    ],
  };

  return (
    <Card className="m-4">
      <Card.Body>
        <Card.Title>Orders by Product Category Names</Card.Title>
        <ReactECharts option={options} />
      </Card.Body>
    </Card>
  );
}

export default BarChart;
