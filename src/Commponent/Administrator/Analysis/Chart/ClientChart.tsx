import ReactApexChart from "react-apexcharts";
import { options, Series } from "../../../../misc/Function/Chart/chart";

export default function ClientChart(props: any) {
  const name = ["Dnevno", "Nedeljno", "Mesecno", "Godisnje"];

  return (
    <ReactApexChart
      options={options}
      series={Series(name, [
        props.data[0],
        props.data[1],
        props.data[2],
        props.data[3],
      ])}
      type="bar"
      height={350}
      width={"100%"}
    />
  );
}
