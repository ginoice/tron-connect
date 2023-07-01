import { links } from './../../utils/links';

import type {
  IWallet,
  IWalletParams
} from './types/wallet';

import {
  ErequestAccountsResponseCodeTronLink,
  IrequestAccountsResponseTronLink
} from './types/wallet';

import type { IData } from './types/store';

import { defaultData, dataMutation } from './utils/store';

import { isWindow } from './../../utils/isWindow';

export function wallet(args: IWalletParams): IWallet {
  /* Local store */
  let data: IData = defaultData();

  /* Handlers events */
  const { loading, succeeded, failed } = dataMutation(data, args);

  /* Fn connect wallet TronLink */
  const connect = () => {
    return isWindow(async () => {
      try {
        loading();

        const tronLink = window.tronLink;
        if (tronLink) {
          if (tronLink.ready) {
            succeeded(tronLink);

            return Promise.resolve(tronLink);
          } else {
            const res =
              await tronLink.request<IrequestAccountsResponseTronLink>({
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
          window.open(links.tron);
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
    });
  };

  /* Fn disconnect wallet TronLink */
  const disconnect = () => {
    return isWindow(() => {
      console.log('disconnect');
    });
  };

  const onNetworkChanged = () => {
    // TODO: make a handler for the network change event
    return isWindow(() => {
      args.fnOnNetworkChanged(data);
    });
  };

  return { connect, disconnect, onNetworkChanged };
}
