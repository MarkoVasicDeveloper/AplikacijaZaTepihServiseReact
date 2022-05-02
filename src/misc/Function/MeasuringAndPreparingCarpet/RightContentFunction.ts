import api from "../../../api/api";

export function emptyInput(state: any) {
  if (state.width === "" || state.height === "" || state.price === "")
    return false;
  return true;
}

export async function addCarpet(
  user: any,
  state: any,
  reception: any,
  key: string,
  worker: any
) {
  return await api(`api/carpet/addCarpet/${user.userId}`, "post", {
    carpetReception: reception.carpetReceptionUserId,
    width: state[key].width,
    height: state[key].height,
    price: state[key].price,
    workerId: worker.workerId,
    deliveryDate: reception.date,
    clientsId: reception.clientId,
  });
}

export async function editReception(reception: any, user: any, index: number) {
  return await api(
    `api/carpetReception/editReception/${reception.workerReceivedId}/${user.userId}`,
    "post",
    {
      carpetReceptionId: reception.carpetReceptionUserId,
      prepare: reception.prepared + index,
    },
    "user"
  );
}

export async function editCarpetRequest(
  reception: any,
  key: string,
  worker: any,
  user: any
) {
  return await api(
    `api/carpet/editCarpet/${reception["carpetId"][key]}/${user.userId}`,
    "post",
    {
      carpetReception: reception.receptionId,
      width: reception.dimensions[key].width,
      height: reception.dimensions[key].height,
      price: reception.dimensions[key].price,
      workerId: worker.workerId,
      deliveryDate: reception.date,
      clientsId: reception.clientId,
    }
  );
}
