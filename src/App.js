import React from "react";
import { Col, Row, Navbar, Container } from "react-bootstrap";
import AreaChart from "./components/AreaChart";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import StackedBarChart from "./components/StackedBarChart";
import { CubeProvider } from "@cubejs-client/react";
import cubejs from "@cubejs-client/core";

export const cubejsApi = cubejs(process.env.REACT_APP_CUBE_JWT, {
  apiUrl: `${process.env.REACT_APP_CUBE_ROOT_API}/cubejs-api/v1`,
});

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
