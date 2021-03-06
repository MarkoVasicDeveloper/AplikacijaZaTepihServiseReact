export function errorHandler(error: any) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
    default:
      alert("An unknown error occurred.");
  }
}

export const positionOptions = {
  enableHighAccuracy: true,
  timeout: 90000,
  maximumAge: 20000,
};
