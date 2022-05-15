import { useEffect, useState } from "react";
import api from "../../../api/api";
import { useUser } from "../../../Context/UserContext";
import HeaderAdmin from "../Header/HeaderAdmin";
import IconReport from "./IconReport/IconReport";
import "./Analysis.css";
import ClientChart from "./Chart/ClientChart";
import BarChart from "./Chart/BarChart";
import LineChart from "./Chart/LineChart";
import { returnSimpleObject } from "../../../misc/Function/Chart/chart";

export default function Analysis() {
  const { user } = useUser() as any;

  const [dayData, setDayData] = useState({}) as any;
  const [weekendData, setWeekendData] = useState({}) as any;
  const [montlyData, setMontlyData] = useState({}) as any;
  const [yearlyData, setYearlyData] = useState({}) as any;
  const [lastSevenDayData, setLastSevenDayData] = useState({}) as any;
  const [lastSevenDaySurface, setLastSevenDaySurface] = useState({}) as any;
  const [lastSevenDayTraffic, setLastSevenDayTraffic] = useState({}) as any;
  const [lastMonthData, setLastMonthData] = useState({}) as any;
  const [lastMonthlySurface, setLastMonthlySurface] = useState({}) as any;
  const [lastMonthlyTraffic, setLastMonthlyTraffic] = useState({}) as any;
  const [lastYearData, setLastYearData] = useState({}) as any;
  const [lastYearSurface, setLastYearSurface] = useState({}) as any;
  const [lastYearTraffic, setLastYearTraffic] = useState({}) as any;

  useEffect(() => {
    async function getData() {
      const dailyReport = await api(
        `api/analysis/day/${user.userId}`,
        "get",
        {},
        "administrator"
      );
      setDayData(dailyReport.data);

      const weekendlyReport = await api(
        `api/analysis/weekend/${user.userId}}`,
        "get",
        {}
      );
      setWeekendData(weekendlyReport.data);

      const monthlyReport = await api(
        `api/analysis/monthly/${user.userId}`,
        "get",
        {}
      );
      setMontlyData(monthlyReport.data);

      const yearlyReport = await api(
        `api/analysis/year/${user.userId}`,
        "get",
        {}
      );

      setYearlyData(yearlyReport.data);

      const lastSevenDayReport = await api(
        `api/analysis/lastSevenDayReport/${user.userId}`,
        "get",
        {}
      );
      setLastSevenDayData(lastSevenDayReport.data);
      const [surface, traffic] = returnSimpleObject(
        lastSevenDayReport.data.surfaceAndForPayment
      );
      setLastSevenDaySurface(surface);
      setLastSevenDayTraffic(traffic);

      const lastMonthlyReport = await api(
        `api/analysis/montlyReport/${user.userId}`,
        "post",
        {}
      );
      setLastMonthData(lastMonthlyReport.data);
      const [surfaceMonth, trafficMonth] = returnSimpleObject(
        lastMonthlyReport.data.surfaceAndForPayment
      );
      setLastMonthlySurface(surfaceMonth);
      setLastMonthlyTraffic(trafficMonth);

      const lastYearReport = await api(
        `api/analysis/yearReport/${user.userId}`,
        "get",
        {},
        "administrator"
      );

      setLastYearData(lastYearReport.data);
      console.log(lastYearReport.data);
    }
    getData();
  }, [user.userId]);

  return (
    <section id="adminAnalysis">
      <HeaderAdmin />
      <IconReport
        title={"Analiza poslovanja tepih servisa"}
        subTitle={"Dnevni izvestaj poslovanja"}
        newUser={dayData.numberOfClients}
        numberOfCarpet={dayData.numberOfCarpet}
        numberOfTracks={dayData.numberOfTracks}
        totalSurface={dayData.totalSurface}
        totalPrice={dayData.totalPrice}
      />
      <div className="chartContainer">
        <ClientChart
          data={[
            [
              dayData.numberOfClients,
              dayData.numberOfCarpet,
              dayData.numberOfTracks,
            ],
            [
              Number((weekendData.numberOfClients / 7).toFixed(0)),
              Number((weekendData.numberOfCarpet / 7).toFixed(0)),
              Number((weekendData.numberOfTracks / 7).toFixed(0)),
            ],
            [
              Number((montlyData.numberOfClients / 30).toFixed(0)),
              Number((montlyData.numberOfCarpet / 30).toFixed(0)),
              Number((montlyData.numberOfTracks / 30).toFixed(0)),
            ],
            [
              Number((yearlyData.numberOfClients / 365).toFixed(0)),
              Number((yearlyData.numberOfCarpet / 365).toFixed(0)),
              Number((yearlyData.numberOfTracks / 365).toFixed(0)),
            ],
          ]}
        />
        <BarChart
          data={{
            Povrsina: Number(dayData.totalSurface).toFixed(0),
            "Sedmicni prosek": Number(weekendData.totalSurface / 7).toFixed(0),
            "Mesecni prosek": Number(montlyData.totalSurface / 30).toFixed(0),
            "Godisnji prosek": Number(yearlyData.totalSurface / 365).toFixed(0),
          }}
          title={"Povrsina"}
          horizontal
        />

        <BarChart
          data={{
            Promet: Number(dayData.totalPrice).toFixed(0),
            "Sedmicni prosek": Number(weekendData.totalPrice / 7).toFixed(0),
            "Mesecni prosek": Number(montlyData.totalPrice / 30).toFixed(0),
            "Godisnji prosek": Number(yearlyData.totalPrice / 365).toFixed(0),
          }}
          title={"Promet"}
          horizontal
        />
      </div>
      <IconReport
        title={""}
        subTitle={"Sedmicni izvestaj poslovanja"}
        newUser={weekendData.numberOfClients}
        numberOfCarpet={weekendData.numberOfCarpet}
        numberOfTracks={weekendData.numberOfTracks}
        totalSurface={weekendData.totalSurface}
        totalPrice={weekendData.totalPrice}
      />
      <div className="chartContainer">
        <LineChart
          data={lastSevenDayData.clients}
          title={"Novi klijenti zadnjih 7 dana"}
          subTitle={"Klijenti"}
        />
        <BarChart
          data={lastSevenDayData.numberOfCarpet}
          title={"Tepisi zadnjih 7 dana"}
        />
        <BarChart
          data={lastSevenDaySurface}
          title={"Povrsina zadnjih 7 dana"}
          horizontal
        />
        <BarChart
          data={lastSevenDayTraffic}
          title={"Promet zadnjih 7 dana"}
          horizontal
        />
      </div>
      <IconReport
        title={""}
        subTitle={"Mesecni izvestaj poslovanja"}
        newUser={montlyData.numberOfClients}
        numberOfCarpet={montlyData.numberOfCarpet}
        numberOfTracks={montlyData.numberOfTracks}
        totalSurface={montlyData.totalSurface}
        totalPrice={montlyData.totalPrice}
      />
      <div className="chartContainer">
        <LineChart
          data={lastMonthData.clients}
          title={"Novi klijenti zadnjih 30 dana"}
          subTitle={"Klijenti"}
        />

        <BarChart
          data={lastMonthData.numberOfCarpet}
          title={"Tepisi zadnjih 30 dana"}
          horizontal
        />

        <BarChart
          data={lastMonthlySurface}
          title={"Povrsina zadnjih 30 dana"}
          horizontal
        />
        <BarChart
          data={lastMonthlyTraffic}
          title={"Promet zadnjih 30 dana"}
          horizontal
        />
      </div>
      <IconReport
        title={""}
        subTitle={"Godisnji izvestaj poslovanja"}
        newUser={yearlyData.numberOfClients}
        numberOfCarpet={yearlyData.numberOfCarpet}
        numberOfTracks={yearlyData.numberOfTracks}
        totalSurface={yearlyData.totalSurface}
        totalPrice={yearlyData.totalPrice}
      />
      <div className="chartContainer">
        <LineChart
          data={lastYearData.clients}
          title={"Klijenti - godisnji izvestaj"}
          subTitle={"Klijenti"}
        />
      </div>
    </section>
  );
}
