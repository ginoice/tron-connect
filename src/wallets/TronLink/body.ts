import { wallet } from './wallet';
// import {
//   onAccountChange,
//   onConnect,
//   onNetworkChange,
//   onDisconnect,
//   subscribe
// } from './events/index'

export const TronLink = () => {
  // const walletEvents = {
  //   connected: onConnect(),
  //   disconnected: onDisconnect(),
  //   accountChanged: onAccountChange(),
  //   networkChanged: onNetworkChange()
  // }

  // const subscribeWallet = subscribe(walletEvents)

  return {
    // subscribeWallet,
    wallet,
  };
};
