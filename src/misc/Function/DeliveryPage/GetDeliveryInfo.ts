import api from "../../../api/api";

export async function getDeliveryData() {
  return await api(`api/carpetReception/getReceptionByDelivery`, "get", {});
}

export function filterDeliveryData(deliveryData: any) {
  return deliveryData.data.filter(
    (reception: any) =>
      reception.numberOfCarpet + reception.numberOfTracks === reception.prepare
  );
}

export function getBill(deliveryData: any, userId: number) {
  const bill = {} as any;
  deliveryData.forEach(async (reception: any) => {
    const clientCarpet = await api(
      `api/carpet/getAllCarpetByClientId/${reception.carpetReceptionUser}/${userId}`,
      "get",
      {}
    );
    const clientBuild = clientCarpet.data.reduce(
      (acc: any, item: any) => acc + item.forPayment,
      0
    );

    bill[clientCarpet.data[0].carpetReceptionUser] = clientBuild;
  });
  return bill;
}

export async function RequestToDelivered(
  carpetReceptionUser: any,
  workerId: number,
  userId: number
): Promise<any> {
  const delivered = await api(
    `api/carpetReception/editReception/${workerId}/${userId}`,
    "post",
    {
      carpetReceptionId: carpetReceptionUser,
      delivered: 1,
      deliveredTime: new Date().toISOString(),
    }
  );

  return delivered.data.carpetReceptionUser;
}
