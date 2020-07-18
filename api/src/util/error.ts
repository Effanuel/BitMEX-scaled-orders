import {logger} from './logger';

const error_400_handler = (error: any): string => {
  const response_error = JSON.parse(error).error;
  const response_message = response_error ? response_error.message.toLowerCase() : '';
  const error_messages: {[key: string]: string} = {
    'duplicate clordid': 'Duplicate order.',
    'insufficient available balance': 'Insufficient funds.',
    'missing api key': 'Missing API key.',
    spam: 'Spam: quantity is too low.',
    'immediate liquidation': 'Executing would lead to immediate liquidation.',
    'order price is below': 'Order price is out of range of liquidation price.',
    'order price is above': 'Order price is out of range of liquidation price.',
  };
  for (const match in error_messages) {
    if (response_message.includes(match)) {
      // startswith TODO
      return error_messages[match];
    }
  }
  return 'Unhandled Error';
};

export const ErrorHandler = ({message, statusCode, error}: any) => {
  logger.debug(message);
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
        return error_400_handler(error);
      default:
        return 'Error::Default';
    }
  })(statusCode);
  logger.log('error', errorMessage);
  return errorMessage;
};
