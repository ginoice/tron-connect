import { wallet } from './wallet';

import {
  onAccountChange,
  onConnect,
  onNetworkChange,
  onDisconnect,
  subscribe
} from './events/index';

import type { IWallet, IWalletParams } from './types/wallet'

interface ITronLinkEvents {
  subscribeWallet: any
  wallet: (args: IWalletParams) => IWallet
}

interface ISubscribeWalletEvents {
  connected: any,
  disconnected: any,
  accountChanged: any,
  networkChanged: any
}


export const TronLink = ():ITronLinkEvents => {
  const walletEvents:ISubscribeWalletEvents = {
    connected: onConnect,
    disconnected: onDisconnect,
    accountChanged: onAccountChange,
    networkChanged: onNetworkChange
  }

  const subscribeWallet:any = subscribe(walletEvents)

  return {
    subscribeWallet,
    wallet,
  };
};
