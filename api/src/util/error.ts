import { logger } from "./logger";

export const ErrorHandler = (error: any) => {
  // console.log(error.message, "STATUS CODE OF ERROR");
  const errorMessage = ((statusCode: number): string => {
    switch (statusCode) {
      case 401:
        return "API Key or Secret incorrect, please check and restart.";
      case 404:
        return "Unable to contact the BitMEX API (404).";
      case 429:
        return "Ratelimited on current request";
      case 503:
        return "Unable to contact BitMEX";
      case 400:
        const response_error = JSON.parse(error.error).error;
        const response_message = response_error
          ? response_error.message.toLowerCase()
          : "";
        if (response_message.includes("duplicate clordid")) {
          return "Duplicate order";
        } else if (
          response_message.includes("insufficient available balance")
        ) {
          return "insufficient funds";
        } else if (response_message.includes("missing api key")) {
          return "Missing API key.";
        }

      default:
        return "Error::Default";
    }
  })(error.statusCode);
  logger.log("error", errorMessage);
  return errorMessage;
};

// if (error.statusCode == 401) {
//     throw "API Key or Secret incorrect, please check and restart.";
//   } else if (error.statusCode == 404) {
//     if (verb == "DELETE") {
//       throw "Order to delete not found";
//     }
//     throw "Unable to contact the BitMEX API (404).";
//   } else if (error.statusCode == 429) {
//     throw "Ratelimited on current request";
//   } else if (error.statusCode == 503) {
//     throw "Unable to contact BitMEX";
//   } else if (error.statusCode == 400) {
//     const response_error = JSON.parse(error.error).error;
//     const response_message = response_error
//       ? response_error.message.toLowerCase()
//       : "";
//     if (response_message.includes("duplicate clordid")) {
//       throw "Duplicate";
//     } else if (response_message.includes("insufficient available balance")) {
//       throw "insufficient funds";
//     }
//     console.log(error);

//     throw "Error";
//   }
