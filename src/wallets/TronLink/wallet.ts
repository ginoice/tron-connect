import {
  ErequestAccountsResponseCodeTronLink,
  ITronLink,
  ITronLinkParams,
  IrequestAccountsResponseTronLink,
} from './types/wallet';

import type { IData } from './types/store';

import { defaultData, dataMutation } from './utils/store';

export function tronLink(args: ITronLinkParams): ITronLink {
  /* Local store */
  let data: IData = defaultData();

  /* Handlers events */
  const { loading, succeeded, failed } = dataMutation(data, args);

  /* Fn connect wallet TronLink */
  const connect = async () => {
    try {
      loading();

      const tronLink = window.tronLink;
      if (tronLink) {
        if (tronLink.ready) {
          succeeded(tronLink);

          return Promise.resolve(tronLink);
        } else {
          const res = await tronLink.request<IrequestAccountsResponseTronLink>({
            method: 'tron_requestAccounts',
          });

          if (res.code === ErequestAccountsResponseCodeTronLink.OK) {
            succeeded(tronLink);

            return Promise.resolve(tronLink);
          } else if (
            res.code === ErequestAccountsResponseCodeTronLink.IN_QUEUE
          ) {
            return Promise.reject(res.message);
          } else if (
            res.code === ErequestAccountsResponseCodeTronLink.USER_REJECTED
          ) {
            failed();

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

      failed();

      console.error(err);
    } finally {
      data = defaultData();
    }
  };

  /* Fn disconnect wallet TronLink */
  const disconnect = async () => {
    console.log('disconnect');
  };

  return { connect, disconnect };
}
