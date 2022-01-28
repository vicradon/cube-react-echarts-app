import React from "react";
import ReactECharts from "echarts-for-react";

function AreaChart() {
  const options = {
    xAxis: {
      data: ["A", "B", "C", "D", "E"],
    },
    yAxis: {},
    series: [
      {
        data: [10, 22, 28, 23, 19],
        type: "line",
        areaStyle: {},
      },
      {
        data: [25, 14, 23, 35, 10],
        type: "line",
        areaStyle: {
          color: "#ff0",
          opacity: 0.5,
        },
      },
    ],
  };

  return <ReactECharts option={options} />;
}

export default AreaChart;
