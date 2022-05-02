export const initialState = {
  surname: "",
  name: "",
  address: "",
  phone: "",
  numberOfCarpet: "",
  numberOfTracks: "",
  note: "",
};

export function CarpetReceptionLeft(state: any, action: any) {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "setEmpty":
      return (state = initialState);
    default:
      return state;
  }
}
