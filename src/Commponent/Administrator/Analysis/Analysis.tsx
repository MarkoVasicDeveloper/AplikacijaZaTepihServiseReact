import HeaderAdmin from "../Header/HeaderAdmin";
import IconReport from "./IconReport/IconReport";
import "./Analysis.css";
import ClientChart from "./Chart/ClientChart";
import BarChart from "./Chart/BarChart";
import LineChart from "./Chart/LineChart";
import { useAnalusis } from "../../../Context/AnalusisContext";

export default function Analysis() {
  const { analusisData } = useAnalusis() as any;

  return (
    <section id="adminAnalysis">
      <HeaderAdmin />
      <IconReport
        title={"Analiza poslovanja tepih servisa"}
        subTitle={"Dnevni izvestaj poslovanja"}
        newUser={analusisData.dayData.numberOfClients}
        numberOfCarpet={analusisData.dayData.numberOfCarpet}
        numberOfTracks={analusisData.dayData.numberOfTracks}
        totalSurface={analusisData.dayData.totalSurface}
        totalPrice={analusisData.dayData.totalPrice}
      />
      <div className="chartContainer">
        <ClientChart
          data={[
            [
              analusisData ? analusisData.dayData.numberOfClients : 0,
              analusisData ? analusisData.dayData.numberOfCarpet : 0,
              analusisData ? analusisData.dayData.numberOfTracks : 0,
            ],
            [
              Number((analusisData.weekendData.numberOfClients / 7).toFixed(0)),
              Number((analusisData.weekendData.numberOfCarpet / 7).toFixed(0)),
              Number((analusisData.weekendData.numberOfTracks / 7).toFixed(0)),
            ],
            [
              Number(
                (analusisData.monthlyData.numberOfClients / 30).toFixed(0)
              ),
              Number((analusisData.monthlyData.numberOfCarpet / 30).toFixed(0)),
              Number((analusisData.monthlyData.numberOfTracks / 30).toFixed(0)),
            ],
            [
              Number(
                (analusisData.yearlyData.numberOfClients / 365).toFixed(0)
              ),
              Number((analusisData.yearlyData.numberOfCarpet / 365).toFixed(0)),
              Number((analusisData.yearlyData.numberOfTracks / 365).toFixed(0)),
            ],
          ]}
        />
        <BarChart
          data={{
            Povrsina: analusisData
              ? Number(analusisData.dayData.totalSurface).toFixed(0)
              : 0,
            "Sedmicni prosek": analusisData
              ? Number(analusisData.weekendData.totalSurface / 7).toFixed(0)
              : 0,
            "Mesecni prosek": analusisData
              ? Number(analusisData.monthlyData.totalSurface / 30).toFixed(0)
              : 0,
            "Godisnji prosek": analusisData
              ? Number(analusisData.yearlyData.totalSurface / 365).toFixed(0)
              : 0,
          }}
          title={"Povrsina"}
          horizontal
        />

        <BarChart
          data={{
            Promet: Number(analusisData.dayData.totalPrice).toFixed(0),
            "Sedmicni prosek": Number(
              analusisData.weekendData.totalPrice / 7
            ).toFixed(0),
            "Mesecni prosek": Number(
              analusisData.monthlyData.totalPrice / 30
            ).toFixed(0),
            "Godisnji prosek": Number(
              analusisData.yearlyData.totalPrice / 365
            ).toFixed(0),
          }}
          title={"Promet"}
          horizontal
        />
      </div>
      <IconReport
        title={""}
        subTitle={"Sedmicni izvestaj poslovanja"}
        newUser={analusisData.weekendData.numberOfClients}
        numberOfCarpet={analusisData.weekendData.numberOfCarpet}
        numberOfTracks={analusisData.weekendData.numberOfTracks}
        totalSurface={analusisData.weekendData.totalSurface}
        totalPrice={analusisData.weekendData.totalPrice}
      />
      <div className="chartContainer">
        <LineChart
          data={analusisData.lastSevenDayData.clients}
          title={"Novi klijenti zadnjih 7 dana"}
          subTitle={"Klijenti"}
        />
        <BarChart
          data={analusisData.lastSevenDayData.numberOfCarpet}
          title={"Tepisi zadnjih 7 dana"}
        />
        <BarChart
          data={analusisData.lastSevenDaySurface}
          title={"Povrsina zadnjih 7 dana"}
          horizontal
        />
        <BarChart
          data={analusisData.lastSevenDayTraffic}
          title={"Promet zadnjih 7 dana"}
          horizontal
        />
      </div>
      <IconReport
        title={""}
        subTitle={"Mesecni izvestaj poslovanja"}
        newUser={analusisData.monthlyData.numberOfClients}
        numberOfCarpet={analusisData.monthlyData.numberOfCarpet}
        numberOfTracks={analusisData.monthlyData.numberOfTracks}
        totalSurface={analusisData.monthlyData.totalSurface}
        totalPrice={analusisData.monthlyData.totalPrice}
      />
      <div className="chartContainer">
        <LineChart
          data={analusisData.lastMonthData.clients}
          title={"Novi klijenti zadnjih 30 dana"}
          subTitle={"Klijenti"}
        />

        <BarChart
          data={analusisData.lastMonthData.numberOfCarpet}
          title={"Tepisi zadnjih 30 dana"}
          horizontal
        />

        <BarChart
          data={analusisData.lastMonthSurface}
          title={"Povrsina zadnjih 30 dana"}
          horizontal
        />
        <BarChart
          data={analusisData.lastMonthTraffic}
          title={"Promet zadnjih 30 dana"}
          horizontal
        />
      </div>
      <IconReport
        title={""}
        subTitle={"Godisnji izvestaj poslovanja"}
        newUser={analusisData.yearlyData.numberOfClients}
        numberOfCarpet={analusisData.yearlyData.numberOfCarpet}
        numberOfTracks={analusisData.yearlyData.numberOfTracks}
        totalSurface={analusisData.yearlyData.totalSurface}
        totalPrice={analusisData.yearlyData.totalPrice}
      />
      <div className="chartContainer">
        <LineChart
          data={analusisData ? analusisData.lastYearData.clients : 0}
          title={"Klijenti - godisnji izvestaj"}
          subTitle={"Klijenti"}
        />
      </div>
    </section>
  );
}
