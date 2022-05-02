import api from "../../../api/api";

export async function AddClient(
  name: string,
  surname: string,
  address: string,
  phone: string,
  userId: number
) {
  if (name === "" || surname === "" || address === "") return;
  const addClient = await api(`api/clients/addClient/${userId}`, "post", {
    name,
    surname,
    address,
    phone,
  });
  return addClient;
}

export async function AddReception(
  client: any,
  userId: number,
  numberOfCarpet: string,
  numberOfTracks: string,
  note: string,
  workerId: number
) {
  if (client.status === "error") return;

  const addReception = await api(
    `api/carpetReception/addReception/${workerId}`,
    "post",
    {
      clientsId: client.data.clientsId,
      numberOfCarpet: Number(numberOfCarpet),
      numberOfTracks: Number(numberOfTracks),
      note: note,
      carpet_reception_user: localStorage.getItem("reception_user"),
      userId: userId,
    }
  );
  return addReception;
}
export function PrepareClientObject(reception: any) {
  const lastReception =
    reception.data.carpetReceptions[reception.data.carpetReceptions.length - 1]
      .carpetReceptionUser;

  localStorage.setItem("reception_user", lastReception + 1);

  return {
    name: reception.data.name,
    surname: reception.data.surname,
    address: reception.data.address,
    phone: reception.data.phone,
    clientId: reception.data.clientsId,
    carpetReceptionUserArray: reception.data.carpetReceptions,
    carpetReceptionUser: lastReception,
    numberOfCarpet:
      reception.data.carpetReceptions[
        reception.data.carpetReceptions.length - 1
      ].numberOfCarpet,
    numberOfTracks:
      reception.data.carpetReceptions[
        reception.data.carpetReceptions.length - 1
      ].numberOfTracks,
  };
}
