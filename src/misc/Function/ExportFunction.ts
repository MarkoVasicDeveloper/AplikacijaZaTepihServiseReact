import api from "../../api/api";

export async function RequestToDelivered(
  carpetReceptionUser: any,
  workerId: number,
  userId: number
) {
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
