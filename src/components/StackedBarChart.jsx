import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import ReactECharts from "echarts-for-react";
import { useCubeQuery } from "@cubejs-client/react";
import dayjs from "dayjs";
import Loader from "./Loader";

function StackedBarChart() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [jsonQuery, setJSONQuery] = useState({
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
  const { resultSet, isLoading, error, progress } = useCubeQuery(jsonQuery);

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

  const updateDate = (event) => {
    event.preventDefault();

    setJSONQuery((prevJSONQuery) => {
      return {
        ...prevJSONQuery,
        filters: [
          {
            member: "Orders.createdAt",
            operator: "inDateRange",
            values: [startDate, endDate],
          },
        ],
      };
    });
  };

  return (
    <Card className="m-4">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between my-4">
          <Card.Title>Orders by Status Over Time</Card.Title>
          <Form
            onSubmit={updateDate}
            className="d-flex align-items-center  gap-4"
          >
            <div className="d-flex gap-2 align-items-center">
              <div>
                <label htmlFor="startDate">Start Date</label>
              </div>

              <input
                id="startDate"
                name="start-date"
                value={startDate}
                onChange={({ target }) => setStartDate(target.value)}
                type="date"
              />
            </div>
            <div className="d-flex gap-2 align-items-center">
              <div>
                <label htmlFor="endDate">End Date</label>
              </div>
              <input
                id="endDate"
                name="end-date"
                value={endDate}
                onChange={({ target }) => setEndDate(target.value)}
                type="date"
              />
            </div>
            <Button type="submit">Set date</Button>
          </Form>
        </div>

        <ReactECharts option={options} />
      </Card.Body>
    </Card>
  );
}

export default StackedBarChart;
