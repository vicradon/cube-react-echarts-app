import React from "react";
import { Col, Row, Navbar, Container } from "react-bootstrap";
import AreaChart from "./components/AreaChart";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import StackedBarChart from "./components/StackedBarChart";
import { CubeProvider } from "@cubejs-client/react";
import cubejs from "@cubejs-client/core";

export const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDMzNDM1NjUsImV4cCI6MTY0MzQyOTk2NX0.iQlW1J6hYS2Lk_IO5sg-o3zQvNCZzirjqLLOFd6Cjmo",
  { apiUrl: "http://localhost:4000/cubejs-api/v1" }
);

const App = () => {
  return (
    <CubeProvider cubejsApi={cubejsApi}>
      <div className="bg-gray">
        <Navbar>
          <Container>
            <Navbar.Brand href="#home">E-Commerce Dashboard</Navbar.Brand>
          </Container>
        </Navbar>

        <Row>
          <Col>
            <AreaChart />
          </Col>
          <Col>
            <LineChart />
          </Col>
        </Row>
        <StackedBarChart />
        <BarChart />
      </div>
    </CubeProvider>
  );
};

export default App;
