export interface Environment {
  API_URL: string;
  QR_CODE_URL: string;
  VERSION_NUMBER: string;
  VERSION_GIT_SHA: string;
  APP_SHORT_NAME?: string;
  APP_NAME: string;
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

const REACT_APP_VERSION_NUMBER = (): string => process.env.REACT_APP_VERSION || '0.0.0';

const REACT_APP_VERCEL_GIT_COMMIT_SHA = (): string => process.env.REACT_APP_VERCEL_GIT_COMMIT_SHA || '-';

const REACT_APP_SHORT_NAME = (): string | undefined => process.env.REACT_APP_SHORT_NAME;

const REACT_APP_NAME = (): string => process.env.REACT_APP_NAME || 'My App';

const environment: Environment = {
  API_URL: REACT_APP_API_URL(),
  QR_CODE_URL: REACT_APP_QR_CODE_URL(),
  VERSION_NUMBER: REACT_APP_VERSION_NUMBER(),
  VERSION_GIT_SHA: REACT_APP_VERCEL_GIT_COMMIT_SHA(),
  APP_SHORT_NAME: REACT_APP_SHORT_NAME(),
  APP_NAME: REACT_APP_NAME(),
};

export default environment;
