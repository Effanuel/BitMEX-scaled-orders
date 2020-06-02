import { logger } from './logger';

const error_400_handler = (response_message: string): string => {
  const error_messages: any = {
    'duplicate clordid': 'Duplicate order.',
    'insufficient available balance': 'Insufficient funds.',
    'missing api key': 'Missing API key.',
    spam: 'Spam: quantity is too low.',
    'immediate liquidation': 'Executing would lead to immediate liquidation.',
  };

  // return response_message.includes("duplicate clordid")
  // ? "Duplicate order."
  // : response_message.includes("insufficient available balance")
  // ? "Insufficient funds."
  // : response_message.includes("missing api key")
  // ? "Missing API key."
  // : response_message.includes("spam")
  // ? "Spam: quantity is too low."
  // : response_message.includes("immediate liquidation")
  // ? "Executing would lead to immediate liquidation."
  // : "Unhandled Error";

  for (const match in error_messages) {
    if (response_message.includes(match)) {
      // startswith TODO
      return error_messages[match];
    }
  }
  return 'Unhandled Error';
};

export const ErrorHandler = (error: any) => {
  logger.debug(error.message);
  const errorMessage = ((statusCode: number): string => {
    switch (statusCode) {
      case 401:
        return 'API Key or Secret incorrect, please check and restart.';
      case 404:
        return 'Unable to contact the BitMEX API (404).';
      case 429:
        return 'Ratelimited on current request';
      case 503:
        return 'Unable to contact BitMEX';
      case 400:
        const response_error = JSON.parse(error.error).error;
        const response_message = response_error
          ? response_error.message.toLowerCase()
          : '';
        return error_400_handler(response_message);

      default:
        return 'Error::Default';
    }
  })(error.statusCode);
  logger.log('error', errorMessage);
  return errorMessage;
};

// import { logger } from "./logger";

// export const ErrorHandler = (error: any) => {
//   logger.debug(error.message);
//   const errorMessage = ((statusCode: number): string => {
//     switch (statusCode) {
//       case 401:
//         return "API Key or Secret incorrect, please check and restart.";
//       case 404:
//         return "Unable to contact the BitMEX API (404).";
//       case 429:
//         return "Ratelimited on current request";
//       case 503:
//         return "Unable to contact BitMEX";
//       case 400:
//         const response_error = JSON.parse(error.error).error;
//         const response_message = response_error
//           ? response_error.message.toLowerCase()
//           : "";
//         if (response_message.includes("duplicate clordid")) {
//           return "Duplicate order";
//         } else if (
//           response_message.includes("insufficient available balance")
//         ) {
//           return "Insufficient funds.";
//         } else if (response_message.includes("missing api key")) {
//           return "Missing API key.";
//         } else if (response_message.includes("spam")) {
//           return "Spam: quantity is too low.";
//         } else if (response_message.includes("immediate liquidation")) {
//           return "Executing would lead to immediate liquidation.";
//         }

//       default:
//         return "Error::Default";
//     }
//   })(error.statusCode);
//   logger.log("error", errorMessage);
//   return errorMessage;
// };
