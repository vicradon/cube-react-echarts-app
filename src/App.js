import React from "react";
import { Col, Row } from "react-bootstrap";
import AreaChart from "./components/AreaChart";
import ColumnChart from "./components/ColumnChart";
import Header from "./components/Header";
import LineChart from "./components/LineChart";
import StackedColumnChart from "./components/StackedColumnChart";

const App = () => {
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };

  return (
    <div className="bg-gray">
      <Header />

      <Row>
        <Col>
          <AreaChart />
        </Col>
        <Col>
          <LineChart />
        </Col>
      </Row>
      <StackedColumnChart />
      <ColumnChart />
    </div>
  );
};

export default App;
