import React from "react";
import ReactECharts from "echarts-for-react";
import { useCubeQuery } from "@cubejs-client/react";
import Loader from "./Loader";
import { Card } from "react-bootstrap";

function LineChart() {
  const { resultSet, isLoading, error, progress } = useCubeQuery({
    measures: ["Products.count"],
    order: [["Products.count", "asc"]],
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
  const productCategoriesCount = workingData.map(
    (item) => item["Products.count"]
  );

  const options = {
    legend: {
      data: ["Product Categories count"],
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      data: productCategoryNames,
    },
    yAxis: {},
    series: [
      {
        name: "Product Categories count",
        data: productCategoriesCount,
        type: "line",
      },
    ],
  };

  return (
    <Card className="m-4">
      <Card.Body>
        <Card.Title>Products by Category</Card.Title>
        <ReactECharts option={options} />
      </Card.Body>
    </Card>
  );
}

export default LineChart;
