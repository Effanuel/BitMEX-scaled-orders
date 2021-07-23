import {logger} from './logger';

const error_400_handler = (error: any): string => {
  const responseError = JSON.parse(error).error;
  const responseErrormMessage = responseError ? responseError.message.toLowerCase() : '';
  console.warn('Error handler response message: ', responseErrormMessage);
  const error_messages: Record<string, string> = {
    'invalid leavesqty for lotsize': 'Lotsize quantity would be invalid',
    'duplicate clordid': 'Duplicate order.',
    'insufficient available balance': 'Insufficient funds.',
    'missing api key': 'Missing API key.',
    spam: 'Spam: quantity is too low.',
    'invalid orderqty': 'Invalid quantity.',
    'immediate liquidation': 'Executing would lead to immediate liquidation.',
    'order price is below': 'Order price is out of range of liquidation price.',
    'order price is above': 'Order price is out of range of liquidation price.',
  };
  for (const match in error_messages) {
    if (responseErrormMessage.includes(match)) return error_messages[match]; // startswith TODO
  }
  return 'Unhandled Error';
};

const error_404_handler = (error: any): string => {
  const responseError = JSON.parse(error).error;
  const responseErrormMessage = responseError ? responseError.message.toLowerCase() : '';
  console.warn('Error handler response message: ', responseErrormMessage);
  const error_messages: Record<string, string> = {
    'not found': 'Order doesn`t exist',
  };
  for (const match in error_messages) {
    if (responseErrormMessage.includes(match)) return error_messages[match]; // startswith TODO
  }
  return 'Unable to contact the BitMEX API (404).';
};

export const ErrorHandler = ({message, statusCode, error}: any) => {
  logger.debug(message);
  const errorMessage = ((statusCode: number): string => {
    switch (statusCode) {
      case 401:
        return 'API Key or Secret incorrect, please check and restart.';
      case 404:
        return error_404_handler(error);
      case 429:
        return 'Ratelimited on current request';
      case 503:
        return 'Unable to contact BitMEX';
      case 400:
        return error_400_handler(error);
      default:
        return 'Something has gone terribly wrong.';
    }
  })(statusCode);
  logger.log('error', errorMessage);
  return errorMessage;
};
