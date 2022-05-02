export const initialStateMeasuring = {
  name: "",
  surname: "",
  address: "",
  phone: "",
  numberOfCarpet: "",
  numberOfTracks: "",
  note: "",
  dateAt: "",
};

export function ClientReducer(state: any, action: any) {
  switch (action.type) {
    case "setClientInfo":
      return {
        name: action.value.clients.name,
        surname: action.value.clients.surname,
        address: action.value.clients.address,
        phone: action.value.clients.phone,
        note: action.value.clients.note,
        dateAt: action.value.dateAt.split("T")[0],
        numberOfCarpet: action.value.numberOfCarpet,
        numberOfTracks: action.value.numberOfTracks,
      };

    case "setEmpty":
      return (state = initialStateMeasuring);
    default:
      return state;
  }
}
