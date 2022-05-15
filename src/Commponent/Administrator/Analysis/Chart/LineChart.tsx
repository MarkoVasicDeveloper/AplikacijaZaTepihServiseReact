import React from "react";
import ReactApexChart from "react-apexcharts";
import {
  returnApexOptions,
  verticalOptions,
  seriesData,
} from "../../../../misc/Function/Chart/chart";

export default function LineChart(props: any) {
  const [series, options] = returnApexOptions(props.data) as any;

  return (
    <ReactApexChart
      options={verticalOptions(options, props.title)}
      series={seriesData(series, props.subTitle)}
      type="line"
      height={350}
      width={"100%"}
    />
  );
}
