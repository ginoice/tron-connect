import { Status } from 'utils/statutses';

/* Default template data */
export const defaultData = () => {
  return {
    provider: null,
    walletAddress: null,
    status: Status.IDLE,
  };
};
