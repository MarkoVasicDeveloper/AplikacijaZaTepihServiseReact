export const options: any = {
  chart: {
    type: "bar",
    foreColor: "#999",
  },
  plotOptions: {
    bar: {
      horizontal: false,
      dataLabels: {
        position: "top",
      },
    },
  },
  dataLabels: {
    enabled: false,
    offsetX: -1,
    style: {
      fontSize: "12px",
      colors: ["#fff"],
    },
  },
  stroke: {
    show: true,
    width: 1,
    colors: ["#fff"],
  },
  tooltip: {
    shared: true,
    intersect: false,
  },
  xaxis: {
    categories: ["Klijenti", "Tepisi", "Staze"],
  },
};

export function optionsSurfaceAndTraffic(
  categories: string[],
  horizontal: boolean,
  title: string
) {
  return {
    chart: {
      type: "bar",
      foreColor: "#999",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: horizontal,
      },
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: title,
      align: "center",
    },
    xaxis: {
      style: {
        colors: ["#FFF"],
      },
      categories: categories,
    },
  } as any;
}

export function verticalOptions(categorie: string[], text: string) {
  return {
    chart: {
      type: "line",
      foreColor: "#999",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: text,
      align: "center",
    },
    grid: {
      row: {
        colors: ["transparent", "#555"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: categorie,
    },
  } as any;
}

export function seriesData(series: string[], text: string) {
  return [
    {
      name: text,
      data: series,
    },
  ] as any;
}

export function returnApexOptions(data: {}) {
  if (data === undefined) return [[""], [""]];
  const seriesData = [];
  const optionsCategory = [];
  for (const [key, value] of Object.entries(data)) {
    seriesData.push(value);
    optionsCategory.push(key);
  }

  return [seriesData.reverse(), optionsCategory.reverse()];
}

export function Series(names: string[], data: any) {
  const series: any = [];

  names.forEach((name, index) => {
    series.push({
      name,
      data: data[index],
    });
  });

  return series;
}

export function returnSimpleObject(data: {
  string: { surface: number; forPayment: number };
}) {
  const surface = {} as any;
  const traffic = {} as any;

  for (const [key, value] of Object.entries(data)) {
    surface[key] = value.surface;
    traffic[key] = value.forPayment;
  }
  return [surface, traffic];
}
