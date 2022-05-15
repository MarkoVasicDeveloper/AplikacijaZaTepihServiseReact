import {
  optionsSurfaceAndTraffic,
  returnApexOptions,
  seriesData,
} from "../../../../misc/Function/Chart/chart";
import ReactApexChart from "react-apexcharts";

export default function BarChart(props: any) {
  const [series, options] = returnApexOptions(props.data) as any;
  return (
    <ReactApexChart
      options={optionsSurfaceAndTraffic(options, props.horizontal, props.title)}
      series={seriesData(series, props.title)}
      type="bar"
      height={350}
      width={"100%"}
    />
  );
}
