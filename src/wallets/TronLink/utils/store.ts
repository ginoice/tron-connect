import { Status } from '../../../utils/statutses';
import type { IData, IDataMutation } from '../types/store';
import type { ITronLinkParams } from '../types/wallet';

/* Default template data */
export const defaultData = (): IData => {
  return {
    provider: null,
    walletAddress: null,
    status: Status.IDLE,
  };
};

/* Function that changes the connection statuses to the wallet */
export const dataMutation = (
  data: IData,
  handlers: ITronLinkParams
): IDataMutation => {
  const { fnConnect } = handlers;

  const loading = () => {
    data.provider = null;
    data.status = Status.LOADING;
    data.walletAddress = null;

    fnConnect.pending(data);
  };

  const succeeded = (tronLink: any) => {
    data.provider = tronLink.tronWeb;
    data.status = Status.SUCCEEDED;
    data.walletAddress = data.provider.defaultAddress.base58;

    fnConnect.success(data);
  };

  const failed = () => {
    data.provider = null;
    data.status = Status.FAILED;
    data.walletAddress = null;

    fnConnect.failed(data);
  };

  return {
    loading,
    succeeded,
    failed,
  };
};
