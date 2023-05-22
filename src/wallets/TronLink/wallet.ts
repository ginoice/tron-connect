import {
  ErequestAccountsResponseCodeTronLink,
  ITronLink,
  ITronLinkParams,
  IrequestAccountsResponseTronLink,
} from './types/index';

import { Status } from 'utils/statutses';

import { defaultData } from './utils/data';

export function tronLink(args: ITronLinkParams): ITronLink {
  /* Local store */
  let data: any = defaultData();

  /* Handlers events */
  const { fnConnect } = args;

  /* Fn connect wallet TronLink */
  const connect = async () => {
    try {
      // FIXME: hide explicit data conversion
      data.status = Status.LOADING;
      fnConnect.pending(data);

      const tronLink = window.tronLink;
      if (tronLink) {
        if (tronLink.ready) {
          // FIXME: hide explicit data conversion
          data.provider = tronLink.tronWeb;
          data.status = Status.SUCCEEDED;
          data.walletAddress = data.provider.defaultAddress.base58;

          fnConnect.success(data);

          return Promise.resolve(tronLink);
        } else {
          const res = await tronLink.request<IrequestAccountsResponseTronLink>({
            method: 'tron_requestAccounts',
          });

          if (res.code === ErequestAccountsResponseCodeTronLink.OK) {
            // FIXME: hide explicit data conversion
            data.provider = tronLink.tronWeb;
            data.status = Status.SUCCEEDED;
            data.walletAddress = data.provider.defaultAddress.base58;

            fnConnect.success(data);

            return Promise.resolve(tronLink);
          } else if (
            res.code === ErequestAccountsResponseCodeTronLink.IN_QUEUE
          ) {
            // return new Promise((resolve, reject) => {
            //   const timer = setInterval(async () => {
            //     const res =
            //       await tronLink.request<IrequestAccountsResponseTronLink>({
            //         method: 'tron_requestAccounts',
            //       });
            //
            //     if (res.code === ErequestAccountsResponseCodeTronLink.OK) {
            //       clearInterval(timer);
            //       resolve(tronLink);
            //     } else if (
            //       res.code ===
            //       ErequestAccountsResponseCodeTronLink.USER_REJECTED
            //     ) {
            //       clearInterval(timer);
            //       reject(res.message);
            //     }
            //   }, 1000);
            return Promise.reject(res.message);
          } else if (
            res.code === ErequestAccountsResponseCodeTronLink.USER_REJECTED
          ) {

            // FIXME: hide explicit data conversion
            data.provider = null;
            data.status = Status.FAILED;
            data.walletAddress = null;

            fnConnect.failed(data);
            return Promise.reject(res.message);
          }
        }
      } else {
        // TODO: Process the behavior of the absence of a wallet
        window.open('https://www.tronlink.org/');
      }
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }

      // FIXME: hide explicit data conversion
      data.provider = null;
      data.status = Status.FAILED;
      data.walletAddress = null;

      console.error(err);
      fnConnect.failed(data);
    } finally {
      data = defaultData();
    }
  };

  /* Fn disconnect wallet TronLink */
  const disconnect = async () => {
    args.fnDisconnect.success();
  };

  return { connect, disconnect };
}
