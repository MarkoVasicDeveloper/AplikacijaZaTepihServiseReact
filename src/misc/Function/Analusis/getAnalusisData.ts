import api from "../../../api/api";
import { returnSimpleObject } from "../Chart/chart";

export async function getAnalusisData(userId: number) {
  const dayData = await api(`api/analysis/day/${userId}`, "get", {});
  const weekendData = await api(`api/analysis/weekend/${userId}`, "get", {});
  const monthlyData = await api(`api/analysis/monthly/${userId}`, "get", {});
  const yearlyData = await api(`api/analysis/year/${userId}`, "get", {});
  const lastSevenDayData = (await api(
    `api/analysis/lastSevenDayReport/${userId}`,
    "get",
    {}
  )) as any;
  const lastMonthData = (await api(
    `api/analysis/montlyReport/${userId}`,
    "post",
    {}
  )) as any;
  const lastYearData = await api(
    `api/analysis/yearReport/${userId}`,
    "get",
    {}
  );

  const [surface, traffic] = returnSimpleObject(
    lastSevenDayData.data.surfaceAndForPayment
  );

  const [surfaceMonth, trafficMonth] = returnSimpleObject(
    lastMonthData.data.surfaceAndForPayment
  );

  return {
    dayData: dayData.data,
    weekendData: weekendData.data,
    monthlyData: monthlyData.data,
    yearlyData: yearlyData.data,
    lastSevenDayData: lastSevenDayData.data,
    lastMonthData: lastMonthData.data,
    lastYearData: lastYearData.data,
    lastSevenDaySurface: surface,
    lastSevenDayTraffic: traffic,
    lastMonthSurface: surfaceMonth,
    lastMonthTraffic: trafficMonth,
  };
}
