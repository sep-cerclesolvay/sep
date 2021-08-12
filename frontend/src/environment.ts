export interface Environment {
  API_URL: string;
  QR_CODE_URL: string;
}

const REACT_APP_API_URL = (): string => {
  if (process.env.REACT_APP_API_URL === undefined) {
    throw Error('environment variable "REACT_APP_API_URL" must be set');
  }
  return process.env.REACT_APP_API_URL;
};

const REACT_APP_QR_CODE_URL = (): string => {
  if (process.env.REACT_APP_QR_CODE_URL === undefined) {
    throw Error('environment variable "REACT_APP_QR_CODE_URL" must be set');
  }
  return process.env.REACT_APP_QR_CODE_URL;
};

const environment: Environment = {
  API_URL: REACT_APP_API_URL(),
  QR_CODE_URL: REACT_APP_QR_CODE_URL(),
};

export default environment;
