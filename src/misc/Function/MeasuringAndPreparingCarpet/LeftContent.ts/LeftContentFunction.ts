import api from "../../../../api/api";

export async function getReception(receptionUserId: string, userId: number) {
  return await api(
    `api/carpetReception/getReceptionById/${receptionUserId}/${userId}`,
    "post",
    {}
  );
}

export async function getWorkerName(currentReception: any, userId: number) {
  const worker = await api(
    `api/worker/${currentReception.data.workerId}/${userId}`,
    "get",
    {}
  );
  return worker.data.name;
}
