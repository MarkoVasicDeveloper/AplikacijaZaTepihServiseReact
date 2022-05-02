export let initialDimensions = {} as any;

export function DimensionsReducer(state: any, action: any) {
  switch (action.type) {
    case "setEmpty":
      new Array(action.value).fill(0).forEach((_, index: number) => {
        initialDimensions[`Tepih/Staza ${index}`] = {
          width: "",
          height: "",
          price: "",
        };
      });
      return initialDimensions;
    case "setDimensions":
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          [action.field]: action.value,
        },
      };
    default:
      return state;
  }
}
