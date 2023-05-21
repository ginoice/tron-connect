import {
  ErequestAccountsResponseCodeTronLink,
  ITronLink,
  ITronLinkParams,
  IrequestAccountsResponseTronLink,
} from './ITronLink';

export function tronLink(args: ITronLinkParams): ITronLink {
  const connect = async () => {
    try {
      args.fnConnect.pending();
      const tronLink = window.tronLink;
      if (tronLink) {
        if (tronLink.ready) {
          return Promise.resolve(tronLink);
        } else {
          const res = await tronLink.request<IrequestAccountsResponseTronLink>({
            method: 'tron_requestAccounts',
          });

          if (res.code === ErequestAccountsResponseCodeTronLink.OK) {
            args.fnConnect.success();
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
            //
            //
            return Promise.reject(res.message);
          } else if (
            res.code === ErequestAccountsResponseCodeTronLink.USER_REJECTED
          ) {
            args.fnConnect.failed();
            return Promise.reject(res.message);
          }
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      } else {
        console.error(err);
      }
      args.fnConnect.failed();
    }
  };

  const disconnect = async () => {
    args.fnDisconnect.success();
  };

  return { connect, disconnect };
}
