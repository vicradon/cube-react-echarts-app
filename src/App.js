import React from "react";
import ReactECharts from "echarts-for-react";
import { Navbar, Container } from "react-bootstrap";

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
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">E-Commerce Dashboard</Navbar.Brand>
        </Container>
      </Navbar>

      <ReactECharts option={option} />
    </div>
  );
};

export default App;
